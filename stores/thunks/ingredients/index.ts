import {
  setIngredients,
  ingredientAdded,
  ingredientDeleted,
  ingredientUpdated,
  ingredientIdSelected,
  clearIngredientIdSelected,
  Ingredient,
} from "@stores/features/ingredients";

async function fetchIngredients() {
  /*
SELECT
  i.id_ingredients,
  GROUP_CONCAT(DISTINCT mc.name ORDER BY mc.name) AS menu_categories,
  ic.name AS category_name,
  i.name AS ingredient_name,
  i.quantifiable,
  i.stock_quantity,
  u.abbreviation AS abbreviation,
  GROUP_CONCAT(DISTINCT sl.name ORDER BY sl.name) AS storage_locations
FROM
  ingredients i
  JOIN units u ON u.id_units = i.id_units
  JOIN ingredient_categories ic ON ic.id_ingredient_categories = i.id_ingredient_categories
  JOIN ingredient_menu_category_links imc ON imc.id_ingredients = i.id_ingredients
  JOIN menu_categories mc ON mc.id_menu_categories = imc.id_menu_categories
  LEFT JOIN ingredient_storage_location_links isll ON isll.id_ingredients = i.id_ingredients
  LEFT JOIN storage_locations sl ON sl.id_storage_locations = isll.id_storage_locations
GROUP BY i.id_ingredients;
*/
  // dispatch ingedientsSlice setIngredients
}

async function selectIngredient(ingredientId: string) {
  // dispatch ingredientsSlice.selectedId ingredientIdSelected et clearIngredientIdSelected avant à faire
}

async function createIngredient(newIngredient: Ingredient) {
  // Vérifier si le newIngredient est déjà dans le slice des ingrédients
  // const unit = utilser une fonction pure qui récupère l'unité entière en fonction de l'abbréviation sur newIngredient.unit
  /*


INSERT INTO
  ingredients (
    name,
    quantifiable,
    stock_quantity,
    id_ingredient_categories,
    id_units
  )
SELECT
  newIngredient.name,
  newIngredient.quantifiable,
  GREATEST(0, newIngredient.stockQuantity),
  ic.id_ingredient_categories,
  (
    SELECT
      id_units
    FROM
      units
    WHERE
      name = unit
  )
FROM
  ingredient_categories ic
WHERE
  ic.name = ingredient.category;



INSERT INTO
  ingredient_menu_category_links (id_ingredients, id_menu_categories)
SELECT
  i.id_ingredients,
  mc.id_menu_categories
FROM
  ingredients i
  JOIN menu_categories mc
WHERE
  i.name = newIngredient.name
  AND mc.name IN ("BOISSON CHAUDE", "AUTRE"); => concaténer newIngredient.menuCategories 



INSERT INTO
  ingredient_storage_location_links (id_ingredients, id_storage_locations)
SELECT
  i.id_ingredients,
  sl.id_storage_locations
FROM
  ingredients i
  JOIN storage_locations sl
WHERE
  i.name = newIngredient.name
  AND sl.name IN ("Température ambiante"); => concaténer newIngredient.storageLocations 


*/
  // dispatch ingredientsSlice ingredientAdded newIngredient
}

async function updateIngredient(
  newIngredient: Ingredient,
  actualIngredientName: string,
) {
  // Vérifier si le newIngredient avec des menuCategories et storageLocations valides (bien présents dans les slices correspondants) est bien dans le slice des ingrédients
  // const unit = utilser une fonction pure qui récupère l'unité entière en fonction de l'abbréviation sur newIngredient.unit
  /*


UPDATE
  ingredients i
SET
  i.name = newIngredient.name,
  i.quantifiable = newIngredient.quantifiable,
  i.stock_quantity = GREATEST(0, newIngredient.stockQuantity),
  i.id_ingredient_categories = COALESCE(
    (
      SELECT
        id_ingredient_categories
      FROM
        ingredient_categories
      WHERE
        name = newIngredient.category
      LIMIT
        1
    ), i.id_ingredient_categories
  ), i.id_units = COALESCE(
    (
      SELECT
        id_units
      FROM
        units
      WHERE
        name = unit
      LIMIT
        1
    ), i.id_units
  )
WHERE
  i.name = actualIngredientName;



DELETE imcl
FROM
  ingredient_menu_category_links imcl
  JOIN ingredients i ON i.id_ingredients = imcl.id_ingredients
WHERE
  i.name = actualIngredientName;

INSERT INTO
  ingredient_menu_category_links (id_ingredients, id_menu_categories)
SELECT
  i.id_ingredients,
  mc.id_menu_categories
FROM
  ingredients i
  JOIN menu_categories mc
WHERE
  i.name = newIngredient.name
  AND mc.name IN ("BOISSON CHAUDE", "AUTRE"); => concaténer newIngredient.menuCategories



DELETE isll
FROM
  ingredient_storage_location_links isll
  JOIN ingredients i ON i.id_ingredients = isll.id_ingredients
WHERE
  i.name = actualIngredientName;

INSERT INTO
  ingredient_storage_location_links (id_ingredients, id_storage_locations)
SELECT
  i.id_ingredients,
  sl.id_storage_locations
FROM
  ingredients i
  JOIN storage_locations sl
WHERE
  i.name = newIngredient.name
  AND sl.name IN ("Température ambiante", "Réfrigérateur"); => concaténer newIngredient.storageLocations


*/
  // dispatch ingredientsSlice ingredientUpdated newIngredient
}

async function updateStorageLocation(
  ingredientId: Ingredient,
  newStorageLocations: Array<string>,
) {
// Vérifier si les storageLocations sont valides (bien présents dans les slices correspondants) et l'ingredientId est bien dans le slice des ingrédients
  /*


DELETE isll
FROM
  ingredient_storage_location_links isll
  JOIN ingredients i ON i.id_ingredients = isll.id_ingredients
WHERE
  i.id_ingredients = ingredientId;

INSERT INTO
  ingredient_storage_location_links (id_ingredients, id_storage_locations)
SELECT
  i.id_ingredients,
  sl.id_storage_locations
FROM
  ingredients i
  JOIN storage_locations sl
WHERE
  i.id_ingredients = ingredientId
  AND sl.name IN ("Température ambiante", "Réfrigérateur"); => concaténer newStorageLocations


*/
  // dispatch ingredientsSlice ingredientUpdated ingredient où id = ingredientId
}

async function setQuantifiable(ingredientId: Ingredient, newQuantifiable: boolean) {
// Vérifier si l'ingredientId est bien dans le slice des ingrédients
  /*


UPDATE
  ingredients i
SET
  i.quantifiable = newQuantifiable
WHERE
  i.id_ingredients = ingredientId;
  

*/
  // dispatch ingredientsSlice ingredientUpdated ingredient où id = ingredientId
}

async function deleteIngredient(ingredientId: string) {
// Vérifier si l'ingredientId est bien dans le slice des ingrédients
  // dispatch ingredientsSlice ingredientDeleted
}


async function setIngredientStockQuantity(ingredientId: string, delta: number) {}

async function updateStockFromMenu() {}

async function updateStockFromShopping() {}
