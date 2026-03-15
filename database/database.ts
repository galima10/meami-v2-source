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
