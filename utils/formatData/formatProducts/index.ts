import type { Products } from "@stores/features/products";
import type { ProductRaw } from "@services/products";
import { fromDbNumber } from "helpers/dbHelpers";

export function formatProducts(rawData: ProductRaw[]): Products {
  const treated = rawData.reduce<Products>((acc, data) => {
    acc[data.product_id] = {
      name: data.product_name,
      stockQuantity: fromDbNumber(data.stock_quantity),
    };

    return acc;
  }, {});

  return treated;
}
