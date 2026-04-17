import { fromDbNumber } from "@helpers/dbHelpers";
import type { ShoppingListRaw } from "@services/shoppingList";
import type {
    ShoppingListIngredients,
    ShoppingListProducts,
} from "@stores/features/shoppingList";

export function formatShoppingList(rawData: ShoppingListRaw): {
  ingredients: ShoppingListIngredients;
  products: ShoppingListProducts;
} {
  const rawIngredients = rawData.ingredients;
  const rawProducts = rawData.products;

  const ingredients = rawIngredients.reduce<ShoppingListIngredients>(
    (acc, data) => {
      acc[data.ingredient_id] = {
        quantityNeeded: fromDbNumber(data.quantity_needed),
        quantityBuyed: fromDbNumber(data.quantity_buyed),
        unitId: data.unit_id,
        categoryId: data.category_id,
      };

      return acc;
    },
    {},
  );

  const products = rawProducts.reduce<ShoppingListProducts>((acc, data) => {
    acc[data.product_id] = {
      quantityNeeded: fromDbNumber(data.quantity_needed),
      quantityBuyed: fromDbNumber(data.quantity_buyed),
    };

    return acc;
  }, {});

  return {
    ingredients,
    products,
  };
}
