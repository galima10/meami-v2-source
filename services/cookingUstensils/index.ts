import { getDb } from "@database/database";
import type {
  CookingUstensil,
  CookingUstensils,
} from "@stores/features/cookingUstensils";

export interface CookingUstensilRaw {
  cooking_ustensil_id: number;
  cooking_ustensil_name: string;
}

export async function FetchCookingUstensilsService() {
  const db = await getDb();
  return db.getAllAsync<CookingUstensilRaw>(`
    SELECT
      cu.id_cooking_ustensils AS cooking_ustensil_id,
      cu.name AS cooking_ustensil_name
    FROM
      cooking_ustensils cu;
  `);
}

export async function CreateUstensilService(
  newCookingUstensil: CookingUstensil,
) {
  const db = await getDb();
  const result = await db.runAsync(
    `
    INSERT INTO
      cooking_ustensils (name)
    VALUES
      (?);
  `,
    [newCookingUstensil.name],
  );
  const id = result.lastInsertRowId;
  return { [id]: { ...newCookingUstensil } } as CookingUstensils;
}

export async function DeleteUstensilService(cookingUstensilId: number) {
  const db = await getDb();
  await db.runAsync(
    `
    DELETE FROM
      cooking_ustensils
    WHERE
      id_cooking_ustensils = ?;
  `,
    [cookingUstensilId],
  );
}
