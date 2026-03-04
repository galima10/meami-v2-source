async function updateStorageLocation() {}

async function setQuantifiable() {}

async function updateIngredient() {}

async function selectIngredient() {
  // Mett
}

async function updateStockFromShopping() {}

async function deleteIngredient() {}

async function addIngredient() {}

async function updateStockFromMenu() {}

async function fetchIngredients() {
/*
SELECT
  i.id_ingredients,
  GROUP_CONCAT(DISTINCT mc.name ORDER BY mc.name) AS menu_categories,
  ic.name AS category_name,
  i.name AS ingredient_name,
  i.stock_quantity,
  u.abbreviation AS abbreviation
FROM
  ingredients i
  JOIN units u ON u.id_units = i.id_units
  JOIN ingredient_categories ic ON ic.id_ingredient_categories = i.id_ingredient_categories
  JOIN ingredient_menu_category_links imc ON imc.id_ingredients = i.id_ingredients
  JOIN menu_categories mc ON mc.id_menu_categories = imc.id_menu_categories
GROUP BY i.id_ingredients;
*/
}

