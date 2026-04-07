import type { RecipeCategories } from "@stores/features/recipeCategories";
import type { RecipeCategoryRaw } from "@services/recipeCategories";
import type { WithRequiredId } from "@app-types/NameId";

export function formatRecipeCategories(
  rawData: RecipeCategoryRaw[],
): RecipeCategories {
  const treated = rawData.reduce<RecipeCategories>((acc, data) => {
    acc[data.recipe_category_id] = {
      name: data.recipe_category_name,
    };

    return acc;
  }, {});

  return treated;
}
