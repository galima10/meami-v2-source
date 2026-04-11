import type {
  WeeklyMenuIngredients,
  WeeklyMenu,
} from "@stores/features/weeklyMenu";
import type { WeeklyMenuRaw, MenuRaw } from "@services/weeklyMenu";
import { fromDbNumberOrNull } from "helpers/dbHelpers";

export function formatAllMenus(rawData: MenuRaw[]): WeeklyMenu {
  
  const treated: WeeklyMenu = rawData.reduce<WeeklyMenu>((acc, item) => {
    const menuId = item.menu_id;

    if (!acc[menuId]) {
      acc[menuId] = {
        dayId: item.day_id,
        momentId: item.moment_id,
        done: Boolean(item.done),
        ingredients: {},
      };
    }

    return acc;
  }, {});
  
  return treated;
}

export function formatWeeklyMenu(
  rawData: WeeklyMenuRaw[],
): WeeklyMenuIngredients {
  return rawData.reduce<WeeklyMenuIngredients>((acc, item) => {
    const menuId = item.menu_id;

    if (!acc[menuId]) {
      acc[menuId] = {};
    }

    const menu = acc[menuId];

    if (!menu[item.menu_category_id]) {
      menu[item.menu_category_id] = [];
    }

    menu[item.menu_category_id].push({
      ingredientId: item.ingredient_id,
      quantity: fromDbNumberOrNull(item.quantity) ?? null,
      unitId: item.unit_id ?? null,
    });

    return acc;
  }, {});
}
