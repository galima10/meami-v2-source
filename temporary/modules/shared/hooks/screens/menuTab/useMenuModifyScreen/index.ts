import type { Ingredient } from "@stores/features/ingredients";
import type { Recipe } from "@stores/features/recipes";
import { fetchRecipesThunk } from "@stores/thunks/recipes";
import { useEffect, useMemo, useState } from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../../../../modules/shared/hooks/redux";
import { useMenuScreen } from "../useMenuScreen";

type ListItem =
  | { id: string; type: "ingredient"; ingredient: Ingredient }
  | { id: string; type: "recipe"; recipe: Recipe };

export function useMenuModifyScreen() {
  const {
    currentIndex,
    setCurrentIndex,
    scrollRef,
    goToSlideDay,
    actualDayMoment,
    todayIndex,
    refreshDateInfo,
    selectedMoment,
    setSelectedMoment,
    menuSchedule,
    getActualMenu,
  } = useMenuScreen();
  const [unitSelected, setUnitSelected] = useState<number | null>(null);
  const isMorning = selectedMoment === 1 ? true : false;
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isUnitsPanelOpen, setIsUnitsPanelOpen] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<{
    ingredientId: number | null;
    menuId: number | null;
  }>({
    ingredientId: null,
    menuId: null,
  });
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { recipes } = useAppSelector((state) => state.recipe);
  const dispatch = useAppDispatch();
  const [actualElements, setActualElements] = useState<{
    type: "recipes" | "ingredients" | null;
    categoryId?: number;
  }>({
    type: null,
  });
  const filteredElements = useMemo<ListItem[]>(() => {
    if (actualElements.type === "ingredients") {
      return (Object.entries(ingredients) as [string, Ingredient][])
        .filter(([_, ingredient]) =>
          ingredient.menuCategoryIds.includes(actualElements.categoryId!),
        )
        .map(([id, ingredient]) => ({
          id,
          type: "ingredient" as const,
          ingredient,
        }));
    }

    return (Object.entries(recipes) as [string, Recipe][])
      .filter(([_, recipe]) => recipe.isMorning === isMorning)
      .map(([id, recipe]) => ({
        id,
        type: "recipe" as const,
        recipe,
      }));
  }, [ingredients, actualElements, recipes, isMorning]);

  useEffect(() => {
    if (Object.keys(recipes).length === 0) {
      dispatch(fetchRecipesThunk());
    }
  }, []);
  return {
    setIsPanelOpen,
    isPanelOpen,
    setActualElements,
    filteredElements,
    unitSelected,
    setUnitSelected,
    isUnitsPanelOpen,
    setIsUnitsPanelOpen,
    selectedIngredient,
    setSelectedIngredient,
    selectedMoment,
    setSelectedMoment,
    scrollRef,
    currentIndex,
    setCurrentIndex,
    todayIndex,
    menuSchedule,
    getActualMenu,
    goToSlideDay,
    actualDayMoment,
  };
}
