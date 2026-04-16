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

export function getDayMoment(hour: number): "matin" | "midi" | "soir" {
  if (hour >= 0 && hour < 12) return "matin";
  if (hour >= 12 && hour < 18) return "midi";
  return "soir";
}
