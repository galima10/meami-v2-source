import {
  setWeeklyMenu,
  menuUpdated,
  menuDoneToggled,
  clearMenu,
  ingredientMenuQuantitySetted,
  Menu,
  IngredientMenu
} from "@stores/features/weeklyMenu";

async function removeMenu(menuId: string) {
/*


DELETE mil
FROM
  menu_ingredient_links mil
  JOIN menus m ON m.id_menus = mil.id_menus
WHERE
  m.id_menus = menuId;


*/
// dispatch weeklyMenuSlice clearMenu menuId
}

async function removeIngredientToMenu(ingredientId: string, menu: Menu) {
/*


DELETE mil
FROM
  menu_ingredient_links mil
  JOIN menus m ON m.id_menus = mil.id_menus
  JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
  JOIN moments mo ON mo.id_moments = m.id_moments
  JOIN days d ON d.id_days = m.id_days
WHERE
  m.id_menus = menuId
  AND i.id_ingredients = ingredientId;


*/
// select weeklyMenuSlice menu.id et retirer ingredientId dans newMenu
// dispatch weeklyMenuSlice menuUpdated newMenu
}

async function removeWeeklyMenu() {
/*

DELETE mil
FROM
  menu_ingredient_links mil
  JOIN menus m ON m.id_menus = mil.id_menus;

UPDATE
  menus
SET
  done = FALSE;

*/
// dispatch weeklyMenuSlice setWeeklyMenu {}
}

async function addIngredientToMenu(newIngredient: IngredientMenu, menuId: string) {
// const unit = utilser une fonction pure qui récupère l'unité entière en fonction de l'abbréviation sur newIngredient.unit
/*


DELETE mil
FROM
  menu_ingredient_links mil
  JOIN menus m ON m.id_menus = mil.id_menus
  JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
WHERE
  m.id_menus = menuId
  AND i.id_ingredients = newIngredient.id;

INSERT INTO
  menu_ingredient_links (id_menus, id_ingredients, quantity, id_units)
SELECT
  DISTINCT m.id_menus,
  i.id_ingredients,
  GREATEST(1, newIngredient.quantity),
  u.id_units
FROM
  menus m
  JOIN ingredients i ON i.name = newIngredient.id
  LEFT JOIN units u ON u.abbreviation = unit
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

async function setMenuDone(menuId: string, done: boolean) {
/*


UPDATE
  menus m
SET
  done = done
WHERE
  m.id_menus = menuId;


*/
// dispatch weeklyMenuSlice menuDoneToggled menuId done
}

async function addRecipeToMenu(recipeId: string, menuId: string) {
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
  JOIN moments mo ON m.id_moments = mo.id_moments
  JOIN days d ON m.id_days = d.id_days
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

async function fetchWeeklyMenu() {
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


async function setIngredientMenuQuantity(ingredientId: string, menuId: string, delta: number) {
  // dispatch ingredientsSlice ingredientStockQuantitySetted ingredientId menuId delta
}