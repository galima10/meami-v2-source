import type { Operation } from "@app-types/DbQuantity";
import {
  formatAllMenus,
  formatWeeklyMenu,
} from "@mappers/formatData/formatWeeklyMenu";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateQuantityGenericService } from "@services/shared";
import {
  AddIngredientToMenuService,
  AddRecipeToMenuService,
  FetchAllMenusService,
  FetchWeeklyMenuService,
  RemoveIngredientToMenuService,
  RemoveMenuService,
  RemoveWeeklyMenuService,
  SetMenuDoneService,
} from "@services/weeklyMenu";
import type { Recipe } from "@stores/features/recipes";
import type {
  IngredientMenu,
  MenuIngredients,
  WeeklyMenu,
  WeeklyMenuIngredients,
} from "@stores/features/weeklyMenu";
import type { RootState } from "@stores/index";

export interface IngredientInsert extends IngredientMenu {
  menuCategoryId: number;
}

export const fetchAllMenusThunk = createAsyncThunk<WeeklyMenu, void>(
  "weeklyMenu/fetchAllMenus",
  async () => {
    const data = await FetchAllMenusService();
    return formatAllMenus(data);
  },
);

export const fetchWeeklyMenuThunk = createAsyncThunk<
  WeeklyMenuIngredients,
  void
>("weeklyMenu/fetchWeeklyMenu", async () => {
  const data = await FetchWeeklyMenuService();
  return formatWeeklyMenu(data);
});

export const addIngredientToMenuThunk = createAsyncThunk<
  { ingredientsToInsert: MenuIngredients; menuId: number },
  {
    newIngredient: IngredientInsert;
    menuId: number;
  }
>("weeklyMenu/addIngredientToMenu", async ({ newIngredient, menuId }) => {
  const ingredientsToInsert = {
    [newIngredient.menuCategoryId]: [
      {
        ingredientId: newIngredient.ingredientId,
        quantity: newIngredient.quantity ?? null,
        unitId: newIngredient.unitId ?? null,
      },
    ],
  };
  await AddIngredientToMenuService(newIngredient, menuId);
  return {
    ingredientsToInsert,
    menuId,
  };
});

export const addRecipeToMenuThunk = createAsyncThunk<
  { ingredientsToInsert: MenuIngredients; menuId: number },
  { recipeId: number; menuId: number },
  { state: RootState }
>("weeklyMenu/addRecipeToMenu", async ({ recipeId, menuId }, { getState }) => {
  const state = getState();
  const recipe: Recipe = state.recipe.recipes[recipeId];

  if (!recipe) {
    throw new Error(`Recipe with id ${recipeId} not found`);
  }

  const ingredientsToInsert: MenuIngredients = {};

  for (const recipeIng of recipe.ingredients) {
    const menuCategoryId = recipeIng.menuCategoryId;
    if (!ingredientsToInsert[menuCategoryId])
      ingredientsToInsert[menuCategoryId] = [];

    ingredientsToInsert[menuCategoryId].push({
      ingredientId: recipeIng.ingredientId,
      quantity: recipeIng.quantity ?? null,
      unitId: recipeIng.unitId ?? null,
    });
  }

  await AddRecipeToMenuService(recipeId, menuId);

  return { ingredientsToInsert, menuId };
});

export const setMenuDoneThunk = createAsyncThunk<
  {
    menuId: number;
    done: boolean;
  },
  {
    menuId: number;
    done: boolean;
  }
>("weeklyMenu/setMenuDone", async ({ menuId, done }) => {
  await SetMenuDoneService(menuId, done);
  return { menuId, done };
});

export const removeIngredientToMenuThunk = createAsyncThunk<
  {
    ingredientId: number;
    menuId: number;
  },
  {
    ingredientId: number;
    menuId: number;
  }
>("weeklyMenu/removeIngredientToMenu", async ({ ingredientId, menuId }) => {
  await RemoveIngredientToMenuService(ingredientId, menuId);
  return { ingredientId, menuId };
});

export const removeMenuThunk = createAsyncThunk<number, number>(
  "weeklyMenu/removeMenu",
  async (menuId) => {
    await RemoveMenuService(menuId);
    return menuId;
  },
);

export const removeWeeklyMenuThunk = createAsyncThunk<{}, void>(
  "weeklyMenu/removeWeeklyMenu",
  async () => {
    await RemoveWeeklyMenuService();
    return {};
  },
);

export const setIngredientMenuQuantityThunk = createAsyncThunk<
  {
    itemId: number;
    value: number | null;
    operation: Operation;
    menuId: number;
  },
  {
    itemId: number;
    value: number | null;
    operation: Operation;
    menuId: number;
  }
>(
  "weeklyMenu/setIngredientMenuQuantity",
  async ({ itemId, value, operation, menuId }) => {
    await UpdateQuantityGenericService(
      "menu_ingredient_links",
      "quantity",
      "id_ingredients",
      itemId,
      value,
      operation,
      { condition: "id_menus", id: menuId },
    );
    return { itemId, value, operation, menuId };
  },
);
