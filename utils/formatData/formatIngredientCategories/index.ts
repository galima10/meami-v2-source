import type { IngredientCategory } from "@stores/features/ingredientCategories";
import type { IngredientCategoryRaw } from "@services/ingredientCategories";
import type { WithRequiredId } from "@app-types/NameId";

export function formatIngredientCategories(rawData: IngredientCategoryRaw[]): WithRequiredId<IngredientCategory>[] {
  const treated: WithRequiredId<IngredientCategory>[] = rawData.map(data => {
    return {
      id: data.ingredient_category_id,
      name: data.ingredient_category_name
    }
  })
  return treated;
}