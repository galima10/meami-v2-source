import type { WithRequiredId } from "@app-types/NameId";
import type {
  Recipe,
  RecipeIngredient,
  Recipes,
  RecipeType,
} from "@stores/features/recipes";
import type { RecipeRaw } from "@services/recipes";

export function formatRecipes(rawData: RecipeRaw[]): Recipes {
  const treated = rawData.reduce<Recipes>((acc, item) => {
    const recipeId = item.recipe_id;

    if (!acc[recipeId]) {
      const categoryIds = item.recipe_category_ids
        .split(",")
        .map((rc) => parseInt(rc));

      acc[recipeId] = {
        name: item.recipe_name,
        type: item.recipe_type.toLowerCase() as RecipeType,
        duration: item.recipe_duration,
        imagePreview: item.image_preview,
        recipe: item.recipe,
        categoryIds: categoryIds,
        isMorning: Boolean(item.is_morning),
        ingredients: [],
      };
    }

    const recipe = acc[recipeId];

    if (
      !recipe.ingredients.some((i) => i.ingredientId === item.ingredient_id)
    ) {
      recipe.ingredients.push({
        ingredientId: item.ingredient_id,
        quantity: item.quantity,
        unitId: item.unit_id,
        menuCategoryId: item.menu_category_id,
      });
    }

    return acc;
  }, {});

  return treated;
}
