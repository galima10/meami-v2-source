import {
  setShoppingList,
  itemAdded,
  itemRemoved,
  itemQuantitySetted,
  ShoppingListItem,
} from "@stores/features/shoppingList";

export async function addItemToShopping(
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
  1,
  0,
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
  ) 
  ON CONFLICT(id_shopping_lists, id_ingredients)
  DO UPDATE SET
    quantity_needed = quantity_needed + 1;



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
  1,
  0
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
  )
  ON CONFLICT(id_shopping_lists, id_products)
  DO UPDATE SET
    quantity_needed = quantity_needed + 1;


*/
  // dispatch shoppingListSlice itemAdded newItem et type
}

export async function removeItemToShopping(
  itemId: number,
  type: "ingredients" | "products",
) {
  /*

=> Si type === "ingredients" :

DELETE FROM 
  shopping_list_items
WHERE
  EXISTS (
    SELECT
      1
    FROM
      ingredients i
    WHERE
      i.id_ingredients = shopping_list_items.id_ingredients
      AND i.id_ingredients = itemId
  );



=> Si type === "products" :

DELETE FROM 
  shopping_list_items
WHERE
  EXISTS (
    SELECT
      1
    FROM
      products p
    WHERE
      p.id_products = shopping_list_items.id_products
      AND p.id_products = itemId
  );


*/
  // dispatch shoppingListSlice itemRemoved itemId et type
}

export async function setShoppingListItemQuantity(
  itemId: number,
  type: "ingredients" | "products",
  quantityField: "quantityNeeded" | "quantityBuyed",
  delta: number,
) {
/*

bddQuantityField = quantityField === "quantityNeeded" ? "quantity_needed" : "quantity_buyed";


=> Si delta === 1 ou delta === -1

=> Si type === "ingredients" :

UPDATE shopping_list_items
SET bddQuantityField = bddQuantityField + delta
WHERE 
  id_shopping_lists = (
    SELECT 
      id_shopping_lists
    FROM shopping_lists
    ORDER BY created_at DESC
    LIMIT 
      1
)
AND id_ingredients = itemId;



=> Si type === "products" :

UPDATE shopping_list_items
SET bddQuantityField = bddQuantityField + delta
WHERE 
  id_shopping_lists = (
    SELECT 
      id_shopping_lists
    FROM shopping_lists
    ORDER BY created_at DESC
    LIMIT 
      1
)
AND id_products = itemId;



=> Si quantityField === "quantityNeeded" et delta > 1

=> Si type === "ingredients" :

UPDATE shopping_list_items
SET quantity_needed = delta
WHERE 
  id_shopping_lists = (
    SELECT 
      id_shopping_lists
    FROM shopping_lists
    ORDER BY created_at DESC
    LIMIT 
      1
)
AND id_ingredients = itemId;



=> Si type === "products" :

UPDATE shopping_list_items
SET quantity_needed = delta
WHERE 
  id_shopping_lists = (
    SELECT 
      id_shopping_lists
    FROM shopping_lists
    ORDER BY created_at DESC
    LIMIT 
      1
)
AND id_products = itemId;


*/
  // dispatch shoppingListSlice itemQuantitySetted itemId type quantityType delta
}

export async function loadShoppingList() {
  /*


DELETE FROM
  shopping_lists;

INSERT INTO
  shopping_lists DEFAULT
VALUES
;

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
  CROSS JOIN menus m
  JOIN menu_ingredient_links mil ON mil.id_menus = m.id_menus
  JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
WHERE
  i.quantifiable = 1
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

WITH last_list AS (
  SELECT
    id_shopping_lists
  FROM
    shopping_lists
  ORDER BY
    created_at DESC
  LIMIT
    1
)
SELECT
  *
FROM
  (
    SELECT
      i.id_ingredients,
      i.name AS item_name,
      sli.quantity_needed,
      sli.quantity_buyed,
      u.abbreviation AS unit,
      ic.name AS category_name,
      'ingredient' AS item_type,
      (sli.quantity_needed <= sli.quantity_buyed) AS is_done
    FROM
      shopping_list_items sli
      JOIN ingredients i ON i.id_ingredients = sli.id_ingredients
      JOIN units u ON u.id_units = sli.id_units
      JOIN ingredient_categories ic ON ic.id_ingredient_categories = i.id_ingredient_categories
      JOIN last_list ll ON ll.id_shopping_lists = sli.id_shopping_lists
    UNION
    ALL
    SELECT
      p.id_products,
      p.name AS item_name,
      sli.quantity_needed,
      sli.quantity_buyed,
      NULL AS unit,
      NULL AS category_name,
      'product' AS item_type,
      (sli.quantity_needed <= sli.quantity_buyed) AS is_done
    FROM
      shopping_list_items sli
      JOIN products p ON p.id_products = sli.id_products
      JOIN last_list ll ON ll.id_shopping_lists = sli.id_shopping_lists
  )
ORDER BY
  is_done ASC,
  category_name DESC,
  item_type,
  item_name;


*/
  // dispatch shoppingListSlice setShoppingList
}
