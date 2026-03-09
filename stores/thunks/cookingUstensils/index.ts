import {
  setCookingUstensils,
  cookingUstensilAdded,
  cookingUstensilDeleted,
  CookingUstensil,
} from "@stores/features/cookingUstensils";

async function createUstensil(newCookingUstensil: CookingUstensil) {
/*


INSERT INTO
  cooking_ustensils (name)
VALUES
  (newCookingUstensil.name);


*/
// dispatch cookingUstensilAdded newCookingUstensil
}

async function deleteUstensil(cookingUstensilId: string) {
/*


DELETE cu
FROM
  cooking_ustensils cu
WHERE
  cu.id_cooking_ustensils = cookingUstensilId;


*/
// dispatch cookingUstensilDeleted cookingUstensilId
}

async function fetchCookingUstensils() {
  /*


SELECT
  *
FROM
  cooking_ustensils;


*/
  // dispatch cookingUstensilsSlice setCookingUstensils
}
