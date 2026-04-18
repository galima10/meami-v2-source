import {
  morningMenuCategoriesOrder,
  noonEveningMenuCategoriesOrder,
} from "@constants/mappings/orders/menuCategoriesOrder";
import type { MomentUi } from "@mappers/dataToUi/weeklyMenuToUi";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import { removeMenuThunk, setMenuDoneThunk } from "@stores/thunks/weeklyMenu";
import { useEffect, useMemo, useState } from "react";

export function useDayCardCalendar(
  selectedMoment: "matin" | "midi" | "soir",
  moments: MomentUi,
  moment: "matin" | "midi" | "soir",
) {
  const menu = moments[selectedMoment.toUpperCase()];
  const [checked, setChecked] = useState(menu?.done);
  const dispatch = useAppDispatch();
  async function handleCheckMenu() {
    const newValue = !checked;
    setChecked(newValue);
    await dispatch(setMenuDoneThunk({ menuId: menu?.id, done: newValue }));
  }

  const categories = Object.entries(
    moment === "matin"
      ? morningMenuCategoriesOrder
      : noonEveningMenuCategoriesOrder,
  ) as [string, string][];
  const ingredientsByCategory = useMemo(() => {
    return menu?.ingredients ?? {};
  }, [menu]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReady(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  function handleRemoveMenu() {
    if (Object.values(menu?.ingredients).length === 0) return;
    dispatch(removeMenuThunk(menu?.id));
  }

  return {
    handleCheckMenu,
    menu,
    checked,
    setChecked,
    ready,
    categories,
    ingredientsByCategory,
    handleRemoveMenu,
  };
}
