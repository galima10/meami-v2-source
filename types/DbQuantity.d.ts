export type QuantityTable =
  | "shopping_list_items"
  | "ingredients"
  | "products"
  | "menu_ingredient_links";

export type QuantityField =
  | "quantity_needed"
  | "quantity_buyed"
  | "stock_quantity"
  | "quantity";

export type QuantityCondition = "id_ingredients" | "id_products";

export type Operation = "set" | "increment" | "decrement";
