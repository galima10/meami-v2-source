import { getDb } from "@database/database";
import { toDbNumber } from "@helpers/dbHelpers";
import { getDbContext } from "@helpers/getDbContext";
import type { SQLiteDatabase } from "expo-sqlite";

interface ShoppingListIngredientsRaw {
  ingredient_id: number;
  quantity_needed: number;
  quantity_buyed: number;
  unit_id: number;
  category_id: number;
}

interface ShoppingListProductsRaw {
  product_id: number;
  quantity_needed: number;
  quantity_buyed: number;
}

export interface ShoppingListRaw {
  ingredients: ShoppingListIngredientsRaw[];
  products: ShoppingListProductsRaw[];
}

export async function ResetShoppingListService(tx?: SQLiteDatabase) {
  const db = await getDbContext(tx);
  await db.execAsync(`
    DELETE FROM shopping_lists;
    INSERT INTO shopping_lists DEFAULT VALUES;
  `);
}

async function InsertShoppingListService(tx: SQLiteDatabase) {
  await tx.runAsync(
    `
    INSERT INTO
      shopping_list_items (
        id_shopping_lists,
        id_ingredients,
        quantity_needed,
        quantity_buyed,
        quantifiable,
        id_units
      )
    SELECT
      sl.id_shopping_lists,
      i.id_ingredients,
      SUM(COALESCE(mil.quantity, 0)) - COALESCE(i.stock_quantity, 0) AS quantity_needed,
      0 AS quantity_buyed,
      i.quantifiable,
      i.id_units
    FROM shopping_lists sl
    JOIN menus m
    JOIN menu_ingredient_links mil ON mil.id_menus = m.id_menus
    JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
    WHERE i.quantifiable = 1
    GROUP BY
      sl.id_shopping_lists,
      i.id_ingredients,
      i.id_units,
      i.stock_quantity
    HAVING
      SUM(COALESCE(mil.quantity, 0)) > COALESCE(i.stock_quantity, 0);
  `,
  );
}

export async function LoadShoppingListService() {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    await ResetShoppingListService(tx);
    await InsertShoppingListService(tx);
  });
}

async function FetchIngredientsListService(tx: SQLiteDatabase) {
  return tx.getAllAsync<ShoppingListIngredientsRaw>(`
    WITH last_list AS (
      SELECT
        id_shopping_lists
      FROM
        shopping_lists
      ORDER BY
        created_at DESC
      LIMIT
        1
    )
    SELECT
      *
    FROM
      (
        SELECT
          i.id_ingredients AS ingredient_id,
          sli.quantity_needed,
          sli.quantity_buyed,
          u.id_units AS unit_id,
          ic.id_ingredient_categories AS category_id
        FROM
          shopping_list_items sli
          JOIN ingredients i ON i.id_ingredients = sli.id_ingredients
          JOIN units u ON u.id_units = sli.id_units
          JOIN ingredient_categories ic ON ic.id_ingredient_categories = i.id_ingredient_categories
          JOIN last_list ll ON ll.id_shopping_lists = sli.id_shopping_lists
      );
  `);
}

async function FetchProductsListService(tx: SQLiteDatabase) {
  return tx.getAllAsync<ShoppingListProductsRaw>(`
    WITH last_list AS (
      SELECT
        id_shopping_lists
      FROM
        shopping_lists
      ORDER BY
        created_at DESC
      LIMIT
        1
    )
    SELECT
      *
    FROM
      (
        SELECT
          p.id_products AS product_id,
          sli.quantity_needed,
          sli.quantity_buyed
        FROM
          shopping_list_items sli
          JOIN products p ON p.id_products = sli.id_products
          JOIN last_list ll ON ll.id_shopping_lists = sli.id_shopping_lists
      );
  `);
}

export async function FetchShoppingListService() {
  const db = await getDb();
  let shoppingList: ShoppingListRaw | null = null;
  await db.withExclusiveTransactionAsync(async (tx) => {
    const ingredients = await FetchIngredientsListService(tx);
    const products = await FetchProductsListService(tx);
    shoppingList = {
      ingredients,
      products,
    };
  });

  if (!shoppingList) {
    throw new Error("Shopping list fetch failed");
  }

  return shoppingList as ShoppingListRaw;
}

async function AddIngredientService(
  newIngredientId: number,
  quantityNeeded: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    INSERT INTO
      shopping_list_items (
        id_shopping_lists,
        id_ingredients,
        quantity_needed,
        quantity_buyed,
        quantifiable,
        id_units
      )
    SELECT
      sl.id_shopping_lists,
      i.id_ingredients,
      ?,
      0,
      i.quantifiable,
      i.id_units
    FROM
      shopping_lists sl
      JOIN ingredients i ON i.id_ingredients = ?
    WHERE
      sl.id_shopping_lists = (
        SELECT
          id_shopping_lists
        FROM
          shopping_lists
        ORDER BY
          created_at DESC
        LIMIT
          1
      ) 
      ON CONFLICT(id_shopping_lists, id_ingredients)
      DO UPDATE SET
        quantity_needed = quantity_needed + 100;
  `,
    [toDbNumber(quantityNeeded), newIngredientId],
  );
}

async function AddProductService(
  newProductId: number,
  quantityNeeded: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    INSERT INTO
      shopping_list_items (
        id_shopping_lists,
        id_products,
        quantity_needed,
        quantity_buyed
      )
    SELECT
      sl.id_shopping_lists,
      p.id_products,
      ?,
      0
    FROM
      shopping_lists sl
      JOIN products p ON p.id_products = ?
    WHERE
      sl.id_shopping_lists = (
        SELECT
          id_shopping_lists
        FROM
          shopping_lists
        ORDER BY
          created_at DESC
        LIMIT
          1
      )
      ON CONFLICT(id_shopping_lists, id_products)
      DO UPDATE SET
        quantity_needed = quantity_needed + 100;
  `,
    [toDbNumber(quantityNeeded), newProductId],
  );
}

export async function AddItemToShoppingService(
  newItemId: number,
  quantityNeeded: number,
  type: "ingredients" | "products",
) {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    if (type === "ingredients")
      await AddIngredientService(newItemId, quantityNeeded, tx);
    else await AddProductService(newItemId, quantityNeeded, tx);
  });
}

async function RemoveIngredientService(ingredientId: number) {
  const db = await getDb();
  await db.runAsync(
    `
    DELETE FROM 
      shopping_list_items
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          ingredients i
        WHERE
          i.id_ingredients = shopping_list_items.id_ingredients
          AND i.id_ingredients = ?
      );
  `,
    [ingredientId],
  );
}

async function RemoveProductService(productId: number) {
  const db = await getDb();
  await db.runAsync(
    `
    DELETE FROM 
      shopping_list_items
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          products p
        WHERE
          p.id_products = shopping_list_items.id_products
          AND p.id_products = ?
      );
  `,
    [productId],
  );
}

export async function RemoveItemToShoppingService(
  itemId: number,
  type: "ingredients" | "products",
) {
  if (type === "ingredients") await RemoveIngredientService(itemId);
  else await RemoveProductService(itemId);
}
