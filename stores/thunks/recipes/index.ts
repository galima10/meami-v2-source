import {
  setRecipes,
  recipeAdded,
  recipeDeleted,
  recipeUpdated,
  recipeIdSelected,
  clearRecipeIdSelected,
  Recipe,
} from "@stores/features/recipes";

async function deleteRecipe(recipeId: string) {
  /*


DELETE FROM
  recipes
WHERE
  id_recipes = recipeId;


*/
  // dispatch recipesSlice recipeDeleted recipeId
}

async function createRecipe(newRecipe: Recipe) {
  /*


INSERT INTO
  recipes (
    name,
    duration_in_minutes,
    preview_image_url,
    type,
    recipe
  )
VALUES
  (
    newRecipe.name,
    newRecipe.duration,
    newRecipe.imagePreview,
    newRecipe.recipeType,
    newRecipe.recipe
  );



INSERT INTO
  recipe_category_links (id_recipes, id_recipe_categories)
SELECT
  r.id_recipes,
  rc.id_recipe_categories
FROM
  recipes r
  JOIN recipe_categories rc
WHERE
  r.name = newRecipe.name
  AND rc.name IN ("Maison", "Simple"); => concaténer newRecipe.categories



=> Boucler sur newRecipe.ingredients et si isMorning = true, ne mettre que les menuCategories du matin sinon ceux du midi/soir 

const unit = utilser une fonction pure qui récupère l'unité entière en fonction de l'abbréviation sur ingredient.unit

INSERT INTO
  recipe_ingredient_links (id_recipes, id_ingredients, quantity, id_units)
SELECT
  r.id_recipes,
  i.id_ingredients,
  1,
  (
    SELECT
      id_units
    FROM
      units
    WHERE
      name = unit
  )
FROM
  recipes r
  JOIN ingredients i
WHERE
  r.name = newRecipe.name
  AND i.name = ingredient.name;


*/
  // dispatch recipesSlice recipeAdded newRecipe
}

async function updateRecipe(newRecipe: Recipe, actualRecipeName: string) {
  /*


UPDATE
  recipes
SET
  name = newRecipe.name,
  duration_in_minutes = newRecipe.duration,
  preview_image_url = newRecipe.imagePreview,
  type = newRecipe.recipeType,
  recipe = newRecipe.recipe
WHERE
  name = actualRecipeName;



DELETE FROM
  recipe_category_links
WHERE
  EXISTS (
    SELECT
      1
    FROM
      recipes r
    WHERE
      r.id_recipes = recipe_category_links.id_recipes
      AND r.name = actualIngredientName
  );



INSERT INTO
  recipe_category_links (id_recipes, id_recipe_categories)
SELECT
  r.id_recipes,
  rc.id_recipe_categories
FROM
  recipes r
  JOIN recipe_categories rc
WHERE
  r.name = newRecipe.name
  AND rc.name IN ("Maison", "Simple"); => concaténer newRecipe.categories



DELETE FROM
  recipe_ingredient_links
WHERE
  EXISTS (
    SELECT
      1
    FROM
      recipes r
    WHERE
      r.id_recipes = recipe_ingredient_links.id_recipes
      AND r.name = actualIngredientName
  );


  
=> Boucler sur newRecipe.ingredients et si isMorning = true, ne mettre que les menuCategories du matin sinon ceux du midi/soir 

const unit = utilser une fonction pure qui récupère l'unité entière en fonction de l'abbréviation sur ingredient.unit

INSERT INTO
  recipe_ingredient_links (id_recipes, id_ingredients, quantity, id_units)
SELECT
  r.id_recipes,
  i.id_ingredients,
  1,
  (
    SELECT
      id_units
    FROM
      units
    WHERE
      name = unit
  )
FROM
  recipes r
  JOIN ingredients i
WHERE
  r.name = newRecipe.name
  AND i.name = ingredient.name;

*/
  // dispatch recipesSlice recipeUpdated newRecipe
}

async function selectRecipe(recipeId: string) {
  // => si isMorning = true, ne mettre que les menuCategories du matin sinon ceux du midi/soir
  // dispatch recipesSlice.selectedId recipeId recipeIdSelected et clearRecipeIdSelected avant à faire
}

async function fetchRecipes() {
  /*


SELECT
  r.id_recipes,
  r.name AS recipe_name,
  r.type AS recipe_type,
  r.preview_image_url AS image_preview,
  i.name as ingredients
FROM
  recipes r
  JOIN recipe_ingredient_links ril ON ril.id_recipes = r.id_recipes
  JOIN ingredients i ON i.id_ingredients = ril.id_ingredients;


*/
}
