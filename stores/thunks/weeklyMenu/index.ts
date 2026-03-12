import {
  setWeeklyMenu,
  menuUpdated,
  menuDoneToggled,
  clearMenu,
  ingredientMenuQuantitySetted,
  Menu,
  IngredientMenu,
} from "@stores/features/weeklyMenu";

export async function removeMenu(menuId: string) {
  /*


DELETE FROM
  menu_ingredient_links
WHERE
  EXISTS (
    SELECT
      1
    FROM
      menus m
    WHERE
      m.id_menus = menu_ingredient_links.id_menus
      AND m.id_menus = menuId
  );


*/
  // dispatch weeklyMenuSlice clearMenu menuId
}

export async function removeIngredientToMenu(ingredientId: string, menu: Menu) {
  /*


DELETE FROM menu_ingredient_links
WHERE 
  EXISTS (
    SELECT 
      1
    FROM 
      menus m
    JOIN ingredients i ON i.id_ingredients = menu_ingredient_links.id_ingredients
    WHERE 
      m.id_menus = menuId
      AND i.id_ingredients = menu_ingredient_links.id_ingredients
      AND i.id_ingredients = ingredientId
  );


*/
  // select weeklyMenuSlice menu.id et retirer ingredientId dans newMenu
  // dispatch weeklyMenuSlice menuUpdated newMenu
}

export async function removeWeeklyMenu() {
  /*

DELETE FROM
  menu_ingredient_links;


UPDATE
  menus
SET
  done = 0;

*/
  // dispatch weeklyMenuSlice setWeeklyMenu {}
}

export async function setIngredientToMenu(
  newIngredient: IngredientMenu,
  menuId: string,
) {
  // const unit = utilser une fonction pure qui récupère l'unité entière en fonction de l'abbréviation sur newIngredient.unit
  /*


DELETE FROM menu_ingredient_links
WHERE 
  EXISTS (
    SELECT 
      1
    FROM 
      menus m
    JOIN ingredients i ON i.id_ingredients = menu_ingredient_links.id_ingredients
    WHERE 
      m.id_menus = menuId
      AND i.id_ingredients = menu_ingredient_links.id_ingredients
      AND i.id_ingredients = newIngredient.id
  );



INSERT INTO
  menu_ingredient_links (id_menus, id_ingredients, quantity, id_units)
SELECT
  DISTINCT m.id_menus,
  i.id_ingredients,
  newIngredient.quantity,
  u.id_units
FROM
  menus m
  JOIN ingredients i ON i.name = newIngredient.id
  LEFT JOIN units u ON u.name = unit
  JOIN moments mo ON mo.id_moments = m.id_moments
  JOIN days d ON d.id_days = m.id_days
  JOIN ingredient_menu_category_links imcl ON imcl.id_ingredients = i.id_ingredients
  JOIN menu_categories mc ON mc.id_menu_categories = imcl.id_menu_categories
  JOIN menu_category_moments_links mcml ON mcml.id_menu_categories = mc.id_menu_categories
  AND mcml.id_moments = m.id_moments
WHERE
  m.id_menus = menuId
  AND NOT EXISTS (
    SELECT
      1
    FROM
      menu_ingredient_links mil
    WHERE
      mil.id_menus = m.id_menus
      AND mil.id_ingredients = i.id_ingredients
  );


*/
  // select weeklyMenuSlice menuId et ajouter newIngredient dans newMenu
  // dispatch weeklyMenuSlice menuUpdated newMenu
}

export async function setMenuDone(menuId: string, done: boolean) {
  /*


UPDATE
  menus
SET
  done = done ? 1 : 0
WHERE
  id_menus = menuId;


*/
  // dispatch weeklyMenuSlice menuDoneToggled menuId done
}

export async function addRecipeToMenu(recipeId: string, menuId: string) {
  /*


INSERT INTO
  menu_ingredient_links (id_menus, id_ingredients, quantity, id_units)
SELECT
  m.id_menus,
  i.id_ingredients,
  ril.quantity,
  ril.id_units
FROM
  menus m
  JOIN recipes r ON r.id_recipes = recipeId
  JOIN recipe_ingredient_links ril ON ril.id_recipes = r.id_recipes
  JOIN ingredients i ON i.id_ingredients = ril.id_ingredients
WHERE
  m.id_menus = menuId
  AND NOT EXISTS (
    SELECT
      1
    FROM
      menu_ingredient_links mil
    WHERE
      mil.id_menus = m.id_menus
      AND mil.id_ingredients = i.id_ingredients
  );


*/
  // select recipesSlice le recette de recipeId et select weeklyMenuSlice menuId pour avoir le menu
  // Fusionner les ingrédients de la recette aux ingrédients du menu si ils n'y sont pas déjà et aux bonnes catégories de menu
  // dispatch weeklyMenuSlice menuUpdated menu
}

export async function fetchWeeklyMenu() {
  /*


SELECT
  d.name AS day_name,
  mo.name AS moment_name,
  m.done,
  mc.name AS menu_category_name,
  i.name AS ingredient_name,
  mil.quantity,
  u.abbreviation AS unit
FROM
  menus m
  JOIN days d ON d.id_days = m.id_days
  JOIN moments mo ON mo.id_moments = m.id_moments
  JOIN menu_ingredient_links mil ON mil.id_menus = m.id_menus
  JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
  JOIN ingredient_menu_category_links imcl ON imcl.id_ingredients = i.id_ingredients
  JOIN menu_categories mc ON mc.id_menu_categories = imcl.id_menu_categories
  JOIN menu_category_moments_links mcml ON mcml.id_menu_categories = mc.id_menu_categories
  AND mcml.id_moments = m.id_moments
  LEFT JOIN units u ON u.id_units = mil.id_units
ORDER BY
  m.id_menus,
  mc.id_menu_categories,
  i.name;



*/
  // dispatch weeklyMenuSlice setWeeklyMenu
}

export async function setIngredientMenuQuantity(
  ingredientId: string,
  menuId: string,
  delta: number,
) {
  // dispatch ingredientsSlice ingredientStockQuantitySetted ingredientId menuId delta
}
