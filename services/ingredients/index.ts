import { getDb } from "@database/database";
import { toDbNumber } from "@helpers/dbHelpers";
import type { Ingredient, Ingredients } from "@stores/features/ingredients";
import type { SQLiteDatabase } from "expo-sqlite";

export interface IngredientRaw {
  ingredient_id: number;
  menu_category_ids: string;
  category_id: number;
  ingredient_name: string;
  quantifiable: number;
  stock_quantity: number;
  unit_id: number;
  storage_location_ids: string;
}

export async function FetchIngredientsService() {
  const db = await getDb();
  return db.getAllAsync<IngredientRaw>(`
    SELECT
      i.id_ingredients AS ingredient_id,
      GROUP_CONCAT(DISTINCT mc.id_menu_categories) AS menu_category_ids,
      ic.id_ingredient_categories AS category_id,
      i.name AS ingredient_name,
      i.quantifiable,
      i.stock_quantity,
      u.id_units AS unit_id,
      GROUP_CONCAT(DISTINCT sl.id_storage_locations) AS storage_location_ids
    FROM
      ingredients i
      JOIN units u ON u.id_units = i.id_units
      JOIN ingredient_categories ic ON ic.id_ingredient_categories = i.id_ingredient_categories
      JOIN ingredient_menu_category_links imc ON imc.id_ingredients = i.id_ingredients
      JOIN menu_categories mc ON mc.id_menu_categories = imc.id_menu_categories
      LEFT JOIN ingredient_storage_location_links isll ON isll.id_ingredients = i.id_ingredients
      LEFT JOIN storage_locations sl ON sl.id_storage_locations = isll.id_storage_locations
    GROUP BY i.id_ingredients;  
  `);
}

async function CreateIngredientInfosService(
  ingredientName: string,
  quantifiable: boolean,
  stockQuantity: number,
  unitId: number,
  categoryId: number,
  tx: SQLiteDatabase,
) {
  const result = await tx.runAsync(
    `
    INSERT INTO
      ingredients (
        name,
        quantifiable,
        stock_quantity,
        id_ingredient_categories,
        id_units
      )
    SELECT
      $name,
      $quantifiable,
      MAX(0, $stockQuantity),
      ic.id_ingredient_categories,
      (
        SELECT
          id_units
        FROM
          units
        WHERE
          id_units = $unitId
      )
    FROM
      ingredient_categories ic
    WHERE
      ic.id_ingredient_categories = $categoryId;
  `,
    {
      $name: ingredientName,
      $quantifiable: quantifiable ? 1 : 0,
      $stockQuantity: toDbNumber(stockQuantity),
      $unitId: unitId,
      $categoryId: categoryId,
    },
  );
  const id = result.lastInsertRowId;
  return {
    id,
    name: ingredientName,
    quantifiable: quantifiable,
    stockQuantity: stockQuantity,
    unitId: unitId,
    categoryId: categoryId,
  };
}

async function AddMenuCategoryToIngredientService(
  menuCategoryId: number,
  ingredientId: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    INSERT INTO
      ingredient_menu_category_links (id_ingredients, id_menu_categories)
    SELECT
      i.id_ingredients,
      mc.id_menu_categories
    FROM
      ingredients i
      JOIN menu_categories mc
    WHERE
      i.id_ingredients = ?
      AND mc.id_menu_categories = ?;
  `,
    [ingredientId, menuCategoryId],
  );
}

async function AddStorageLocationToIngredientService(
  storageLocationId: number,
  ingredientId: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    INSERT INTO
      ingredient_storage_location_links (id_ingredients, id_storage_locations)
    SELECT
      i.id_ingredients,
      sl.id_storage_locations
    FROM
      ingredients i
      JOIN storage_locations sl
    WHERE
      i.id_ingredients = ?
      AND sl.id_storage_locations = ?;
  `,
    [ingredientId, storageLocationId],
  );
}

export async function CreateIngredientService(
  newIngredient: Ingredient,
): Promise<Ingredients> {
  const db = await getDb();
  let createdIngredient: Ingredients | null = null;

  await db.withExclusiveTransactionAsync(async (tx) => {
    const baseIngredient = await CreateIngredientInfosService(
      newIngredient.name,
      newIngredient.quantifiable,
      newIngredient.stockQuantity,
      newIngredient.unitId,
      newIngredient.categoryId,
      tx,
    );

    for (const menuCategoryId of newIngredient.menuCategoryIds) {
      await AddMenuCategoryToIngredientService(
        menuCategoryId,
        baseIngredient.id,
        tx,
      );
    }

    if (newIngredient.storageLocationIds) {
      for (const storageLocationId of newIngredient.storageLocationIds) {
        await AddStorageLocationToIngredientService(
          storageLocationId,
          baseIngredient.id,
          tx,
        );
      }
    }

    createdIngredient = {
      [baseIngredient.id]: {
        name: baseIngredient.name,
        categoryId: baseIngredient.categoryId,
        stockQuantity: baseIngredient.stockQuantity,
        unitId: baseIngredient.unitId,
        menuCategoryIds: newIngredient.menuCategoryIds,
        quantifiable: baseIngredient.quantifiable,
        storageLocationIds: newIngredient.storageLocationIds,
      },
    };
  });

  if (!createdIngredient) {
    throw new Error("Ingredient creation failed");
  }

  return createdIngredient as Ingredients;
}

