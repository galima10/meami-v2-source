import * as SQLite from "expo-sqlite";

export async function initDatabase(db: SQLite.SQLiteDatabase) {
  await db.withExclusiveTransactionAsync(async () => {
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
  });
}

interface Seeds {
  name: string;
  email: string;
}

const seeds: Seeds[] = [
  {
    name: "",
    email: "",
  },
];

export async function seedDatabase(db: SQLite.SQLiteDatabase) {
  // Une table = une transaction
  const users = await db.getAllAsync("SELECT * FROM users");
  if (users.length === 0) {
    await db.withExclusiveTransactionAsync(async () => {
      const stmt = await db.prepareAsync(
        "INSERT INTO users (name, email) VALUES (?, ?)",
      );
      try {
        for (const u of seeds) {
          await stmt.executeAsync([u.name, u.email]);
        }
      } finally {
        await stmt.finalizeAsync();
      }
    });
  }
}
