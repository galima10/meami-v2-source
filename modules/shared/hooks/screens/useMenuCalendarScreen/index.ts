import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import {
  fetchAllMenusThunk,
  fetchWeeklyMenuThunk,
} from "@stores/thunks/weeklyMenu";
import {
  weeklyMenuToUi,
  MenuUi,
  MomentUi,
} from "@utils/dataToUi/weeklyMenuToUi";

export function useMenuCalendarScreen() {
  const dispatch = useAppDispatch();
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { moments, days, menuCategories } = useAppSelector(
    (state) => state.seed,
  );
  const weeklyMenuUi = weeklyMenuToUi(weeklyMenu, days, moments);
  useEffect(() => {
    async function fetchMenus() {
      await dispatch(fetchAllMenusThunk());
      await dispatch(fetchWeeklyMenuThunk());
    }
    if (Object.keys(weeklyMenu).length === 0) {
      fetchMenus();
    }
  }, []);
  
  return { weeklyMenuUi };
}
