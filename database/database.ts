import * as SQLite from "expo-sqlite";
import { schemaDatabase } from "./init/schema";
import { seedDatabase } from "./init/seeds";

let db: SQLite.SQLiteDatabase | null = null;

export async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("meami.db");

    await db.execAsync("PRAGMA journal_mode = WAL");
    await db.execAsync("PRAGMA foreign_keys = ON");

    await schemaDatabase(db);
    await seedDatabase(db);
  }
  return db;
}

export async function resetDb() {
  if (!db) return;
  await db.execAsync("DROP TABLE IF EXISTS ingredient_menu_category_links");
  await db.execAsync("DROP TABLE IF EXISTS menu_category_moments_links");
  await db.execAsync("DROP TABLE IF EXISTS recipe_category_links");
  await db.execAsync("DROP TABLE IF EXISTS recipe_ingredient_links");
  await db.execAsync("DROP TABLE IF EXISTS menu_ingredient_links");
  await db.execAsync("DROP TABLE IF EXISTS ingredient_storage_location_links");
  await db.execAsync("DROP TABLE IF EXISTS shopping_list_manual_checks");
  await db.execAsync("DROP TABLE IF EXISTS shopping_list_items");
  await db.execAsync("DROP TABLE IF EXISTS menu_ingredient_manual_checks");
  await db.execAsync("DROP TABLE IF EXISTS storage_infos");
  await db.execAsync("DROP TABLE IF EXISTS cooking_durations");
  await db.execAsync("DROP TABLE IF EXISTS cooking_infos");
  await db.execAsync("DROP TABLE IF EXISTS menus");
  await db.execAsync("DROP TABLE IF EXISTS ingredients");
  await db.execAsync("DROP TABLE IF EXISTS menu_categories");
  await db.execAsync("DROP TABLE IF EXISTS units");
  await db.execAsync("DROP TABLE IF EXISTS moments");
  await db.execAsync("DROP TABLE IF EXISTS days");
  await db.execAsync("DROP TABLE IF EXISTS ingredient_categories");
  await db.execAsync("DROP TABLE IF EXISTS recipe_categories");
  await db.execAsync("DROP TABLE IF EXISTS shopping_lists");
  await db.execAsync("DROP TABLE IF EXISTS storage_locations");
  await db.execAsync("DROP TABLE IF EXISTS cooking_ustensils");
  await db.execAsync("DROP TABLE IF EXISTS recipes");
  await db.execAsync("DROP TABLE IF EXISTS products");
  await schemaDatabase(db);
  await seedDatabase(db);
}
