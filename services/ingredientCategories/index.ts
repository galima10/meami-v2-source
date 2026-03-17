import { getDb } from "@database/database";
import type { IngredientCategory } from "@stores/features/ingredientCategories";

export interface IngredientCategoryRaw {
  ingredient_category_id: number;
  ingredient_category_name: string;
}

export async function FetchIngredientCategoriesService() {
  const db = await getDb();
  return db.getAllAsync<IngredientCategoryRaw>(`
    SELECT *
      ic.id_ingredient_categories AS ingredient_category_id,
      ic.name AS ingredient_category_name
    FROM ingredient_categories ic;
  `);
}

export async function CreateIngredientCategoryService(
  newIngredientCategory: IngredientCategory,
) {
  const db = await getDb();
  return db.runAsync(
    `
    INSERT INTO
      ingredient_categories (name)
    VALUES
      (?);
  `,
    [newIngredientCategory.name],
  );
}

export async function DeleteIngredientCategoryService(
  ingredientCategoryId: number,
) {
  const db = await getDb();
  return db.runAsync(
    `
    DELETE FROM
      ingredient_categories
    WHERE
      id_ingredient_categories = ?;
  `,
    [ingredientCategoryId],
  );
}
