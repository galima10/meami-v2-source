import { getDb } from "@database/database";
import type { RecipeCategory } from "@stores/features/recipeCategories";

export interface RecipeCategoryRaw {
  recipe_category_id: number;
  recipe_category_name: string;
}

export async function FetchRecipeCategoriesService() {
  const db = await getDb();
  return db.getAllAsync<RecipeCategoryRaw>(`
    SELECT
      rc.id_recipe_categories AS recipe_category_id,
      rc.name AS recipe_category_name
    FROM
      recipe_categories rc;
  `);
}

export async function CreateRecipeCategoryService(
  newRecipeCategory: RecipeCategory,
) {
  const db = await getDb();
  const result = await db.runAsync(
    `
    INSERT INTO
      recipe_categories (name)
    VALUES
      (?);
  `,
    [newRecipeCategory.name],
  );
  const id = result.lastInsertRowId;
  return { id, ...newRecipeCategory };
}

export async function DeleteRecipeCategoryService(recipeCategoryId: number) {
  const db = await getDb();
  await db.runAsync(
    `
    DELETE FROM
      recipe_categories
    WHERE
      id_recipe_categories = ?;
  `,
    [recipeCategoryId],
  );
}
