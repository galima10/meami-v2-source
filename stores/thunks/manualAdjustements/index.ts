import {
  setManualAdjustements,
  ingredientCheckToggled,
  ManualAdjustementItem,
} from "@stores/features/manualAdjustements";

async function loadManualChecks(type: "shopping" | "stock") {
  /*


=> Si type === "shoppoing" :

INSERT INTO
  shopping_list_manual_checks (
    id_shopping_lists,
    id_ingredients,
    usage_count
  )
SELECT
  sl.id_shopping_lists,
  i.id_ingredients,
  COUNT(mil.id_ingredients) AS usage_count
FROM
  shopping_lists sl
  JOIN menus m ON 1 = 1
  JOIN menu_ingredient_links mil ON mil.id_menus = m.id_menus
  JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
  JOIN units u ON u.id_units = i.id_units
WHERE
  i.quantifiable = FALSE
  AND u.name <> "Infini"
  AND NOT EXISTS (
    SELECT
      1
    FROM
      shopping_list_manual_checks slmc
    WHERE
      slmc.id_shopping_lists = sl.id_shopping_lists
      AND slmc.id_ingredients = i.id_ingredients
  )
GROUP BY
  sl.id_shopping_lists,
  i.id_ingredients;



SELECT
  i.id_ingredients,
  i.name AS ingredient_name,
  u.abbreviation AS unit,
  slmc.usage_count,
  slmc.checked
FROM
  shopping_list_manual_checks slmc
  JOIN ingredients i ON i.id_ingredients = slmc.id_ingredients
  JOIN units u ON u.id_units = i.id_units;


=> Si type === "stock"

INSERT INTO
  menu_ingredient_manual_checks (id_ingredients, usage_count)
SELECT
  i.id_ingredients,
  COUNT(mil.id_menus) AS usage_count
FROM
  ingredients i
  JOIN menu_ingredient_links mil ON mil.id_ingredients = i.id_ingredients
  JOIN units u ON u.id_units = i.id_units
WHERE
  i.quantifiable = FALSE
  AND u.name <> "Infini"
GROUP BY
  i.id_ingredients
ORDER BY
  usage_count DESC;



SELECT
  i.id_ingredients,
  i.name AS ingredient_name,
  u.abbreviation AS unit,
  mimc.usage_count,
  mimc.checked
FROM
  menu_ingredient_manual_checks mimc
  JOIN ingredients i ON i.id_ingredients = mimc.id_ingredients
  JOIN units u ON u.id_units = i.id_units;


*/
  // dispatch manualAdjustementsSlice setManualAdjustements ingredients type
}

async function removeManualChecks(type: "shopping" | "stock") {
  /*

let tableCible;

=> Si type === "shopping" :

tableCible = "shopping_list";

=> Si type === "stock" :

tableCible = "menu_ingredient";



DELETE FROM
  tableCible_manual_checks;


*/
  // dispatch manualAdjustementsSlice setManualAdjustements [] type
}

async function setIngredientCheck(
  type: "shopping" | "stock",
  ingredientId: string,
  checked: boolean,
) {
/*


let tableCible;

=> Si type === "shopping" :

tableCible = "shopping_list";

=> Si type === "stock" :

tableCible = "menu_ingredient";



UPDATE
  tableCible
SET
  checked = checked;
WHERE
  EXISTS (
    SELECT
      1
    FROM
      ingredients i
    JOIN units u ON u.id_units = i.id_units
    WHERE
      i.id_ingredients = ingredientId
  );



*/
// dispatch manualAdjustementsSlice ingredientCheckToggled type ingredientId checked
}
