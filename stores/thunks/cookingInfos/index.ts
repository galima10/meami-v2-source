import {
  setCookingInfos,
  cookingInfoSetted,
  cookingInfoDeleted,
  CookingInfo,
} from "@stores/features/cookingInfos";

async function removeCookingInfo(ingredientId: string) {
/*


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
      AND i.id_ingredients = newCookingInfo.id
  );


*/
// dispatch cookingInfosSlice cookingInfoDeleted ingredientId
}

async function setCookingInfo(newCookingInfo: CookingInfo) {
  /*


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
      AND i.id_ingredients = newCookingInfo.id
  );


=> Boucler sur newCookingInfo.preparationTypes avec un ObjectKeys

INSERT INTO
  cooking_infos (preparation_type, id_ingredients)
SELECT
  preparationType.key,
  i.id_ingredients
FROM
  ingredients i
WHERE
  i.id_ingredients = newCookingInfo.id;


  
INSERT INTO
  cooking_durations (
    duration_in_minutes,
    temperature,
    id_cooking_ustensils,
    id_cooking_infos
  )
SELECT
  preparationType.duration,
  preparationType.temperature,
  cu.id_cooking_ustensils,
  ci.id_cooking_infos
FROM
  cooking_ustensils cu
  JOIN cooking_infos ci ON ci.preparation_type = preparationType.key
  JOIN ingredients i ON i.id_ingredients = ci.id_ingredients
WHERE
  cu.name = preparationType.ustensilName
  AND i.id_ingredients = newCookingInfo.id;


*/
  // dispatch cookingInfosSlice cookingInfoSetted newCookingInfo
}

async function fetchCookingInfos() {
  /*


SELECT
  i.id_ingredients AS ingredient_id,
  i.name,
  ci.preparation_type,
  cd.id_cooking_durations AS cooking_duration_id,
  cd.duration_in_minutes,
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


*/
  // dispatch cookingInfosSlice setCookingInfos
}
