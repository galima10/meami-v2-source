import { getDb } from "@database/database";
import type {
  StorageDuration,
  StorageInfo,
} from "@stores/features/storageInfos";
import type { WithRequiredId } from "@app-types/NameId";

export interface StorageInfoRaw {
  storage_info_id: number;
  ingredient_id: number;
  storage_location_id: number;
  duration: number;
  units: number;
  type: number;
}

export async function FetchStorageInfosService() {
  const db = await getDb();
  return db.getAllAsync<StorageInfoRaw>(`
    SELECT
      si.id_storage_infos AS storage_info_id,
      i.id_ingredients AS ingredient_id,
      sl.id_storage_locations AS storage_location_id,
      si.duration,
      si.units,
      si.type
    FROM
      storage_infos si
      JOIN ingredients i ON i.id_ingredients = si.id_ingredients
      JOIN storage_locations sl ON sl.id_storage_locations = si.id_storage_locations
    ORDER BY
      i.id_ingredients,
      sl.id_storage_locations;
  `);
}

async function CreateStorageInfoService(
  duration: number | null,
  units: string,
  type: string,
  ingredientId: number,
  storageLocationId: number,
) {
  const db = await getDb();
  const result = await db.runAsync(
    `
    INSERT INTO storage_infos (
      duration,
      units,
      type,
      id_ingredients,
      id_storage_locations
    ) VALUES (?, ?, ?, ?, ?);
    `,
    [duration, units.toUpperCase(), type.toUpperCase(), ingredientId, storageLocationId],
  );

  return {
    id: result.lastInsertRowId,
    duration,
    units,
    type,
    ingredientId,
    storageLocationId,
  };
}

export async function RemoveStorageInfoService(ingredientId: number) {
  const db = await getDb();
  await db.runAsync(
    `
    DELETE FROM
      storage_infos
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          ingredients i
        WHERE
          i.id_ingredients = storage_infos.id_ingredients
          AND i.id_ingredients = ?
      );
    `,
    [ingredientId],
  );
}

export async function SetStorageInfoService(newStorageInfo: StorageInfo) {
  const db = await getDb();

  const storageInfoResult: WithRequiredId<StorageInfo> = {
    id: 0,
    ingredientId: newStorageInfo.ingredientId,
    storageLocations: [],
  };

  await db.withExclusiveTransactionAsync(async () => {
    await RemoveStorageInfoService(newStorageInfo.ingredientId);

    for (const [
      index,
      storageLocation,
    ] of newStorageInfo.storageLocations.entries()) {
      const storageDurationsResult: StorageDuration[] = [];

      for (const sd of storageLocation.storageDurations) {
        console.log(
          "INSERT storage_infos",
          sd.duration,
          sd.units,
          sd.type,
          newStorageInfo.ingredientId,
          storageLocation.id,
        );
        const createdDuration = await CreateStorageInfoService(
          sd.duration ?? null,
          sd.units,
          sd.type,
          newStorageInfo.ingredientId,
          storageLocation.id,
        );

        storageDurationsResult.push({
          type: sd.type,
          duration: sd.duration,
          units: sd.units,
        });

        if (index === 0 && storageInfoResult.id === 0) {
          storageInfoResult.id = createdDuration.id!;
        }
      }

      storageInfoResult.storageLocations.push({
        id: storageLocation.id,
        storageDurations: storageDurationsResult,
      });
    }
  });

  return storageInfoResult;
}
