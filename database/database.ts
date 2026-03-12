import * as SQLite from "expo-sqlite";
import { initDatabase, seedDatabase } from "./init";

let db: SQLite.SQLiteDatabase | null = null;

export async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("meami.db");

    await db.execAsync("PRAGMA journal_mode = WAL");
    await db.execAsync("PRAGMA foreign_keys = ON");

    await initDatabase(db);
    await seedDatabase(db);
  }
  return db;
}
