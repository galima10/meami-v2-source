import * as SQLite from "expo-sqlite";
import {
  momentsSeeds,
  daysSeeds,
  menuCategoriesSeeds,
  storageLocationsSeeds,
} from "@constants/database/seeds";

export async function seedDatabase(db: SQLite.SQLiteDatabase) {
  // Seeds pour les moments de la journée
  const moments = await db.getAllAsync("SELECT * FROM moments");
  if (moments.length === 0) {
    await db.withExclusiveTransactionAsync(async () => {
      const stmt = await db.prepareAsync(
        "INSERT INTO moments (name) VALUES (?)",
      );
      try {
        for (const m of momentsSeeds) {
          await stmt.executeAsync([m.name]);
        }
      } finally {
        await stmt.finalizeAsync();
      }
    });
  }

  // Seeds pour les jours de la semaine
  const days = await db.getAllAsync("SELECT * FROM days");
  if (days.length === 0) {
    await db.withExclusiveTransactionAsync(async () => {
      const stmt = await db.prepareAsync("INSERT INTO days (name) VALUES (?)");
      try {
        for (const d of daysSeeds) {
          await stmt.executeAsync([d.name]);
        }
      } finally {
        await stmt.finalizeAsync();
      }
    });
  }

  // Seeds pour associer les menus aux moments de la journée et aux jours de la semaines
  const menus = await db.getAllAsync("SELECT * FROM menus");
  if (menus.length === 0) {
    await db.withExclusiveTransactionAsync(async () => {
      await db.runAsync(`
        INSERT INTO menus (done, id_moments, id_days)
        SELECT
          0,
          m.id_moments,
          d.id_days
        FROM
          days d
          CROSS JOIN moments m
        ORDER BY
          d.id_days,
          m.id_moments;
      `);
    });
  }

  // Seeds pour les catégories du menu
  const menuCategories = await db.getAllAsync("SELECT * FROM menu_categories");
  if (menuCategories.length === 0) {
    await db.withExclusiveTransactionAsync(async () => {
      const stmt = await db.prepareAsync(
        "INSERT INTO menu_categories (name) VALUES (?)",
      );
      try {
        for (const mc of menuCategoriesSeeds) {
          await stmt.executeAsync([mc.name]);
        }
      } finally {
        await stmt.finalizeAsync();
      }
    });
  }

  // Seeds pour associer quelle catégorie du menu à quel moment de la journée
  const menuCategoryMomentLinks = await db.getAllAsync(
    "SELECT * FROM menu_category_moments_links",
  );
  if (menuCategoryMomentLinks.length === 0) {
    await db.withExclusiveTransactionAsync(async () => {
      await db.runAsync(`
        INSERT INTO
          menu_category_moments_links (id_menu_categories, id_moments)
        SELECT
          mc.id_menu_categories,
          mo.id_moments
        FROM
          menu_categories mc
          JOIN moments mo
        WHERE
          (
            mc.name = 'BOISSON CHAUDE'
            AND mo.name = 'MATIN'
          )
          OR (
            mc.name = 'ACCOMPAGNEMENT MATIN'
            AND mo.name = 'MATIN'
          )
          OR (
            mc.name = 'FRUIT'
            AND mo.name = 'MATIN'
          )
          OR (
            mc.name = 'PROTÉINES'
            AND mo.name IN ('MIDI', 'SOIR')
          )
          OR (
            mc.name = 'LÉGUMES'
            AND mo.name IN ('MIDI', 'SOIR')
          )
          OR (
            mc.name = 'ACCOMPAGNEMENT REPAS'
            AND mo.name IN ('MIDI', 'SOIR')
          )
          OR (
            mc.name = 'DESSERT'
            AND mo.name IN ('MIDI', 'SOIR')
          )
          OR (
            mc.name = 'AUTRE'
            AND mo.name IN ('MIDI', 'SOIR')
          );
      `);
    });
  }

  // Seeds pour ajouter des lieux de stockage
  const storageLocations = await db.getAllAsync(
    "SELECT * FROM storage_locations",
  );
  if (storageLocations.length === 0) {
    await db.withExclusiveTransactionAsync(async () => {
      const stmt = await db.prepareAsync(
        "INSERT INTO storage_locations (name) VALUES (?)",
      );
      try {
        for (const sl of storageLocationsSeeds) {
          await stmt.executeAsync([sl.name]);
        }
      } finally {
        await stmt.finalizeAsync();
      }
    });
  }
}