async function UpdateIngredientInfosService(
  ingredientId: number,
  ingredientName: string,
  quantifiable: boolean,
  stockQuantity: number,
  unitId: number,
  categoryId: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    UPDATE
      ingredients
    SET
      name = $name,
      quantifiable = $quantifiable,
      stock_quantity = MAX(0, $stockQuantity),
      id_ingredient_categories = $categoryId, 
      id_units = $unitId
    WHERE
      id_ingredients = $ingredientId;
  `,
    {
      $name: ingredientName,
      $quantifiable: quantifiable ? 1 : 0,
      $stockQuantity: toDbNumber(stockQuantity),
      $unitId: unitId,
      $categoryId: categoryId,
      $ingredientId: ingredientId,
    },
  );
}

async function RemoveMenuCategoriesFromIngredientService(
  ingredientId: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    DELETE FROM
      ingredient_menu_category_links
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          ingredients i
        WHERE
          i.id_ingredients = ingredient_menu_category_links.id_ingredients
          AND i.id_ingredients = ?
      );
  `,
    [ingredientId],
  );
}

async function RemoveStorageLocationsFromIngredientService(
  ingredientId: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    DELETE FROM
      ingredient_storage_location_links
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          ingredients i
        WHERE
          i.id_ingredients = ingredient_storage_location_links.id_ingredients
          AND i.id_ingredients = ?
      );
  `,
    [ingredientId],
  );
}

export async function UpdateIngredientService(newIngredient: Ingredients) {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    const [ingredientIdStr] = Object.keys(newIngredient);
    const ingredientId = Number(ingredientIdStr);
    const [values] = Object.values(newIngredient) as Ingredient[];
    await UpdateIngredientInfosService(
      ingredientId,
      values.name,
      values.quantifiable,
      values.stockQuantity,
      values.unitId,
      values.categoryId,
      tx,
    );
    await RemoveMenuCategoriesFromIngredientService(ingredientId, tx);
    for (const menuCategoryId of values.menuCategoryIds) {
      await AddMenuCategoryToIngredientService(
        menuCategoryId,
        ingredientId,
        tx,
      );
    }
    await RemoveStorageLocationsFromIngredientService(ingredientId, tx);
    if (values.storageLocationIds) {
      for (const storageLocationId of values.storageLocationIds) {
        await AddStorageLocationToIngredientService(
          storageLocationId,
          ingredientId,
          tx,
        );
      }
    }
  });
}

export async function UpdateStorageLocationsService(
  ingredientId: number,
  newStorageLocationIds: number[],
) {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    await RemoveStorageLocationsFromIngredientService(ingredientId, tx);
    for (const storageLocationId of newStorageLocationIds) {
      await AddStorageLocationToIngredientService(
        storageLocationId,
        ingredientId,
        tx,
      );
    }
  });
}

export async function SetQuantifiableService(
  ingredientId: number,
  newQuantifiable: boolean,
) {
  const db = await getDb();
  await db.runAsync(
    `
  UPDATE
    ingredients 
  SET
    quantifiable = ?
  WHERE
    id_ingredients = ?;  
  `,
    [newQuantifiable ? 1 : 0, ingredientId],
  );
}

export async function DeleteIngredientService(ingredientId: number) {
  const db = await getDb();
  await db.runAsync(
    `
  DELETE FROM
    ingredients
  WHERE
    id_ingredients = ?;
  `,
    [ingredientId],
  );
}

async function UpdateStockFromMenu(tx: SQLiteDatabase) {
  await tx.runAsync(
    `
    UPDATE
      ingredients
    SET
      stock_quantity = stock_quantity - (
        SELECT
          COALESCE(SUM(mil.quantity), 0)
        FROM
          menu_ingredient_links mil
          JOIN menus m ON m.id_menus = mil.id_menus
        WHERE
          mil.id_ingredients = ingredients.id_ingredients
          AND m.done = 1
      )
    WHERE
      quantifiable = 1
      AND stock_quantity > 0;
  `,
  );
}

async function UpdateStockFromShopping(tx: SQLiteDatabase) {
  await tx.runAsync(
    `
    UPDATE ingredients
    SET stock_quantity = stock_quantity + COALESCE((
      SELECT 
        SUM(sli.quantity_buyed)
      FROM 
        shopping_list_items sli
      JOIN shopping_lists sl ON sl.id_shopping_lists = sli.id_shopping_lists
      WHERE 
        sli.id_ingredients = ingredients.id_ingredients
        AND sl.id_shopping_lists = (
            SELECT 
              id_shopping_lists
            FROM 
              shopping_lists
            ORDER BY created_at DESC
            LIMIT 1
        )
        AND sli.quantity_buyed >= 0
    ), 0);
  `,
  );
}

export async function UpdateStockService(from: "menu" | "shopping") {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    if (from === "menu") await UpdateStockFromMenu(tx);
    else await UpdateStockFromShopping(tx);
  });
}
