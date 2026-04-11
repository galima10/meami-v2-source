import { resetCookingInfos } from "@stores/features/cookingInfos";
import { resetCookingUstensils } from "@stores/features/cookingUstensils";
import { resetIngredientCategories } from "@stores/features/ingredientCategories";
import { resetIngredients } from "@stores/features/ingredients";
import { resetManualAdjustements } from "@stores/features/manualAdjustements";
import { resetProducts } from "@stores/features/products";
import { resetRecipeCategories } from "@stores/features/recipeCategories";
import { resetRecipes } from "@stores/features/recipes";
import { resetSeeds } from "@stores/features/seeds";
import { resetShoppingList } from "@stores/features/shoppingList";
import { resetStorageInfos } from "@stores/features/storageInfos";
import { resetUnits } from "@stores/features/units";
import { resetWeeklyMenu } from "@stores/features/weeklyMenu";
import { AppDispatch } from "@stores/index";

export const resetReduxStore = (dispatch: AppDispatch) => {
  dispatch(resetCookingInfos());
  dispatch(resetCookingUstensils());
  dispatch(resetIngredientCategories());
  dispatch(resetIngredients());
  dispatch(resetProducts());
  dispatch(resetRecipeCategories());
  dispatch(resetRecipes());
  dispatch(resetSeeds());
  dispatch(resetManualAdjustements());
  dispatch(resetShoppingList());
  dispatch(resetStorageInfos());
  dispatch(resetUnits());
  dispatch(resetWeeklyMenu());
};

import { mockUnits } from "@constants/database/mocks/data/units";
import { createUnitThunk } from "@stores/thunks/units";

import { mockIngredientCategories } from "@constants/database/mocks/data/ingredientsCategories";
import { createIngredientCategoryThunk } from "@stores/thunks/ingredientCategories";

import { mockRecipeCategories } from "@constants/database/mocks/data/recipeCategories";
import { createRecipeCategoryThunk } from "@stores/thunks/recipeCategories";

import { mockCookingUstensils } from "@constants/database/mocks/data/cookingUstensils";
import { createUstensilThunk } from "@stores/thunks/cookingUstensils";

import { mockIngredients } from "@constants/database/mocks/data/ingredients";
import { createIngredientThunk } from "@stores/thunks/ingredients";

import { mockRecipes } from "@constants/database/mocks/data/recipes";
import { createRecipeThunk } from "@stores/thunks/recipes";

import { mockProducts } from "@constants/database/mocks/data/products";
import { createProductThunk } from "@stores/thunks/products";

import {
  mockWeeklyIngredients,
  mockWeeklyRecipes,
} from "@constants/database/mocks/data/weeklyMenu";
import {
  addRecipeToMenuThunk,
  addIngredientToMenuThunk,
  setMenuDoneThunk,
} from "@stores/thunks/weeklyMenu";

import { LoadShoppingListService } from "@services/shoppingList";
import {
  fetchShoppingListThunk,
  addItemToShoppingThunk,
  setShoppingListItemQuantityThunk,
} from "@stores/thunks/shoppingList";
import {
  mockIngredientsBuyed,
  mockNonQuantifiableIngredientsNeeded,
} from "@constants/database/mocks/data/shoppingList";

export const insertMockData = async (dispatch: AppDispatch) => {
  for (const unit of mockUnits) {
    await dispatch(createUnitThunk(unit)).unwrap();
  }
  for (const ingredientCategory of mockIngredientCategories) {
    await dispatch(createIngredientCategoryThunk(ingredientCategory)).unwrap();
  }
  for (const recipeCategory of mockRecipeCategories) {
    await dispatch(createRecipeCategoryThunk(recipeCategory)).unwrap();
  }
  for (const cookingUstensil of mockCookingUstensils) {
    await dispatch(createUstensilThunk(cookingUstensil)).unwrap();
  }
  for (const ingredient of mockIngredients) {
    await dispatch(createIngredientThunk(ingredient)).unwrap();
  }
  for (const product of mockProducts) {
    await dispatch(createProductThunk(product)).unwrap();
  }
  for (const recipe of mockRecipes) {
    await dispatch(createRecipeThunk(recipe)).unwrap();
  }
  for (const recipe of mockWeeklyRecipes) {
    await dispatch(addRecipeToMenuThunk(recipe)).unwrap();
  }
  for (const ingredient of mockWeeklyIngredients) {
    await dispatch(addIngredientToMenuThunk(ingredient)).unwrap();
  }
  await loadShopping(dispatch);
  for (const ingredient of mockNonQuantifiableIngredientsNeeded) {
    await dispatch(addItemToShoppingThunk(ingredient)).unwrap();
  }
  for (const ingredient of mockIngredientsBuyed) {
    await dispatch(setShoppingListItemQuantityThunk(ingredient)).unwrap();
  }

  for (let i = 1; i <= 21; i++) {
    await dispatch(setMenuDoneThunk({ menuId: i, done: true }));
  }
};

async function loadShopping(dispatch: AppDispatch) {
  await LoadShoppingListService();
  await dispatch(fetchShoppingListThunk());
}
