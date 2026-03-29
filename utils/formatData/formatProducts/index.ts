import type { Product } from "@stores/features/products";
import type { ProductRaw } from "@services/products";
import type { WithRequiredId } from "@app-types/NameId";

export function formatProducts(
  rawData: ProductRaw[],
): WithRequiredId<Product>[] {
  const treated: WithRequiredId<Product>[] = rawData.map((data) => {
    return {
      id: data.product_id,
      name: data.product_name,
      stockQuantity: data.stock_quantity,
    };
  });
  return treated;
}
