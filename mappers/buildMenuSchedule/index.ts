import type { WeeklyMenu, MenuSchedule } from "@stores/features/weeklyMenu";

export function buildMenuSchedule(weeklyMenu: WeeklyMenu): MenuSchedule {
  const schedule: MenuSchedule = {};
  for (const menuIdStr of Object.keys(weeklyMenu)) {
    const menuId = Number(menuIdStr);
    const menu = weeklyMenu[menuId];

    const dayId = menu.dayId;
    const momentId = menu.momentId;

    if (!dayId || !momentId) {
      continue;
    }
    if (!schedule[dayId]) {
      schedule[dayId] = {};
    }

    schedule[dayId][momentId] = menuId;
  }
  return schedule;
}
