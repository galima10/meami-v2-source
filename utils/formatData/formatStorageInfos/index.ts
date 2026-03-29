import type {
  StorageDuration,
  StorageInfo,
} from "@stores/features/storageInfos";
import type { StorageInfoRaw } from "@services/storageInfos";
import type { WithRequiredId } from "@app-types/NameId";

export function formatStorageInfos(
  rawData: StorageInfoRaw[],
): WithRequiredId<StorageInfo>[] {
  const treated = rawData.reduce(
    (acc, item) => {
      const key = item.ingredient_id;

      if (!acc[key]) {
        acc[key] = {
          storageInfoId: item.storage_info_id,
          ingredientId: item.ingredient_id,
          storageLocationsMap: {} as Record<
            number,
            { id: number; storageDurations: StorageDuration[] }
          >,
        };
      }

      const storageInfo = acc[key];

      if (!storageInfo.storageLocationsMap[item.storage_location_id]) {
        storageInfo.storageLocationsMap[item.storage_location_id] = {
          id: item.storage_location_id,
          storageDurations: [],
        };
      }

      storageInfo.storageLocationsMap[
        item.storage_location_id
      ].storageDurations.push({
        type: item.type,
        duration: item.duration ?? null,
        units: item.units,
      });

      return acc;
    },
    {} as Record<number, any>,
  );

  return Object.values(treated).map((si) => ({
    id: si.cookingInfoId,
    ingredientId: si.ingredientId,
    storageLocations: Object.values(si.storageLocationsMap),
  }));
}
