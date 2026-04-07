import type { Products } from "@stores/features/products";
import type { ProductRaw } from "@services/products";

export function formatProducts(rawData: ProductRaw[]): Products {
  const treated = rawData.reduce<Products>((acc, data) => {
    acc[data.product_id] = {
      name: data.product_name,
      stockQuantity: data.stock_quantity,
    };

    return acc;
  }, {});

  return treated;
}
