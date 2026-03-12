import { getDb } from "./database";

// Création des tables
export async function initDatabase() {
  const db = await getDb();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      user_id INTEGER
    );
  `);
}

export async function seedDatabase() {
  const db = await getDb();

  const users = await db.getAllAsync("SELECT * FROM users");
  if (users.length === 0) {
    await db.runAsync(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      ["Alice", "alice@example.com"]
    );
    await db.runAsync(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      ["Bob", "bob@example.com"]
    );
  }
}