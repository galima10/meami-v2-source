import type { FrenchDayOfWeek } from "@app-types/FrenchDayOfWeek";



export function getDateInfo() {
  const now = new Date();
  const dayOfWeek = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
  }).format(now) as FrenchDayOfWeek;
  const dayAndMonth = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
  }).format(now);
  const hour = now.getHours();
  return {
    dayOfWeek,
    dayAndMonth,
    hour,
  };
}

export function getDayMoment(hour: number): 1 | 2 | 3 {
  if (hour >= 0 && hour < 12) return 1;
  if (hour >= 12 && hour < 18) return 2;
  return 3;
}
