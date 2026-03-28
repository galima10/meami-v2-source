import { getDb } from "@database/database";
import type { Unit } from "@stores/features/units";
import type { WithRequiredId } from "@app-types/NameId";

export async function UpdateUnitService(newUnit: WithRequiredId<Unit>) {
  const db = await getDb();
  await db.runAsync(
    `
    UPDATE
      units
    SET
      name = $newName,
      abbreviation = $newAbbreviation
    WHERE
      name = $id;
  `,
    {
      $newName: newUnit.name,
      $newAbbreviation: newUnit.abbreviation,
      $id: newUnit.id,
    },
  );
}

export async function DeleteUnitService(unitId: number) {
  const db = await getDb();
  await db.runAsync(
    `
    DELETE FROM
      units
    WHERE
      id_units = ?;
  `,
    [unitId],
  );
}

export async function CreateUnitService(newUnit: Unit) {
  const db = await getDb();
  const result = await db.runAsync(
    `
    INSERT INTO
      units (name, abbreviation)
    VALUES
      (?, ?);  
  `,
    [newUnit.name, newUnit.abbreviation],
  );
  const id = result.lastInsertRowId;
  return { id, ...newUnit };
}

export async function FetchUnitsService() {
  const db = await getDb();
  return db.getAllAsync<WithRequiredId<Unit>>(`
    SELECT
      u.id_units AS id,
      u.name,
      u.abbreviation
    FROM units u;
  `);
}
