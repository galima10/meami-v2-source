import type { WithRequiredId } from "@app-types/WithRequiredId";
import { getDb } from "@database/database";
import { toDbNumberOrNull } from "@helpers/dbHelpers";
import { getDbContext } from "@helpers/getDbContext";
import type {
    CookingDuration,
    CookingInfo,
} from "@stores/features/cookingInfos";
import type { SQLiteDatabase } from "expo-sqlite";

export interface CookingInfoRaw {
  cooking_info_id: number;
  ingredient_id: number;
  preparation_type: string;
  cooking_duration_id: number;
  duration: number | null;
  temperature: number | null;
  ustensil_id: number;
}

export async function FetchCookingInfosService() {
  const db = await getDb();
  return db.getAllAsync<CookingInfoRaw>(`
    SELECT
      ci.id_cooking_infos AS cooking_info_id,
      i.id_ingredients AS ingredient_id,
      ci.preparation_type,
      cd.id_cooking_durations AS cooking_duration_id,
      cd.duration_in_minutes AS duration,
      cd.temperature,
      cu.id_cooking_ustensils AS ustensil_id
    FROM
      ingredients i
      JOIN cooking_infos ci ON ci.id_ingredients = i.id_ingredients
      JOIN cooking_durations cd ON cd.id_cooking_infos = ci.id_cooking_infos
      JOIN cooking_ustensils cu ON cu.id_cooking_ustensils = cd.id_cooking_ustensils
    ORDER BY
      i.id_ingredients,
      ci.preparation_type,
      cu.id_cooking_ustensils;
  `);
}

export async function RemoveCookingInfoService(
  ingredientId: number,
  tx?: SQLiteDatabase,
) {
  const db = await getDbContext(tx);
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

async function CreateCookingInfoService(
  preparationTypeName: string,
  ingredientId: number,
) {
  const db = await getDb();
  const result = await db.runAsync(
    `
    INSERT INTO cooking_infos (preparation_type, id_ingredients)
    VALUES (?, ?)
    `,
    [preparationTypeName, ingredientId],
  );

  return {
    id: result.lastInsertRowId,
    ingredientId,
  };
}

async function CreateCookingDurationService(
  duration: number | null,
  temperature: number | null,
  ustensilId: number,
  cookingInfoId: number,
  tx: SQLiteDatabase,
) {
  const result = await tx.runAsync(
    `
    INSERT INTO cooking_durations (
      duration_in_minutes,
      temperature,
      id_cooking_ustensils,
      id_cooking_infos
    ) VALUES (?, ?, ?, ?)
    `,
    [
      toDbNumberOrNull(duration),
      toDbNumberOrNull(temperature),
      ustensilId,
      cookingInfoId,
    ],
  );

  return {
    id: result.lastInsertRowId,
    ustensilId,
    duration,
    temperature,
  };
}

export async function SetCookingInfoService(newCookingInfo: CookingInfo) {
  const db = await getDb();

  const cookingInfoResult: WithRequiredId<CookingInfo> = {
    id: 0,
    ingredientId: newCookingInfo.ingredientId,
    preparationTypes: [],
  };

  await db.withExclusiveTransactionAsync(async (tx) => {
    await RemoveCookingInfoService(newCookingInfo.ingredientId, tx);

    for (const [
      index,
      cookingType,
    ] of newCookingInfo.preparationTypes.entries()) {
      const createdCookingInfo = await CreateCookingInfoService(
        cookingType.name,
        newCookingInfo.ingredientId,
      );

      if (index === 0) {
        cookingInfoResult.id = createdCookingInfo.id!;
      }

      const preparationTypeResult = {
        name: cookingType.name,
        cookingDurations: [] as CookingDuration[],
      };

      for (const cookingDuration of cookingType.cookingDurations) {
        const createdDuration = await CreateCookingDurationService(
          cookingDuration.duration,
          cookingDuration.temperature,
          cookingDuration.ustensilId,
          createdCookingInfo.id,
          tx,
        );

        preparationTypeResult.cookingDurations.push({
          id: createdDuration.id,
          ustensilId: createdDuration.ustensilId,
          duration: createdDuration.duration,
          temperature: createdDuration.temperature,
        });
      }

      cookingInfoResult.preparationTypes.push(preparationTypeResult);
    }
  });

  return cookingInfoResult;
}
