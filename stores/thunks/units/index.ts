import {
  setUnits,
  unitAdded,
  unitDeleted,
  unitUpdated,
  Unit,
} from "@stores/features/units";

async function updateUnit(newUnit: Unit, actualUnitName: string) {
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

async function deleteUnit(unitId: string) {
/*


DELETE FROM
  units
WHERE
  id_units = unitId;


*/

// dispatch unitsSlice unitDeleted unitId
}

async function createUnit(newUnit: Unit) {
/*


INSERT INTO
  units (name, abbreviation)
VALUES
  (newUnit.name, newUnit.abbreviation);


*/

// dispatch unitsSlice unitAdded newUnit
}

async function fetchUnits() {
  /*


SELECT * FROM units;


*/
  // dispatch unitsSlice setUnits
}
