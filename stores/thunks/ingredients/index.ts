import {
  setIngredients,
  ingredientAdded,
  ingredientDeleted,
  ingredientUpdated,
  selectIngredientId,
  clearIngredientSelectedId,
  Ingredient,
} from "@stores/features/ingredients";

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
  // dispatch ingedientsSlice.list setIngredients
}

async function selectIngredient(ingredient: Ingredient) {
  // Mettre en params un ingrédient du type Ingredient
  // Mettre l'id de l'ingrédient sélectionné dans le slice
  // faire dispatch clearIngredientSelectedId si il est pas encore sur null
  // dispatch ingredientsSlice.selectedId selectIngredientId si null
}

async function createIngredient(ingredient: Ingredient) {
  // dispatch ingredientsSlice.list ingredientAdded
}

async function updateIngredient(ingredient: Ingredient) {
  // dispatch ingredientsSlice.list ingredientUpdated
}

async function updateStorageLocation(ingredient: Ingredient, arr: Array<string>) {
  // dispatch ingredientsSlice.list ingredientUpdated
}

async function setQuantifiable(ingredient: Ingredient, bool: boolean) {
  // dispatch ingredientsSlice.list ingredientUpdated
}

async function deleteIngredient(ingredientId: string) {
  // dispatch ingredientsSlice.list ingredientDeleted
}

async function updateStockFromMenu() {}

async function updateStockFromShopping() {}