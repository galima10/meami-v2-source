import { getDb } from "@database/database";

export async function FetchStorageLocationsService() {
  const db = await getDb();
  return db.getAllAsync<{ id: number; name: string}>(`
      SELECT
        sl.id_storage_locations AS id,
        sl.name
      FROM storage_locations sl;
    `);
}

export async function FetchMenuCategoriesService() {
  const db = await getDb();
  return db.getAllAsync<{ id: number; name: string}>(`
      SELECT
        mc.id_menu_categories AS id,
        mc.name
      FROM menu_categories mc;
    `);
}

export async function FetchDaysService() {
  const db = await getDb();
  return db.getAllAsync<{ id: number; name: string}>(`
      SELECT
        d.id_days AS id,
        d.name
      FROM days d;
    `);
}

export async function FetchMomentsService() {
  const db = await getDb();
  return db.getAllAsync<{ id: number; name: string}>(`
      SELECT
        m.id_moments AS id,
        m.name
      FROM moments m;
    `);
}