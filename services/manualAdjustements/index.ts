import { QUANTITY_SCALE } from "@constants/general";
import { getDb } from "@database/database";
import { getDbContext } from "@helpers/getDbContext";
import type { SQLiteDatabase } from "expo-sqlite";

export interface ManualAdjustementItemRaw {
  ingredient_id: number;
  usage_count: number;
  checked: number;
}

async function InsertShoppingManualChecksService(tx: SQLiteDatabase) {
  await tx.runAsync(
    `
    INSERT INTO
      shopping_list_manual_checks (
        id_shopping_lists,
        id_ingredients,
        usage_count
      )
    SELECT
      sl.id_shopping_lists,
      i.id_ingredients,
      COUNT(mil.id_ingredients) * ? AS usage_count
    FROM
      shopping_lists sl
      CROSS JOIN menus m
      JOIN menu_ingredient_links mil ON mil.id_menus = m.id_menus
      JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
      JOIN units u ON u.id_units = i.id_units
    WHERE
      i.quantifiable = 0
      AND u.name <> "Infini"
      AND NOT EXISTS (
        SELECT
          1
        FROM
          shopping_list_manual_checks slmc
        WHERE
          slmc.id_shopping_lists = sl.id_shopping_lists
          AND slmc.id_ingredients = i.id_ingredients
      )
    GROUP BY
      sl.id_shopping_lists,
      i.id_ingredients;
  `,
    [QUANTITY_SCALE],
  );
}

export async function ResetShoppingManualChecksService(tx?: SQLiteDatabase) {
  const db = await getDbContext(tx);
  await db.runAsync(
    `
    DELETE FROM
      shopping_list_manual_checks;
    `,
  );
}

export async function LoadShoppingManualChecksService() {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    await ResetShoppingManualChecksService(tx);
    await InsertShoppingManualChecksService(tx);
  });
}

export async function ResetStockManualChecksService(tx?: SQLiteDatabase) {
  const db = await getDbContext(tx);
  await db.runAsync(
    `
    DELETE FROM
      menu_ingredient_manual_checks;
    `,
  );
}

async function InsertStockManualChecksService(tx: SQLiteDatabase) {
  await tx.runAsync(
    `
    INSERT INTO
      menu_ingredient_manual_checks (id_ingredients, usage_count)
    SELECT
      i.id_ingredients,
      COUNT(mil.id_menus) * ? AS usage_count
    FROM
      ingredients i
      JOIN menu_ingredient_links mil ON mil.id_ingredients = i.id_ingredients
      JOIN units u ON u.id_units = i.id_units
    WHERE
      i.quantifiable = 0
      AND u.name <> "Infini"
    GROUP BY
      i.id_ingredients;
  `,
    [QUANTITY_SCALE],
  );
}

export async function LoadStockManualChecksService() {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    await ResetStockManualChecksService(tx);
    await InsertStockManualChecksService(tx);
  });
}

export async function SetIngredientShoppingCheckService(
  ingredientId: number,
  checked: boolean,
) {
  const db = await getDb();
  await db.runAsync(
    `
    UPDATE
      shopping_list_manual_checks
    SET
      checked = $checked
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          ingredients i
        JOIN units u ON u.id_units = i.id_units
        WHERE
          i.id_ingredients = shopping_list_manual_checks.id_ingredients
          AND i.id_ingredients = $ingredientId
      );
    `,
    { $checked: checked ? 1 : 0, $ingredientId: ingredientId },
  );
}

export async function SetIngredientStockCheckService(
  ingredientId: number,
  checked: boolean,
) {
  const db = await getDb();
  await db.runAsync(
    `
    UPDATE
      menu_ingredient_manual_checks
    SET
      checked = $checked
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          ingredients i
        JOIN units u ON u.id_units = i.id_units
        WHERE
          i.id_ingredients = menu_ingredient_manual_checks.id_ingredients
          AND i.id_ingredients = $ingredientId
      );
    `,
    { $checked: checked ? 1 : 0, $ingredientId: ingredientId },
  );
}

export async function FetchShoppingManualChecksService() {
  const db = await getDb();
  return db.getAllAsync<ManualAdjustementItemRaw>(`
    SELECT
      i.id_ingredients AS ingredient_id,
      slmc.usage_count,
      slmc.checked
    FROM
      shopping_list_manual_checks slmc
      JOIN ingredients i ON i.id_ingredients = slmc.id_ingredients;
  `);
}

export async function FetchStockManualChecksService() {
  const db = await getDb();
  return db.getAllAsync<ManualAdjustementItemRaw>(`
    SELECT
      i.id_ingredients AS ingredient_id,
      mimc.usage_count,
      mimc.checked
    FROM
      menu_ingredient_manual_checks mimc
      JOIN ingredients i ON i.id_ingredients = mimc.id_ingredients; 
  `);
}
