import {
  morningMenuCategoriesOrder,
  noonEveningMenuCategoriesOrder,
} from "@constants/mappings/orders/menuCategoriesOrder";
import type { MomentUi } from "@mappers/dataToUi/weeklyMenuToUi";
import { useAppDispatch } from "@modules/shared/hooks/redux";
import { removeMenuThunk, setMenuDoneThunk } from "@stores/thunks/weeklyMenu";
import { useEffect, useState } from "react";

export function useDayCardCalendar() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReady(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return {
    ready,
  };
}
