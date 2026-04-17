import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import { setMenuDoneThunk } from "@stores/thunks/weeklyMenu";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";
import {
  morningMenuCategoriesOrder,
  noonEveningMenuCategoriesOrder,
} from "@constants/mappings/orders/menuCategoriesOrder";
import { removeMenuThunk } from "@stores/thunks/weeklyMenu";

export function useDayCardCalendar(
  selectedMoment: "matin" | "midi" | "soir",
  moments: MomentUi,
  moment: "matin" | "midi" | "soir",
) {
  const menu = moments[selectedMoment.toUpperCase()];
  const { ingredients } = useAppSelector((state) => state.ingredient);
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
    dispatch(removeMenuThunk(menu?.id));
  }

  return {
    ingredients,
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
