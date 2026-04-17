import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import { setMenuDoneThunk } from "@stores/thunks/weeklyMenu";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";

export function useDayCardCalendar(
  selectedMoment: "matin" | "midi" | "soir",
  moments: MomentUi,
) {
  const menu = moments[selectedMoment.toUpperCase()];
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { menuCategories } = useAppSelector((state) => state.seed);
  const [checked, setChecked] = useState(menu?.done);
  const dispatch = useAppDispatch();
  async function handleCheckMenu() {
    const newValue = !checked;
    setChecked(newValue);
    await dispatch(setMenuDoneThunk({ menuId: menu?.id, done: newValue }));
  }
  return { ingredients, handleCheckMenu, menu, checked, setChecked, menuCategories };
}
