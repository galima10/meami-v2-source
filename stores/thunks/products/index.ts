import {
  setProducts,
  productAdded,
  productDeleted,
  productIdSelected,
  productUpdated,
  clearProductIdSelected,
  Product,
  productStockQuantitySetted
} from "@stores/features/products";

async function deleteProduct(productId: string) {
  /*


DELETE FROM
  products
WHERE
  id_products = productId;


*/
  // dispatch productsSlice productDeleted
}

async function selectProduct(productId: string) {
  // dispatch productsSlice.selectedId productId productIdSelected et clearProductIdSelected avant à faire
}

async function updateProduct(newProduct: Product, actualProductName: string) {
  /*


UPDATE
  products
SET
  name = newProduct.name,
  stock_quantity = newProduct.stockQuantity
WHERE
  name = actualProductName;


*/
  // dispatch productsSlice productUpdated newProduct
}

async function createProduct(newProduct: Product) {
/*


INSERT INTO
  products (name, stock_quantity)
VALUES
  (newProduct.name, GREATEST(0, newProduct.stockQuantity));


*/
// dispatch productsSlice productAdded newProduct
}

async function fetchProducts() {
  /*


SELECT
  p.id_products,
  p.name AS product_name,
  p.stock_quantity
FROM
  products p;


*/
  // dispatch productsSlice setProducts
}

async function setProductStockQuantity(productId: string, delta: number) {
  // dispatch productsSlice productStockQuantitySetted productId delta
}