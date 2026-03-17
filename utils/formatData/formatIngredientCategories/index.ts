import type { IngredientCategory } from "@stores/features/ingredientCategories";
import type { IngredientCategoryRaw } from "@services/ingredientCategories";

export function formatIngredientCategories(rawData: IngredientCategoryRaw[]): IngredientCategory[] {
  const treated: IngredientCategory[] = rawData.map(data => {
    return {
      id: data.ingredient_category_id,
      name: data.ingredient_category_name
    }
  })
  return treated;
}