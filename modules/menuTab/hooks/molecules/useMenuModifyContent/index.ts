import { useMemo, SetStateAction, Dispatch } from "react";
import type { MenuUi } from "@mappers/dataToUi/weeklyMenuToUi";
import { useAppSelector } from "@modules/shared/hooks/redux";

export function useMenuModifyContent(
  menu: MenuUi,
) {
  const { ingredients } = useAppSelector((state) => state.ingredient);

  const ingredientsByCategory = useMemo(() => {
    return menu?.ingredients ?? {};
  }, [menu]);

  return {
    ingredientsByCategory,
    ingredients,
  };
}
