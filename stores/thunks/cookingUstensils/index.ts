import {
  setCookingUstensils,
  cookingUstensilAdded,
  cookingUstensilDeleted,
  CookingUstensil,
} from "@stores/features/cookingUstensils";

export async function createUstensil(newCookingUstensil: CookingUstensil) {
/*


INSERT INTO
  cooking_ustensils (name)
VALUES
  (newCookingUstensil.name);


*/
// dispatch cookingUstensilAdded newCookingUstensil
}

export async function deleteUstensil(cookingUstensilId: number) {
/*


DELETE FROM
  cooking_ustensils
WHERE
  id_cooking_ustensils = cookingUstensilId;


*/
// dispatch cookingUstensilDeleted cookingUstensilId
}

export async function fetchCookingUstensils() {
  /*


SELECT
  *
FROM
  cooking_ustensils;


*/
  // dispatch cookingUstensilsSlice setCookingUstensils
}
