import { getDb } from "@database/database";
import { toDbNumberOrNull } from "@helpers/dbHelpers";
import { getDbContext } from "@helpers/getDbContext";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import type { SQLiteDatabase } from "expo-sqlite";

export interface WeeklyMenuRaw {
  menu_id: number;
  menu_category_id: number;
  ingredient_id: number;
  quantity: number | null;
  unit_id: number | null;
}

export interface MenuRaw {
  menu_id: number;
  day_id: number;
  moment_id: number;
  done: number;
}

export async function FetchAllMenusService() {
  const db = await getDb();
  return db.getAllAsync<MenuRaw>(`
    SELECT
      m.id_menus AS menu_id,
      d.id_days AS day_id,
      mo.id_moments AS moment_id,
      m.done
    FROM
      menus m
      JOIN days d ON d.id_days = m.id_days
      JOIN moments mo ON mo.id_moments = m.id_moments;
  `);
}

export async function FetchWeeklyMenuService() {
  const db = await getDb();
  return db.getAllAsync<WeeklyMenuRaw>(`
    SELECT
      m.id_menus AS menu_id,
      mc.id_menu_categories AS menu_category_id,
      i.id_ingredients AS ingredient_id,
      mil.quantity,
      u.id_units AS unit_id
    FROM
      menus m
      JOIN menu_ingredient_links mil ON mil.id_menus = m.id_menus
      JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
      JOIN ingredient_menu_category_links imcl ON imcl.id_ingredients = i.id_ingredients
      JOIN menu_categories mc ON mc.id_menu_categories = imcl.id_menu_categories
      JOIN menu_category_moments_links mcml ON mcml.id_menu_categories = mc.id_menu_categories
      AND mcml.id_moments = m.id_moments
      LEFT JOIN units u ON u.id_units = mil.id_units
    ORDER BY
      m.id_menus,
      mc.id_menu_categories;
  `);
}

export async function RemoveIngredientToMenuService(
  ingredientId: number,
  menuId: number,
  tx?: SQLiteDatabase,
) {
  const db = await getDbContext(tx);
  await db.runAsync(
    `
    DELETE FROM menu_ingredient_links
    WHERE id_menus = ?
      AND id_ingredients = ?;
  `,
    [menuId, ingredientId],
  );
}

async function InsertIngredientToMenuService(
  newIngredient: IngredientMenu,
  menuId: number,
  tx: SQLiteDatabase,
) {
  await tx.runAsync(
    `
    INSERT INTO menu_ingredient_links (id_menus, id_ingredients, quantity, id_units)
    SELECT ?, ?, ?, ?
    WHERE NOT EXISTS (
      SELECT 1
      FROM menu_ingredient_links
      WHERE id_menus = ?
        AND id_ingredients = ?
    );
  `,
    [
      menuId,
      newIngredient.ingredientId,
      toDbNumberOrNull(newIngredient.quantity),
      newIngredient.unitId,
      menuId,
      newIngredient.ingredientId,
    ],
  );
}

export async function AddIngredientToMenuService(
  newIngredient: IngredientMenu,
  menuId: number,
) {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    await RemoveIngredientToMenuService(newIngredient.ingredientId, menuId, tx);
    await InsertIngredientToMenuService(newIngredient, menuId, tx);
  });
}

async function ResetMenuService(menuId: number, tx: SQLiteDatabase) {
  await tx.runAsync(
    `
    DELETE FROM
      menu_ingredient_links
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          menus m
        WHERE
          m.id_menus = menu_ingredient_links.id_menus
          AND m.id_menus = ?
      );
  `,
    [menuId],
  );
}

export async function RemoveMenuService(menuId: number) {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    await ResetMenuService(menuId, tx);
    await SetMenuDoneService(menuId, false, tx);
  });
}

async function RemoveAllMenuService(tx: SQLiteDatabase) {
  await tx.runAsync(
    `
    DELETE FROM
      menu_ingredient_links;
  `,
  );
}

async function SetAllMenuUnDone(tx: SQLiteDatabase) {
  await tx.runAsync(
    `
    UPDATE
      menus
    SET
      done = 0;
  `,
  );
}

export async function RemoveWeeklyMenuService() {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async (tx) => {
    await RemoveAllMenuService(tx);
    await SetAllMenuUnDone(tx);
  });
}

export async function SetMenuDoneService(
  menuId: number,
  done: boolean,
  tx?: SQLiteDatabase,
) {
  const db = await getDbContext(tx);
  await db.runAsync(
    `
    UPDATE
      menus
    SET
      done = $done
    WHERE
      id_menus = $menuId;
  `,
    {
      $done: done ? 1 : 0,
      $menuId: menuId,
    },
  );
}

export async function AddRecipeToMenuService(recipeId: number, menuId: number) {
  const db = await getDb();
  await db.runAsync(
    `
    INSERT INTO
      menu_ingredient_links (id_menus, id_ingredients, quantity, id_units)
    SELECT
      m.id_menus,
      i.id_ingredients,
      MAX(COALESCE(ril.quantity, 1), 1),
      ril.id_units
    FROM
      menus m
      JOIN recipes r ON r.id_recipes = ?
      JOIN recipe_ingredient_links ril ON ril.id_recipes = r.id_recipes
      JOIN ingredients i ON i.id_ingredients = ril.id_ingredients
    WHERE
      m.id_menus = ?
      AND NOT EXISTS (
        SELECT
          1
        FROM
          menu_ingredient_links mil
        WHERE
          mil.id_menus = m.id_menus
          AND mil.id_ingredients = i.id_ingredients
      );
  `,
    [recipeId, menuId],
  );
}
