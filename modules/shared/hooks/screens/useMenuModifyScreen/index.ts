import type { Ingredients, Ingredient } from "@stores/features/ingredients";
import { useState, useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux";
import { fetchRecipesThunk } from "@stores/thunks/recipes";
import type { Recipe } from "@stores/features/recipes";

type ListItem =
  | { id: string; type: "ingredient"; ingredient: Ingredient }
  | { id: string; type: "recipe"; recipe: Recipe };

export function useMenuModifyScreen(
  ingredients: Ingredients,
  selectedMoment: "matin" | "midi" | "soir",
) {
  const isMorning = selectedMoment === "matin" ? true : false;
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
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
  };
}
