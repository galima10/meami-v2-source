import type { Operation } from "@app-types/DbQuantity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    addIngredientToMenuThunk,
    addRecipeToMenuThunk,
    fetchAllMenusThunk,
    fetchWeeklyMenuThunk,
    removeIngredientToMenuThunk,
    removeMenuThunk,
    removeWeeklyMenuThunk,
    setIngredientMenuQuantityThunk,
    setMenuDoneThunk,
} from "@stores/thunks/weeklyMenu";

export interface WeeklyMenuIngredients {
  [menuId: number]: MenuIngredients;
}

export interface WeeklyMenu {
  [menuId: number]: Menu;
}

export interface Menu {
  dayId: number;
  momentId: number;
  done: boolean;
  ingredients: MenuIngredients;
}

export interface MenuIngredients {
  [menuCategoryId: number]: IngredientMenu[];
}

export interface IngredientMenu {
  ingredientId: number;
  quantity: number | null;
  unitId: number | null;
}

const initialState = {
  weeklyMenu: {} as WeeklyMenu,
  loading: false,
  error: null as string | null,
};

export const weeklyMenuSlice = createSlice({
  name: "weeklyMenu",
  initialState,
  reducers: {
    resetWeeklyMenu: () => initialState,
  },
  extraReducers: (builder) => {
    // fetchAllMenusThunk
    builder
      .addCase(fetchAllMenusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllMenusThunk.fulfilled,
        (state, action: PayloadAction<WeeklyMenu>) => {
          state.loading = false;

          if (Object.values(state.weeklyMenu).length === 0) {
            state.weeklyMenu = action.payload;
          }
        },
      )
      .addCase(
        fetchAllMenusThunk.rejected,
        (state, action: ReturnType<typeof fetchAllMenusThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // fetchWeeklyMenuThunk
    builder
      .addCase(fetchWeeklyMenuThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeeklyMenuThunk.fulfilled,
        (state, action: PayloadAction<WeeklyMenuIngredients>) => {
          state.loading = false;

          for (const [menuIdStr, ingredientList] of Object.entries(
            action.payload,
          )) {
            const menuId = Number(menuIdStr);
            state.weeklyMenu[menuId].ingredients = ingredientList;
          }
        },
      )
      .addCase(
        fetchWeeklyMenuThunk.rejected,
        (state, action: ReturnType<typeof fetchWeeklyMenuThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // setMenuDoneThunk
    builder
      .addCase(setMenuDoneThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setMenuDoneThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            menuId: number;
            done: boolean;
          }>,
        ) => {
          state.loading = false;
          const { menuId, done } = action.payload;

          const menu = state.weeklyMenu[menuId];
          if (menu) menu.done = done;
        },
      )
      .addCase(
        setMenuDoneThunk.rejected,
        (state, action: ReturnType<typeof setMenuDoneThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // addIngredientToMenuThunk
    builder
      .addCase(addIngredientToMenuThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addIngredientToMenuThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            ingredientsToInsert: MenuIngredients;
            menuId: number;
          }>,
        ) => {
          state.loading = false;
          const { ingredientsToInsert, menuId } = action.payload;

          const menu = state.weeklyMenu[menuId];
          if (!menu) return;

          for (const [menuCategoryIdStr, ingredientList] of Object.entries(
            ingredientsToInsert,
          ) as [string, IngredientMenu[]][]) {
            const menuCategoryId = Number(menuCategoryIdStr);

            if (!menu.ingredients[menuCategoryId]) {
              menu.ingredients[menuCategoryId] = [];
            }
            const existingIds = new Set(
              menu.ingredients[menuCategoryId].map((i) => i.ingredientId),
            );
            const newIngredients = ingredientList.filter(
              (i) => !existingIds.has(i.ingredientId),
            );

            menu.ingredients[menuCategoryId].push(...newIngredients);
          }
        },
      )
      .addCase(
        addIngredientToMenuThunk.rejected,
        (
          state,
          action: ReturnType<typeof addIngredientToMenuThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // addRecipeToMenuThunk
    builder
      .addCase(addRecipeToMenuThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addRecipeToMenuThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            ingredientsToInsert: MenuIngredients;
            menuId: number;
          }>,
        ) => {
          state.loading = false;
          const { ingredientsToInsert, menuId } = action.payload;

          const menu = state.weeklyMenu[menuId];
          if (!menu) return;

          for (const [menuCategoryIdStr, ingredientList] of Object.entries(
            ingredientsToInsert,
          ) as [string, IngredientMenu[]][]) {
            const menuCategoryId = Number(menuCategoryIdStr);

            if (!menu.ingredients[menuCategoryId]) {
              menu.ingredients[menuCategoryId] = [];
            }

            const existingIds = new Set(
              menu.ingredients[menuCategoryId].map((i) => i.ingredientId),
            );

            const newIngredients = ingredientList.filter(
              (i) => !existingIds.has(i.ingredientId),
            );

            menu.ingredients[menuCategoryId].push(...newIngredients);
          }
        },
      )
      .addCase(
        addRecipeToMenuThunk.rejected,
        (state, action: ReturnType<typeof addRecipeToMenuThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // removeIngredientToMenuThunk
    builder
      .addCase(removeIngredientToMenuThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeIngredientToMenuThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            ingredientId: number;
            menuId: number;
          }>,
        ) => {
          state.loading = false;
          const { ingredientId, menuId } = action.payload;

          const menu = state.weeklyMenu[menuId];
          if (!menu) return;

          for (const ingredientList of Object.values(menu.ingredients)) {
            for (let i = ingredientList.length - 1; i >= 0; i--) {
              if (ingredientList[i].ingredientId === ingredientId) {
                ingredientList.splice(i, 1);
              }
            }
          }
        },
      )
      .addCase(
        removeIngredientToMenuThunk.rejected,
        (
          state,
          action: ReturnType<typeof removeIngredientToMenuThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // removeMenuThunk
    builder
      .addCase(removeMenuThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeMenuThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;

          const menu = state.weeklyMenu[action.payload];
          if (!menu) return;
          menu.done = false;
          menu.ingredients = {};
        },
      )
      .addCase(
        removeMenuThunk.rejected,
        (state, action: ReturnType<typeof removeMenuThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // removeWeeklyMenuThunk
    builder
      .addCase(removeWeeklyMenuThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeWeeklyMenuThunk.fulfilled, (state) => {
        state.loading = false;

        for (const menu of Object.values(state.weeklyMenu)) {
          menu.done = false;
          menu.ingredients = {};
        }
      })
      .addCase(
        removeWeeklyMenuThunk.rejected,
        (state, action: ReturnType<typeof removeWeeklyMenuThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // setIngredientMenuQuantityThunk
    builder
      .addCase(setIngredientMenuQuantityThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setIngredientMenuQuantityThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            itemId: number;
            value: number | null;
            operation: Operation;
            menuId: number;
          }>,
        ) => {
          state.loading = false;
          const { itemId, value, operation, menuId } = action.payload;
          const menu = state.weeklyMenu[menuId];
          if (!menu) return;
          for (const ingredientList of Object.values(menu.ingredients)) {
            for (const ingredient of ingredientList) {
              if (ingredient.ingredientId !== itemId) continue;

              if (value == null) {
                ingredient.quantity = null;
                continue;
              }

              const current = ingredient.quantity;

              if (operation === "set") {
                ingredient.quantity = value;
                continue;
              }

              if (current == null) {
                ingredient.quantity = value;
                continue;
              }

              if (operation === "increment") {
                ingredient.quantity = current + value;
              } else {
                ingredient.quantity = Math.max(0, current - value);
              }
            }
          }
        },
      )
      .addCase(
        setIngredientMenuQuantityThunk.rejected,
        (
          state,
          action: ReturnType<typeof setIngredientMenuQuantityThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const { resetWeeklyMenu } = weeklyMenuSlice.actions;
export default weeklyMenuSlice.reducer;
