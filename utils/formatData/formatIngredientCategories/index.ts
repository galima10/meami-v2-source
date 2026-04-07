import type { IngredientCategories } from "@stores/features/ingredientCategories";
import type { IngredientCategoryRaw } from "@services/ingredientCategories";

export function formatIngredientCategories(
  rawData: IngredientCategoryRaw[],
): IngredientCategories {
  const treated = rawData.reduce<IngredientCategories>((acc, data) => {
    acc[data.ingredient_category_id] = {
      name: data.ingredient_category_name,
    };

    return acc;
  }, {});

  return treated;
}
