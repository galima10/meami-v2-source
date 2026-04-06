import type { WithRequiredId } from "@app-types/NameId";
import type { Recipe, RecipeIngredient } from "@stores/features/recipes";
import type { RecipeRaw } from "@services/recipes";

export function formatRecipes(rawData: RecipeRaw[]): WithRequiredId<Recipe>[] {
  const treated = rawData.reduce(
    (acc, item) => {
      const key = item.recipe_id;
      if (!acc[key]) {
        const categoryIds = item.recipe_category_ids
          .split(",")
          .map((rc) => parseInt(rc));
        acc[key] = {
          id: item.recipe_id,
          name: item.recipe_name,
          type: item.recipe_type.toLowerCase(),
          duration: item.recipe_duration,
          imagePreview: item.image_preview,
          recipe: item.recipe,
          categoryIds: categoryIds,
          isMorning: Boolean(item.is_morning),
          ingredientsMap: {} as Record<string, RecipeIngredient>,
        };
      }

      const recipe = acc[key];

      if (!recipe.ingredientsMap[item.ingredient_id]) {
        recipe.ingredientsMap[item.ingredient_id] = {
          ingredientId: item.ingredient_id,
          quantity: item.quantity,
          unitId: item.unit_id,
          menuCategoryId: item.menu_category_id,
        };
      }

      return acc;
    },
    {} as Record<number, any>,
  );
  return Object.values(treated).map((r) => ({
    id: r.id,
    name: r.name,
    type: r.type,
    duration: r.duration,
    imagePreview: r.imagePreview,
    recipe: r.recipe,
    categoryIds: r.categoryIds,
    isMorning: r.isMorning,
    ingredients: Object.values(r.ingredientsMap),
  }));
}
