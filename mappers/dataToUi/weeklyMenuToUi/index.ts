import type { WeeklyMenu, MenuIngredients } from "@stores/features/weeklyMenu";
import type { SeedRow } from "@stores/features/seeds";

export interface WeeklyMenuUi {
  [dayName: string]: MomentUi;
}

export interface MomentUi {
  [momentName: string]: MenuUi;
}

export interface MenuUi {
  id: number;
  done: boolean;
  ingredients: MenuIngredients;
}

export function weeklyMenuToUi(
  weeklyMenu: WeeklyMenu,
  days: SeedRow,
  moments: SeedRow,
): WeeklyMenuUi {
  const ui: WeeklyMenuUi = {};
  for (const menuIdStr of Object.keys(weeklyMenu)) {
    const menuId = Number(menuIdStr);
    const menu = weeklyMenu[menuId];

    const dayName = days[menu.dayId]?.name;
    const momentName = moments[menu.momentId]?.name;

    if (!dayName || !momentName) {
      continue;
    }

    if (!ui[dayName]) {
      ui[dayName] = {};
    }

    ui[dayName][momentName] = {
      id: menuId,
      done: menu.done,
      ingredients: menu.ingredients,
    };
  }
  return ui;
}
