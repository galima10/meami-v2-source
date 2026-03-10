import {
  setStorageInfos,
  storageInfoDeleted,
  storageInfoSetted,
  StorageInfo,
} from "@stores/features/storageInfos";

async function setStorageInfo(newStorageInfo: StorageInfo) {
/*


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
      AND i.id_ingredients = newStorageInfo.id
  );



=> Boucler sur newStorageInfo.storageLocations avec ObjectKeys

INSERT INTO
  storage_infos (
    duration,
    units,
    type,
    id_ingredients,
    id_storage_locations
  )
SELECT
  storageLocation.duration,
  storageLocation.unit.toUpperCase(),
  storageLocation.type.toUpperCase(),
  i.id_ingredients,
  sl.id_storage_locations
FROM
  ingredients i
  CROSS JOIN storage_locations sl
WHERE
  i.id_ingredients = newStorageInfo.id
  AND sl.name = storageLocation.key;


*/
// dispatch storageInfosSlice storageInfoSetted newStorageInfo
}

async function removeStorageInfo(ingredientId: string) {
/*


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
      AND i.id_ingredients = newStorageInfo.id
  );


*/
// dispatch storageInfosSlice storageInfoDeleted ingredientId
}

async function fetchStorageInfos() {
  /*


SELECT
  i.id_ingredients AS ingredient_id,
  i.name AS ingredient_name,
  sl.name AS storage_location,
  si.id_storage_infos AS storage_info_id,
  si.duration,
  si.units,
  si.type
FROM
  storage_infos si
  JOIN ingredients i ON i.id_ingredients = si.id_ingredients
  JOIN storage_locations sl ON sl.id_storage_locations = si.id_storage_locations
ORDER BY
  i.name,
  sl.name,
  si.type DESC;


*/
// disptach storageInfosSlice setStorageInfos
}
