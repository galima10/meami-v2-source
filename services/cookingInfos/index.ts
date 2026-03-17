import { getDb } from "@database/database";
import type { CookingInfo } from "@stores/features/cookingInfos";

export interface CookingInfoRawType {
  cooking_info_id: number;
  ingredient_id: number;
  ingredient_name: string;
  preparation_type: string;
  duration: number;
  temperature: number;
  ustensil_name: string;
}

export async function fetchCookingInfosService() {
  const db = await getDb();
  return db.getAllAsync<CookingInfoRawType>(`
    SELECT
      ci.id_cooking_infos AS cooking_info_id,
      i.id_ingredients AS ingredient_id,
      i.name AS ingredient_name,
      ci.preparation_type,
      cd.duration_in_minutes AS duration,
      cd.temperature,
      cu.name AS ustensil_name
    FROM
      ingredients i
      JOIN cooking_infos ci ON ci.id_ingredients = i.id_ingredients
      JOIN cooking_durations cd ON cd.id_cooking_infos = ci.id_cooking_infos
      JOIN cooking_ustensils cu ON cu.id_cooking_ustensils = cd.id_cooking_ustensils
    ORDER BY
      i.name,
      ci.preparation_type,
      cu.name;
  `);
}

export async function removeCookingInfoService(ingredientId: number) {
  const db = await getDb();
  return db.runAsync(
    `
    DELETE FROM
      cooking_infos
    WHERE
      EXISTS (
        SELECT
          1
        FROM
          ingredients i
        WHERE
          i.id_ingredients = cooking_infos.id_ingredients
          AND i.id_ingredients = ?
      );
    `,
    [ingredientId],
  );
}

async function insertCookingInfoService(
  preparationTypeName: string,
  ingredientId: number,
) {
  const db = await getDb();
  return db.runAsync(
    `
    INSERT INTO
      cooking_infos (preparation_type, id_ingredients)
    SELECT
      ?,
      i.id_ingredients
    FROM
      ingredients i
    WHERE
      i.id_ingredients = ?;
    `,
    [preparationTypeName, ingredientId],
  );
}

async function insertCookingDurationService(
  duration: number | null,
  temperature: number | null,
  preparationTypeName: string,
  ustensilName: string,
  ingredientId: number,
) {
  const db = await getDb();
  return db.runAsync(
    `
    INSERT INTO
      cooking_durations (
        duration_in_minutes,
        temperature,
        id_cooking_ustensils,
        id_cooking_infos
      )
    SELECT
      ?,
      ?,
      cu.id_cooking_ustensils,
      ci.id_cooking_infos
    FROM
      cooking_ustensils cu
      JOIN cooking_infos ci ON ci.preparation_type = ?
      JOIN ingredients i ON i.id_ingredients = ci.id_ingredients
    WHERE
      cu.name = ?
      AND i.id_ingredients = ?;
    `,
    [duration, temperature, preparationTypeName, ustensilName, ingredientId],
  );
}

export async function setCookingInfoService(newCookingInfo: CookingInfo) {
  const db = await getDb();
  await db.withExclusiveTransactionAsync(async () => {
    await removeCookingInfoService(newCookingInfo.ingredientId);
    for (const cookingType of newCookingInfo.preparationTypes) {
      await insertCookingInfoService(
        cookingType.name,
        newCookingInfo.ingredientId,
      );

      for (const cookingDuration of cookingType.cookingDurations) {
        await insertCookingDurationService(
          cookingDuration.duration,
          cookingDuration.temperature,
          cookingType.name,
          cookingDuration.ustensilName,
          newCookingInfo.ingredientId,
        );
      }
    }
  });
}


