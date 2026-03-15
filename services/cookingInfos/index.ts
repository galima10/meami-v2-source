import { getDb } from "@database/database";

export async function dbRemoveCookingInfo() {}

export async function dbSetCookingInfo() {
  const db = await getDb();
  return db.runAsync("");
}

export async function dbFetchCookingInfos() {}
