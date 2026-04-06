import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchWeeklyMenuThunk,
  fetchAllMenusThunk,
  setMenuDoneThunk,
  addIngredientToMenuThunk,
  addRecipeToMenuThunk,
  removeIngredientToMenuThunk,
  removeMenuThunk,
  removeWeeklyMenuThunk,
} from "@stores/thunks/weeklyMenu";

export interface WeeklyMenuIngredients {
  [menuId: number]: MenuIngredients;
}

export interface WeeklyMenu {
  [menuId: number]: {
    dayId: number;
    momentId: number;
    done: boolean;
    ingredients: MenuIngredients;
  };
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
    // setWeeklyMenu: (state, action: PayloadAction<WeeklyMenu>) => {
    //   state.weeklyMenu = action.payload;
    //   state.menuIndex = {};
    //   for (const day of Object.keys(action.payload)) {
    //     const dayMenu = action.payload[day as keyof WeeklyMenu];
    //     for (const moment of ["morning", "noon", "evening"] as const) {
    //       const menu = dayMenu[moment];
    //       if (menu) {
    //         state.menuIndex[menu.id] = { day, moment };
    //       }
    //     }
    //   }
    // },
    // menuUpdated: (state, action: PayloadAction<Menu>) => {
    //   const menuId = action.payload.id;
    //   const updatedMenu = action.payload;
    //   const menuLocation = state.menuIndex[menuId];
    //   if (menuLocation) {
    //     const { day, moment } = menuLocation;
    //     state.weeklyMenu[day as keyof WeeklyMenu][moment as keyof DayMenu] =
    //       updatedMenu;
    //   }
    // },
    // menuDoneToggled: (
    //   state,
    //   action: PayloadAction<{ menuId: number; done: boolean }>,
    // ) => {
    //   const { menuId, done } = action.payload;
    //   const menuLocation = state.menuIndex[menuId];
    //   if (menuLocation) {
    //     const { day, moment } = menuLocation;
    //     const menu =
    //       state.weeklyMenu[day as keyof WeeklyMenu][moment as keyof DayMenu];
    //     if (menu) {
    //       menu.done = done;
    //     }
    //   }
    // },
    // clearMenu: (state, action: PayloadAction<number>) => {
    //   const menuId = action.payload;
    //   const menuLocation = state.menuIndex[menuId];
    //   if (menuLocation) {
    //     const { day, moment } = menuLocation;
    //     const menu =
    //       state.weeklyMenu[day as keyof WeeklyMenu][moment as keyof DayMenu];
    //     if (menu) {
    //       state.weeklyMenu[day as keyof WeeklyMenu][moment as keyof DayMenu] = {
    //         id: menu.id,
    //         done: false,
    //         ingredients: {},
    //       };
    //     }
    //   }
    // },
    // ingredientMenuQuantitySetted: (
    //   state,
    //   action: PayloadAction<{
    //     ingredientId: number;
    //     menuId: number;
    //     delta: number;
    //   }>,
    // ) => {
    //   const { ingredientId, menuId, delta } = action.payload;
    //   const menuLocation = state.menuIndex[menuId];
    //   if (menuLocation) {
    //     const { day, moment } = menuLocation;
    //     const menu =
    //       state.weeklyMenu[day as keyof WeeklyMenu][moment as keyof DayMenu];
    //     if (menu) {
    //       for (const menuCategory of Object.keys(menu.ingredients)) {
    //         const ingredients = menu.ingredients[menuCategory];
    //         const ingredientIndex = ingredients.findIndex(
    //           (ingredient: IngredientMenu) => ingredient.id === ingredientId,
    //         );
    //         if (ingredientIndex !== -1) {
    //           const ingredient = ingredients[ingredientIndex];
    //           ingredients[ingredientIndex] = {
    //             ...ingredient,
    //             quantity:
    //               ingredient.quantity !== null
    //                 ? delta !== -1 && delta !== 1
    //                   ? delta
    //                   : ingredient.quantity + delta
    //                 : ingredient.quantity,
    //           };
    //         }
    //       }
    //     }
    //   }
    // },
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
          )) {
            const menuCategoryId = Number(menuCategoryIdStr);

            if (!menu.ingredients[menuCategoryId]) {
              menu.ingredients[menuCategoryId] = [];
            }

            menu.ingredients[menuCategoryId].push(...ingredientList);
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
          )) {
            const menuCategoryId = Number(menuCategoryIdStr);

            if (!menu.ingredients[menuCategoryId]) {
              menu.ingredients[menuCategoryId] = [];
            }

            menu.ingredients[menuCategoryId].push(...ingredientList);
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
  },
});

export default weeklyMenuSlice.reducer;
