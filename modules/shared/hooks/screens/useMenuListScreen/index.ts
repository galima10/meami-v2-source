import { weeklyMenuToUi } from "@mappers/dataToUi/weeklyMenuToUi";
import { useAppSelector } from "@modules/shared/hooks/redux";
import { useMemo } from "react";
import { useDate } from "../../useDate";

export function useMenuListScreen() {
  const { todayIndex, dayOfWeek } = useDate();
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { moments, days } = useAppSelector((state) => state.seed);
  const weeklyMenuUi = useMemo(
    () => weeklyMenuToUi(weeklyMenu, days, moments),
    [weeklyMenu, days, moments],
  );
  return { weeklyMenuUi, today: dayOfWeek };
}
