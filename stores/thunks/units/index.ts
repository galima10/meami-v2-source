import {
  setUnits,
  unitAdded,
  unitDeleted,
  unitUpdated,
  Unit,
} from "@stores/features/units";

export async function updateUnit(newUnit: Unit, actualUnitName: string) {
/*


UPDATE
  units
SET
  name = newUnit.name,
  abbreviation = newUnit.abbreviation
WHERE
  name = actualUnitName;


*/

// dispatch unitsSlice unitUpdated newUnit
}

export async function deleteUnit(unitId: number) {
/*


DELETE FROM
  units
WHERE
  id_units = unitId;


*/

// dispatch unitsSlice unitDeleted unitId
}

export async function createUnit(newUnit: Unit) {
/*


INSERT INTO
  units (name, abbreviation)
VALUES
  (newUnit.name, newUnit.abbreviation);


*/

// dispatch unitsSlice unitAdded newUnit
}

export async function fetchUnits() {
  /*


SELECT * FROM units;


*/
  // dispatch unitsSlice setUnits
}
