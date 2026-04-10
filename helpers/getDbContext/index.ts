import { getDb } from "@database/database";
import type { SQLiteDatabase } from "expo-sqlite";

export async function getDbContext(tx?: SQLiteDatabase) {
  return tx ?? (await getDb());
}
