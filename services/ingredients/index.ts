import type { WithRequiredId, SeedRow } from "@app-types/NameId";
import { getDb } from "@database/database";
import type { IngredientCategory } from "@stores/features/ingredientCategories";
import type { Ingredient } from "@stores/features/ingredients";
import type { Unit } from "@stores/features/units";

export interface IngredientRaw {
  ingredient_id: number;
  menu_categories: number;
  category_name: string;
  ingredient_name: string;
  quantifiable: number;
  stock_quantity: number;
  abbreviation: string;
  storage_locations: string;
}

export async function FetchIngredientsService() {
  const db = await getDb();
  return db.getAllAsync<IngredientRaw>(`
    SELECT
      i.id_ingredients AS ingredient_id,
      GROUP_CONCAT(DISTINCT mc.name ORDER BY mc.name) AS menu_categories,
      ic.name AS category_name,
      i.name AS ingredient_name,
      i.quantifiable,
      i.stock_quantity,
      u.abbreviation AS abbreviation,
      GROUP_CONCAT(DISTINCT sl.name ORDER BY sl.name) AS storage_locations
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
  unit: WithRequiredId<Unit>,
  category: WithRequiredId<IngredientCategory>,
) {
  const db = await getDb();
  const result = await db.runAsync(
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
      $stockQuantity,
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
      $stockQuantity: stockQuantity,
      $unitId: unit.id,
      $categoryId: category.id,
    },
  );
  const id = result.lastInsertRowId;
  return {
    id,
    name: ingredientName,
    quantifiable: quantifiable,
    stockQuantity: stockQuantity,
    unit: unit,
    category: category,
  };
}

async function AddMenuCategoryToIngredientService(
  menuCategoryId: number,
  ingredientId: number,
) {
  const db = await getDb();
  await db.runAsync(
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
) {
  const db = await getDb();
  await db.runAsync(
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

export async function CreateIngredientService(newIngredient: Ingredient) {
  const db = await getDb();
  let createdIngredient: Awaited<
    ReturnType<typeof CreateIngredientInfosService>
  > | null = null;
  await db.withExclusiveTransactionAsync(async () => {
    createdIngredient = await CreateIngredientInfosService(
      newIngredient.name,
      newIngredient.quantifiable,
      newIngredient.stockQuantity,
      newIngredient.unit,
      newIngredient.category,
    );
    for (const menuCategory of newIngredient.menuCategories) {
      await AddMenuCategoryToIngredientService(
        menuCategory.id,
        createdIngredient.id,
      );
    }
    for (const storageLocation of newIngredient.storageLocations) {
      await AddStorageLocationToIngredientService(
        storageLocation.id,
        createdIngredient.id,
      );
    }
  });
  if (!createdIngredient) {
    throw new Error("Ingredient creation failed");
  }
  return createdIngredient;
}

async function UpdateIngredientInfosService(
  ingredientId: number,
  ingredientName: string,
  quantifiable: boolean,
  stockQuantity: number,
  unitId: number,
  categoryId: number,
) {
  const db = await getDb();
  await db.runAsync(
    `
    UPDATE
      ingredients
    SET
      name = $name,
      quantifiable = $quantifiable,
      stock_quantity = $stockQuantity,
      id_ingredient_categories = COALESCE(
        (
          SELECT
            id_ingredient_categories
          FROM
            ingredient_categories
          WHERE
            name = $categoryId
          LIMIT
            1
        ), id_ingredient_categories
      ), id_units = COALESCE(
        (
          SELECT
            id_units
          FROM
            units
          WHERE
            name = $unitId
          LIMIT
            1
        ), id_units
      )
    WHERE
      id_ingredients = $ingredientId;
  `,
    {
      $name: ingredientName,
      $quantifiable: quantifiable ? 1 : 0,
      $stockQuantity: stockQuantity,
      $unitId: unitId,
      $categoryId: categoryId,
      $ingredientId: ingredientId,
    },
  );
}

async function RemoveMenuCategoriesFromIngredientService(ingredientId: number) {
  const db = await getDb();
  await db.runAsync(
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
) {
  const db = await getDb();
  await db.runAsync(
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

export async function UpdateIngredientService(
  newIngredient: WithRequiredId<Ingredient>,
) {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async () => {
    await UpdateIngredientInfosService(
      newIngredient.id,
      newIngredient.name,
      newIngredient.quantifiable,
      newIngredient.stockQuantity,
      newIngredient.unit.id,
      newIngredient.category.id,
    );
    await RemoveMenuCategoriesFromIngredientService(newIngredient.id);
    for (const menuCategory of newIngredient.menuCategories) {
      await AddMenuCategoryToIngredientService(
        menuCategory.id,
        newIngredient.id,
      );
    }
    await RemoveStorageLocationsFromIngredientService(newIngredient.id);
    for (const storageLocation of newIngredient.storageLocations) {
      await AddStorageLocationToIngredientService(
        storageLocation.id,
        newIngredient.id,
      );
    }
  });
}

export async function UpdateStorageLocationService(
  ingredientId: number,
  newStorageLocations: WithRequiredId<SeedRow>[],
) {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async () => {
    await RemoveStorageLocationsFromIngredientService(ingredientId);
    for (const storageLocation of newStorageLocations) {
      await AddStorageLocationToIngredientService(
        storageLocation.id,
        ingredientId,
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

async function UpdateStockFromMenu() {
  const db = await getDb();
  await db.runAsync(
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

async function UpdateStockFromShopping() {
  const db = await getDb();
  await db.runAsync(
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
    ), 0)
    WHERE quantifiable = 1;
  `,
  );
}

export async function UpdateStockService(from: "menu" | "shopping") {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async () => {
    if (from === "menu") await UpdateStockFromMenu();
    else await UpdateStockFromShopping();
  });
}
