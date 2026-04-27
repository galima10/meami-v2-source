import { useAppSelector } from "@modules/shared/hooks/redux";

export function getDayById(dayId: number) {
  return useAppSelector((state) => state.seed.days[dayId]) ?? 0;
}

export function getMomentById(momentId: number) {
  return useAppSelector((state) => state.seed.moments[momentId]) ?? null;
}