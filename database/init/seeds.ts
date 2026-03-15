import * as SQLite from "expo-sqlite";


const seeds = [
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
