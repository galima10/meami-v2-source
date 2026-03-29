import { getDb } from "@database/database";
import type { Product } from "@stores/features/products";
import { WithRequiredId } from "@app-types/NameId";

export interface ProductRaw {
  product_id: number;
  product_name: string;
  stock_quantity: number;
}

export async function FetchProductsService() {
  const db = await getDb();
  return db.getAllAsync<ProductRaw>(`
    SELECT
      p.id_products AS product_id,
      p.name AS product_name,
      p.stock_quantity
    FROM
      products p;
  `);
}

export async function DeleteProductService(productId: number) {
  const db = await getDb();
  await db.runAsync(
    `
    DELETE FROM
      products
    WHERE
      id_products = ?;
  `,
    [productId],
  );
}

export async function UpdateProductService(
  newProduct: WithRequiredId<Product>,
) {
  const db = await getDb();
  await db.runAsync(
    `
    UPDATE
      products
    SET
      name = ?,
      stock_quantity = MAX(0, ?)
    WHERE
      id_products = ?;
  `,
    [newProduct.name, newProduct.stockQuantity, newProduct.id],
  );
}

export async function CreateProductService(newProduct: Product) {
  const db = await getDb();
  const result = await db.runAsync(
    `
    INSERT INTO
      products (name, stock_quantity)
    VALUES
      (?, MAX(0, ?));
  `,
    [newProduct.name, newProduct.stockQuantity],
  );
  const id = result.lastInsertRowId;
  return { id, ...newProduct };
}
