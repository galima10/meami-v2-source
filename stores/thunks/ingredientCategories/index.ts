import {
  setIngredientCategories,
  ingredientCategoryDeleted,
  ingredientCategoryAdded,
  IngredientCategory,
} from "@stores/features/ingredientCategories";

async function fetchIngredientCategories() {
  // SELECT * FROM ingredient_categories;
  // dispatch ingredientCategoriesSlice setIngredientCategories
}

async function createIngredientCategory(
  newIngredientCategory: IngredientCategory,
) {
  // Vérifier si la catégorie n'existe pas déjà dans le slice
  /*


INSERT INTO
  ingredient_categories (name)
VALUES
  (newIngredientCategory.name);
  

*/
// dispatch ingredientCategoriesSlice ingredientCategoryAdded newIngredientCategory
}

async function deleteIngredientCategory(ingredientCategoryId: string) {
  // Vérifier si l'id est bien dans le slice
/*


DELETE FROM
  ingredient_categories
WHERE
  id_ingredient_categories = ingredientCategoryId;


*/

// dispatch ingredientCategoriesSlice ingredientCategoryDeleted ingredientCategoryId
}
