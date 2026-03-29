import type { RecipeCategory } from "@stores/features/recipeCategories";
import type { RecipeCategoryRaw } from "@services/recipeCategories";
import type { WithRequiredId } from "@app-types/NameId";

export function formatRecipeCategories(
  rawData: RecipeCategoryRaw[],
): WithRequiredId<RecipeCategory>[] {
  const treated: WithRequiredId<RecipeCategory>[] = rawData.map((data) => {
    return {
      id: data.recipe_category_id,
      name: data.recipe_category_name,
    };
  });
  return treated;
}
