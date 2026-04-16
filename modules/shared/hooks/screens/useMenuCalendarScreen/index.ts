import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import {
  fetchAllMenusThunk,
  fetchWeeklyMenuThunk,
} from "@stores/thunks/weeklyMenu";
import { weeklyMenuToUi } from "@utils/dataToUi/weeklyMenuToUi";
import { fetchIngredientsThunk } from "@stores/thunks/ingredients";

export function useMenuCalendarScreen() {
  const dispatch = useAppDispatch();
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { moments, days } = useAppSelector((state) => state.seed);
  const weeklyMenuUi = useMemo(
    () => weeklyMenuToUi(weeklyMenu, days, moments),
    [weeklyMenu, days, moments],
  );
  const [selectedMoment, setSelectedMoment] = useState<
    "matin" | "midi" | "soir"
  >("matin");
  useEffect(() => {
    async function fetchMenus() {
      await dispatch(fetchAllMenusThunk());
      await dispatch(fetchWeeklyMenuThunk());
    }
    if (Object.keys(weeklyMenu).length === 0) {
      fetchMenus();
    }
    if (Object.keys(ingredients).length === 0) {
      dispatch(fetchIngredientsThunk());
    }
  }, []);

  return { weeklyMenuUi, selectedMoment, setSelectedMoment };
}
