import type { WithRequiredId } from "@app-types/NameId";
import { SeedRow } from "@stores/features/seeds";
import { getDb } from "@database/database";

export interface SeedRowRaw {
  id: number;
  name: string;
}

export async function FetchStorageLocationsService() {
  const db = await getDb();
  return db.getAllAsync<SeedRowRaw>(`
      SELECT
        sl.id_storage_locations AS id,
        sl.name
      FROM storage_locations sl;
    `);
}

export async function FetchMenuCategoriesService() {
  const db = await getDb();
  return db.getAllAsync<SeedRowRaw>(`
      SELECT
        mc.id_menu_categories AS id,
        mc.name
      FROM menu_categories mc;
    `);
}

export async function FetchDaysService() {
  const db = await getDb();
  return db.getAllAsync<SeedRowRaw>(`
      SELECT
        d.id_days AS id,
        d.name
      FROM days d;
    `);
}

export async function FetchMomentsService() {
  const db = await getDb();
  return db.getAllAsync<SeedRowRaw>(`
      SELECT
        m.id_moments AS id,
        m.name
      FROM moments m;
    `);
}
