import { useAppSelector } from "../redux";

export function useIdSelectors() {
  function getUnitAbbrById(unitId: number | null) {
    return unitId
      ? useAppSelector((state) => state.unit.units[unitId].abbreviation)
      : null;
  }

  function getIngredientNameById(ingredientId: number) {
    return useAppSelector(
      (state) => state.ingredient.ingredients[ingredientId].name,
    );
  }
  return { getUnitAbbrById, getIngredientNameById };
}
