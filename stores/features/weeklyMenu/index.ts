import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeeklyMenu {
  monday: DayMenu;
  tuesday: DayMenu;
  wednesday: DayMenu;
  thursday: DayMenu;
  friday: DayMenu;
  saturday: DayMenu;
  sunday: DayMenu;
}

export interface DayMenu {
  morning: Menu;
  noon: Menu;
  evening: Menu;
}

export interface Menu {
  id: string;
  done: boolean;
  ingredients: MenuIngredients;
}

export interface MenuIngredients {
  [menuCategory: string]: IngredientMenu[];
}

export interface IngredientMenu {
  id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
}

const initialState = {
  weeklyMenu: {} as WeeklyMenu,
};

/*

weeklyMenu: {
  monday: {
    morning: {
      id: 1,
      done: false,
      ingredients: [
        {
          id: number,
          name: string,
          quantity: number,
          unit: string,
        },
      ],
    },
    noon: {
      id: 2,
      done: false,
      ingredients: [
        {
          id: number,
          name: string,
          quantity: number,
          unit: string,
        },
      ],
    },
    evening: {
      id: 3,
      done: false,
      ingredients: [
        {
          id: number,
          name: string,
          quantity: number,
          unit: string,
        },
      ],
    },
  },
  tuesday: {
    morning: {
      id: 4,
      done: false,
      ingredients: [
        {
          id: number,
          name: string,
          quantity: number,
          unit: string,
        },
      ],
    },
    noon: {
      id: 5,
      done: false,
      ingredients: [
        {
          id: number,
          name: string,
          quantity: number,
          unit: string,
        },
      ],
    },
    evening: {
      id: 6,
      done: false,
      ingredients: [
        {
          id: number,
          name: string,
          quantity: number,
          unit: string,
        },
      ],
    },
  },
  wednesday: {
    morning: {
      id: 7,
      done: false,
      ingredients: [
        {
          id: number,
          name: string,
          quantity: number,
          unit: string,
        },
      ],
    },
    noon: {
      id: 8,
      done: false,
      ingredients: [
        {
          id: number,
          name: string,
          quantity: number,
          unit: string,
        },
      ],
    },
    evening: {
      id: 9,
      done: false,
      ingredients: [
        {
          id: number,
          name: string,
          quantity: number,
          unit: string,
        },
      ],
    },
  },
  thursday:
  friday:
  saturday:
  sunday:
}

*/

export const weeklyMenuSlice = createSlice({
  name: "weeklyMenu",
  initialState,
  reducers: {
    setWeeklyMenu: (state, action: PayloadAction<WeeklyMenu>) => {
      state.weeklyMenu = action.payload;
    },
    menuUpdated: (state, action: PayloadAction<Menu>) => {
      const menuId = action.payload.id;
      const updatedMenu = action.payload;

      for (const day of Object.keys(state.weeklyMenu)) {
        const dayMenu = state.weeklyMenu[day as keyof WeeklyMenu];

        if (dayMenu) {
          for (const moment of ["morning", "noon", "evening"] as const) {
            const menu = dayMenu[moment];

            if (menu && menu.id === menuId) {
              dayMenu[moment] = updatedMenu;
              return;
            }
          }
        }
      }
    },
    menuDoneToggled: (
      state,
      action: PayloadAction<{ menuId: string; done: boolean }>,
    ) => {
      const { menuId, done } = action.payload;

      for (const day of Object.keys(state.weeklyMenu)) {
        const dayMenu = state.weeklyMenu[day as keyof WeeklyMenu];

        if (dayMenu) {
          for (const moment of ["morning", "noon", "evening"] as const) {
            const menu = dayMenu[moment];

            if (menu && menu.id === menuId) {
              dayMenu[moment] = {
                ...dayMenu[moment],
                done,
              };
              return;
            }
          }
        }
      }
    },
    clearMenu: (state, action: PayloadAction<string>) => {
      const menuId = action.payload;

      for (const day of Object.keys(state.weeklyMenu)) {
        const dayMenu = state.weeklyMenu[day as keyof WeeklyMenu];

        if (dayMenu) {
          for (const moment of ["morning", "noon", "evening"] as const) {
            const menu = dayMenu[moment];

            if (menu && menu.id === menuId) {
              dayMenu[moment] = {
                id: dayMenu[moment].id,
                done: false,
                ingredients: {},
              };
            }
          }
        }
      }
    },
    ingredientMenuQuantitySetted: (
      state,
      action: PayloadAction<{
        ingredientId: string;
        menuId: string;
        delta: number;
      }>,
    ) => {
      const { ingredientId, menuId, delta } = action.payload;

      for (const day of Object.keys(state.weeklyMenu)) {
        const dayMenu = state.weeklyMenu[day as keyof WeeklyMenu];

        if (dayMenu) {
          for (const moment of ["morning", "noon", "evening"] as const) {
            const menu = dayMenu[moment];

            if (menu && menu.id === menuId) {
              // Parcourir les catégories d'ingrédients
              for (const menuCategory of Object.keys(menu.ingredients)) {
                const ingredients = menu.ingredients[menuCategory];

                // Mettre à jour les ingrédients
                menu.ingredients[menuCategory] = ingredients.map(
                  (ingredient) =>
                    ingredient.id === ingredientId
                      ? {
                          ...ingredient,
                          quantity:
                            ingredient.quantity !== null
                              ? delta !== -1 && delta !== 1
                                ? delta
                                : ingredient.quantity + delta
                              : ingredient.quantity, // Ne rien faire si `quantity` est null
                        }
                      : ingredient,
                );
              }
              return; // Sortir dès que l'ingrédient est mis à jour
            }
          }
        }
      }
    },
  },
});

export const { setWeeklyMenu, menuUpdated, menuDoneToggled, clearMenu, ingredientMenuQuantitySetted } =
  weeklyMenuSlice.actions;
export default weeklyMenuSlice.reducer;
