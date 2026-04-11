import { getDb } from "@database/database";
import { toDbNumberOrNull } from "@helpers/dbHelpers";
import type { Recipe, RecipeType, Recipes } from "@stores/features/recipes";
import type { SQLiteDatabase } from "expo-sqlite";

export interface RecipeRaw {
  recipe_id: number;
  recipe_name: string;
  recipe_type: string;
  recipe_duration: number;
  image_preview: string;
  recipe: string;
  is_morning: number;
  recipe_category_ids: string;
  ingredient_id: number;
  quantity: number;
  unit_id: number;
  menu_category_id: number;
}

export async function FetchRecipesService() {
  const db = await getDb();
  return db.getAllAsync<RecipeRaw>(`
    SELECT
      r.id_recipes AS recipe_id,
      r.name AS recipe_name,
      r.type AS recipe_type,
      r.duration_in_minutes AS recipe_duration,
      r.preview_image_url AS image_preview,
      r.recipe,
      r.is_morning,
      GROUP_CONCAT(DISTINCT rc.id_recipe_categories) AS recipe_category_ids,
      i.id_ingredients AS ingredient_id,
      ril.quantity,
      u.id_units AS unit_id,
      ril.id_menu_categories AS menu_category_id
    FROM
      recipes r
      LEFT JOIN recipe_category_links rcl ON rcl.id_recipes = r.id_recipes
      LEFT JOIN recipe_categories rc ON rc.id_recipe_categories = rcl.id_recipe_categories
      LEFT JOIN recipe_ingredient_links ril ON ril.id_recipes = r.id_recipes
      LEFT JOIN ingredients i ON i.id_ingredients = ril.id_ingredients
      LEFT JOIN units u ON u.id_units = ril.id_units
    GROUP BY
      r.id_recipes,
      i.id_ingredients;
  `);
}

export async function DeleteRecipeService(recipeId: number) {
  const db = await getDb();
  await db.runAsync(
    `
    DELETE FROM
      recipes
    WHERE
      id_recipes = ?;
  `,
    [recipeId],
  );
}

async function CreateRecipeInfosService(
  recipeName: string,
  duration: number,
  imagePreview: string | null,
  isMorning: boolean,
  type: RecipeType,
  recipe: string | null,
  tx: SQLiteDatabase,
) {
  const result = await tx.runAsync(
    `
    INSERT INTO
      recipes (
        name,
        duration_in_minutes,
        preview_image_url,
        is_morning,
        type,
        recipe
      )
    VALUES
      (
        $name,
        $duration,
        $imagePreview,
        $isMorning,
        $type,
        $recipe
      );
  `,
    {
      $name: recipeName,
      $duration: duration,
      $imagePreview: imagePreview,
      $isMorning: isMorning ? 1 : 0,
      $type: type.toUpperCase(),
      $recipe: recipe,
    },
  );
  const id = result.lastInsertRowId;
  return {
    id,
    name: recipeName,
    type,
    duration,
    imagePreview,
    recipe,
    isMorning,
  };
}

async function AddCategoryToRecipe(
  recipeCategoryId: number,
  recipId: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    INSERT INTO
      recipe_category_links (id_recipes, id_recipe_categories)
    SELECT
      r.id_recipes,
      rc.id_recipe_categories
    FROM
      recipes r
      JOIN recipe_categories rc
    WHERE
      r.id_recipes = ?
      AND rc.id_recipe_categories = ?;
  `,
    [recipId, recipeCategoryId],
  );
}

async function AddIngredientToRecipe(
  ingredientId: number,
  quantity: number | null,
  unitId: number | null,
  recipeId: number,
  menuCategoryId: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    INSERT INTO
      recipe_ingredient_links (
        id_recipes,
        id_ingredients,
        quantity,
        id_units,
        id_menu_categories
      )
    VALUES
      (?, ?, MAX(1, ?), ?, ?);
  `,
    [
      recipeId,
      ingredientId,
      toDbNumberOrNull(quantity),
      unitId,
      menuCategoryId,
    ],
  );
}

export async function CreateRecipeService(newRecipe: Recipe) {
  const db = await getDb();
  let createdRecipe: Recipes | null = null;

  await db.withExclusiveTransactionAsync(async (tx) => {
    const baseRecipe = await CreateRecipeInfosService(
      newRecipe.name,
      newRecipe.duration,
      newRecipe.imagePreview,
      newRecipe.isMorning,
      newRecipe.type,
      newRecipe.recipe,
      tx,
    );

    for (const categoryId of newRecipe.categoryIds) {
      await AddCategoryToRecipe(categoryId, baseRecipe.id, tx);
    }

    for (const ingredient of newRecipe.ingredients) {
      await AddIngredientToRecipe(
        ingredient.ingredientId,
        ingredient.quantity,
        ingredient.unitId,
        baseRecipe.id,
        ingredient.menuCategoryId,
        tx,
      );
    }

    createdRecipe = {
      [baseRecipe.id]: {
        ...baseRecipe,
        categoryIds: [...newRecipe.categoryIds],
        ingredients: [...newRecipe.ingredients],
      },
    };
  });

  if (!createdRecipe) {
    throw new Error("Recipe creation failed");
  }

  return createdRecipe as Recipes;
}

async function UpdateRecipeInfosService(
  recipeId: number,
  recipeName: string,
  duration: number,
  imagePreview: string | null,
  isMorning: boolean,
  type: string,
  recipe: string | null,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    UPDATE
      recipes
    SET
      name = $name,
      duration_in_minutes = $duration,
      preview_image_url = $imagePreview,
      is_morning = $isMorning,
      type = $type,
      recipe = $recipe
    WHERE
      id_recipes = $recipeId;
  `,
    {
      $name: recipeName,
      $duration: duration,
      $imagePreview: imagePreview,
      $isMorning: isMorning ? 1 : 0,
      $type: type.toUpperCase(),
      $recipe: recipe,
      $recipeId: recipeId,
    },
  );
}

async function RemoveCategoriesFromRecipeService(
  recipeId: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    DELETE FROM
      recipe_category_links
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          recipes r
        WHERE
          r.id_recipes = recipe_category_links.id_recipes
          AND r.id_recipes = ?
      );
  `,
    [recipeId],
  );
}

async function RemoveIngredientsFromRecipeService(
  recipeId: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    DELETE FROM
      recipe_ingredient_links
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          recipes r
        WHERE
          r.id_recipes = recipe_ingredient_links.id_recipes
          AND r.id_recipes = ?
      );
  `,
    [recipeId],
  );
}

export async function UpdateRecipeService(newRecipe: Recipes) {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    const [recipeIdStr] = Object.keys(newRecipe);
    const recipeId = Number(recipeIdStr);
    const [values] = Object.values(newRecipe) as Recipe[];
    await UpdateRecipeInfosService(
      recipeId,
      values.name,
      values.duration,
      values.imagePreview ?? null,
      values.isMorning,
      values.type,
      values.recipe ?? null,
      tx,
    );
    await RemoveCategoriesFromRecipeService(recipeId, tx);
    for (const categoryId of newRecipe[recipeId].categoryIds) {
      await AddCategoryToRecipe(categoryId, recipeId, tx);
    }
    await RemoveIngredientsFromRecipeService(recipeId, tx);
    for (const ingredient of newRecipe[recipeId].ingredients) {
      await AddIngredientToRecipe(
        ingredient.ingredientId,
        ingredient.quantity,
        ingredient.unitId,
        recipeId,
        ingredient.menuCategoryId,
        tx,
      );
    }
  });
}
