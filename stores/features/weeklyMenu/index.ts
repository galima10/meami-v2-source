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
  id: number;
  done: boolean;
  ingredients: MenuIngredients;
}

export interface MenuIngredients {
  [menuCategory: string]: IngredientMenu[];
}

export interface IngredientMenu {
  id: number;
  name: string;
  quantity: number | null;
  unit: string | null;
}

const initialState = {
  weeklyMenu: {} as WeeklyMenu,
  menuIndex: {} as { [menuId: number]: { day: string; moment: string } },
};

export const weeklyMenuSlice = createSlice({
  name: "weeklyMenu",
  initialState,
  reducers: {
    setWeeklyMenu: (state, action: PayloadAction<WeeklyMenu>) => {
      state.weeklyMenu = action.payload;

      state.menuIndex = {};
      for (const day of Object.keys(action.payload)) {
        const dayMenu = action.payload[day as keyof WeeklyMenu];
        for (const moment of ["morning", "noon", "evening"] as const) {
          const menu = dayMenu[moment];
          if (menu) {
            state.menuIndex[menu.id] = { day, moment };
          }
        }
      }
    },
    menuUpdated: (state, action: PayloadAction<Menu>) => {
      const menuId = action.payload.id;
      const updatedMenu = action.payload;

      const menuLocation = state.menuIndex[menuId];
      if (menuLocation) {
        const { day, moment } = menuLocation;
        state.weeklyMenu[day as keyof WeeklyMenu][moment as keyof DayMenu] =
          updatedMenu;
      }
    },
    menuDoneToggled: (
      state,
      action: PayloadAction<{ menuId: number; done: boolean }>,
    ) => {
      const { menuId, done } = action.payload;

      const menuLocation = state.menuIndex[menuId];
      if (menuLocation) {
        const { day, moment } = menuLocation;
        const menu =
          state.weeklyMenu[day as keyof WeeklyMenu][moment as keyof DayMenu];
        if (menu) {
          menu.done = done;
        }
      }
    },
    clearMenu: (state, action: PayloadAction<number>) => {
      const menuId = action.payload;

      const menuLocation = state.menuIndex[menuId];
      if (menuLocation) {
        const { day, moment } = menuLocation;
        const menu =
          state.weeklyMenu[day as keyof WeeklyMenu][moment as keyof DayMenu];

        if (menu) {
          state.weeklyMenu[day as keyof WeeklyMenu][moment as keyof DayMenu] = {
            id: menu.id,
            done: false,
            ingredients: {},
          };
        }
      }
    },
    ingredientMenuQuantitySetted: (
      state,
      action: PayloadAction<{
        ingredientId: number;
        menuId: number;
        delta: number;
      }>,
    ) => {
      const { ingredientId, menuId, delta } = action.payload;

      const menuLocation = state.menuIndex[menuId];
      if (menuLocation) {
        const { day, moment } = menuLocation;
        const menu =
          state.weeklyMenu[day as keyof WeeklyMenu][moment as keyof DayMenu];

        if (menu) {
          for (const menuCategory of Object.keys(menu.ingredients)) {
            const ingredients = menu.ingredients[menuCategory];

            const ingredientIndex = ingredients.findIndex(
              (ingredient: IngredientMenu) => ingredient.id === ingredientId,
            );

            if (ingredientIndex !== -1) {
              const ingredient = ingredients[ingredientIndex];
              ingredients[ingredientIndex] = {
                ...ingredient,
                quantity:
                  ingredient.quantity !== null
                    ? delta !== -1 && delta !== 1
                      ? delta
                      : ingredient.quantity + delta
                    : ingredient.quantity,
              };
            }
          }
        }
      }
    },
  },
});

export const {
  setWeeklyMenu,
  menuUpdated,
  menuDoneToggled,
  clearMenu,
  ingredientMenuQuantitySetted,
} = weeklyMenuSlice.actions;
export default weeklyMenuSlice.reducer;
