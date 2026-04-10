import { getDb } from "@database/database";
import type { SQLiteDatabase } from "expo-sqlite";

async function ResetShoppingListService(tx: SQLiteDatabase) {
  await tx.execAsync(`
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
      SUM(mil.quantity) - COALESCE(i.stock_quantity, 0) AS quantity_needed,
      0 AS quantity_buyed,
      i.quantifiable,
      i.id_units
    FROM
      shopping_lists sl
      CROSS JOIN menus m
      JOIN menu_ingredient_links mil ON mil.id_menus = m.id_menus
      JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
    WHERE
      i.quantifiable = 1
      AND NOT EXISTS (
        SELECT
          1
        FROM
          shopping_list_items sli
        WHERE
          sli.id_shopping_lists = sl.id_shopping_lists
          AND sli.id_ingredients = i.id_ingredients
      )
    GROUP BY
      sl.id_shopping_lists,
      i.id_ingredients,
      i.quantifiable,
      i.id_units,
      i.stock_quantity
    HAVING
      SUM(mil.quantity) > COALESCE(i.stock_quantity, 0);
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

export async function AddItemToShoppingService() {}

export async function RemoveItemToShoppingService() {}

export async function SetShoppingListItemQuantityService() {}
