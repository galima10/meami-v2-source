import {
  recipeCategoryAdded,
  recipeCategoryDeleted,
  setRecipeCategories,
  RecipeCategory,
} from "@stores/features/recipeCategories";

export async function fetchRecipeCategories() {
/*


SELECT * FROM recipe_categories;


*/

// dispatch recipeCategoriesSlice setRecipeCategories
}

export async function createRecipeCategory(newRecipeCategory: RecipeCategory) {
  // Vérifier si la catégorie n'existe pas déjà dans le slice
/*


INSERT INTO
  recipe_categories (name)
VALUES
  (newRecipeCategory.name);


*/
// dispatch recipesCategoriesSlice recipeCategoryAdded newRecipeCategory
}

export async function deleteRecipeCategory(recipeCategoryId: number) {
  // Vérifier si l'id est bien dans le slice
/*


DELETE FROM
  ingredient_categories
WHERE
  id_recipe_categories = recipeCategoryId;


*/

// dispatch recipesCategoriesSlice recipeCategoryDeleted
}
