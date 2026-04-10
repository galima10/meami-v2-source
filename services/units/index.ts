import { getDb } from "@database/database";
import type { Units, Unit } from "@stores/features/units";

export interface UnitRaw {
  id: number;
  name: string;
  abbreviation: string;
}

export async function UpdateUnitService(newUnit: Units) {
  const db = await getDb();
  const [unitIdStr] = Object.keys(newUnit);
  const unitId = Number(unitIdStr);
  const [values] = Object.values(newUnit) as [Unit];
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
      $newName: values.name,
      $newAbbreviation: values.abbreviation,
      $id: unitId,
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
  return { [id]: { ...newUnit } } as Units;
}

export async function FetchUnitsService() {
  const db = await getDb();
  return db.getAllAsync<UnitRaw>(`
    SELECT
      u.id_units AS id,
      u.name,
      u.abbreviation
    FROM units u;
  `);
}
