import {
  setShoppingList,
  itemAdded,
  itemRemoved,
  itemQuantitySetted,
  ShoppingListItem,
} from "@stores/features/shoppingList";

async function addItemToShopping(
  newItem: ShoppingListItem,
  type: "ingredients" | "products",
) {
  /*

=> Si type === "ingredients" :

INSERT INTO
  shopping_list_items (
    id_shopping_lists,
    id_ingredients,
    quantity_needed,
    quantity_buyed,
    quantifiable,
    id_units
  )
SELECT
  sl.id_shopping_lists,
  i.id_ingredients,
  GREATEST(1, newItem.quantityNeeded),
  GREATEST(0, 0),
  i.quantifiable,
  i.id_units
FROM
  shopping_lists sl
  JOIN ingredients i ON i.id_ingredients = newItem.id
WHERE
  sl.id_shopping_lists = (
    SELECT
      id_shopping_lists
    FROM
      shopping_lists
    ORDER BY
      created_at DESC
    LIMIT
      1
  ) ON DUPLICATE KEY
UPDATE
  quantity_needed = GREATEST(1, quantity_needed + 1);



=> Si type === "products" :

INSERT INTO
  shopping_list_items (
    id_shopping_lists,
    id_products,
    quantity_needed,
    quantity_buyed
  )
SELECT
  sl.id_shopping_lists,
  p.id_products,
  GREATEST(1, newItem.quantityNeeded),
  GREATEST(0, 0)
FROM
  shopping_lists sl
  JOIN products p ON p.id_products = newItem.id
WHERE
  sl.id_shopping_lists = (
    SELECT
      id_shopping_lists
    FROM
      shopping_lists
    ORDER BY
      created_at DESC
    LIMIT
      1
  ) ON DUPLICATE KEY
UPDATE
  quantity_needed = GREATEST(1, quantity_needed + 1);


*/
  // dispatch shoppingListSlice itemAdded newItem et type
}

async function removeItemToShopping(
  itemId: string,
  type: "ingredients" | "products",
) {
  /*

=> Si type === "ingredients" :

DELETE sli
FROM
  shopping_list_items sli
  JOIN ingredients i ON sli.id_ingredients = i.id_ingredients
WHERE
  i.id_ingredients = itemId;



=> Si type === "products" :

DELETE sli
FROM
  shopping_list_items sli
  JOIN products p ON sli.id_products = p.id_products
WHERE
  p.id_products = itemId;


*/
  // dispatch shoppingListSlice itemRemoved itemId et type
}

async function setShoppingListItemQuantity(
  itemId: string,
  type: "ingredients" | "products",
  quantityField: "quantityNeeded" | "quantityBuyed",
  delta: number,
) {
/*


=> Si delta === 1 ou delta === -1

=> Si type === "ingredients" :

UPDATE
  shopping_list_items sli
  JOIN ingredients i ON i.id_ingredients = sli.id_ingredients
SET
  sli.quantityField = sli.quantityField + delta
WHERE
  sli.id_shopping_lists = (
    SELECT
      id_shopping_lists
    FROM
      shopping_lists
    ORDER BY
      created_at DESC
    LIMIT
      1
  )
  AND i.name = "Ail semoule";



=> Si type === "products" :

UPDATE
  shopping_list_items sli
  JOIN products p ON p.id_products = sli.id_products
SET
  sli.quantityField = sli.quantityField + delta
WHERE
  sli.id_shopping_lists = (
    SELECT
      id_shopping_lists
    FROM
      shopping_lists
    ORDER BY
      created_at DESC
    LIMIT
      1
  )
  AND p.name = "Rouleau d'essuie-tout";


  

=> Si quantityField === "quantityNeeded" et delta > 1

=> Si type === "ingredients" :

UPDATE
  shopping_list_items sli
  JOIN ingredients i ON i.id_ingredients = sli.id_ingredients
SET
  sli.quantity_needed = GREATEST(1, delta)
WHERE
  sli.id_shopping_lists = (
    SELECT
      id_shopping_lists
    FROM
      shopping_lists
    ORDER BY
      created_at DESC
    LIMIT
      1
  )
  AND i.name = "Ail semoule";



=> Si type === "products" :

UPDATE
  shopping_list_items sli
  JOIN products p ON p.id_products = sli.id_products
SET
  sli.quantity_needed = GREATEST(1, delta)
WHERE
  sli.id_shopping_lists = (
    SELECT
      id_shopping_lists
    FROM
      shopping_lists
    ORDER BY
      created_at DESC
    LIMIT
      1
  )
  AND p.name = "Rouleau d'essuie-tout";


*/
  // dispatch shoppingListSlice itemQuantitySetted itemId type quantityType delta
}

async function loadShoppingList() {
  /*


DELETE FROM
  shopping_lists;

INSERT INTO
  shopping_lists ()
VALUES
  ();



INSERT INTO
  shopping_list_items (
    id_shopping_lists,
    id_ingredients,
    quantity_needed,
    quantity_buyed,
    quantifiable,
    id_units
  )
SELECT
  sl.id_shopping_lists,
  i.id_ingredients,
  SUM(mil.quantity) - COALESCE(i.stock_quantity, 0) AS quantity_needed,
  0 AS quantity_buyed,
  i.quantifiable,
  i.id_units
FROM
  shopping_lists sl
  JOIN menus m ON 1 = 1
  JOIN menu_ingredient_links mil ON mil.id_menus = m.id_menus
  JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
WHERE
  i.quantifiable = TRUE
  AND NOT EXISTS (
    SELECT
      1
    FROM
      shopping_list_items sli
    WHERE
      sli.id_shopping_lists = sl.id_shopping_lists
      AND sli.id_ingredients = i.id_ingredients
  )
GROUP BY
  sl.id_shopping_lists,
  i.id_ingredients,
  i.quantifiable,
  i.id_units,
  i.stock_quantity
HAVING
  SUM(mil.quantity) > COALESCE(i.stock_quantity, 0);



SELECT
  i.id_ingredients,
  i.name AS item_name,
  sli.quantity_needed,
  sli.quantity_buyed,
  u.abbreviation AS unit,
  ic.name AS category_name,
  'ingredient' AS item_type
FROM
  shopping_list_items sli
  JOIN ingredients i ON i.id_ingredients = sli.id_ingredients
  JOIN units u ON u.id_units = sli.id_units
  JOIN ingredient_categories ic ON ic.id_ingredient_categories = i.id_ingredient_categories
WHERE
  sli.id_shopping_lists = (
    SELECT
      id_shopping_lists
    FROM
      shopping_lists
    ORDER BY
      created_at DESC
    LIMIT
      1
  )
UNION
ALL
SELECT
  p.id_products,
  p.name AS item_name,
  sli.quantity_needed,
  sli.quantity_buyed,
  NULL AS unit,
  NULL AS category_name,
  'product' AS item_type
FROM
  shopping_list_items sli
  JOIN products p ON p.id_products = sli.id_products
WHERE
  sli.id_shopping_lists = (
    SELECT
      id_shopping_lists
    FROM
      shopping_lists
    ORDER BY
      created_at DESC
    LIMIT
      1
  )
ORDER BY
  (quantity_needed <= quantity_buyed) ASC,
  category_name DESC,
  item_type,
  item_name;


*/
  // dispatch shoppingListSlice setShoppingList
}
