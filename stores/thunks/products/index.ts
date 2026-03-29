import type { Product } from "@stores/features/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { WithRequiredId } from "@app-types/NameId";
import { formatProducts } from "@utils/formatData/formatProducts";
import {
  FetchProductsService,
  UpdateProductService,
  DeleteProductService,
  CreateProductService,
} from "@services/products";

export const fetchProductsThunk = createAsyncThunk<
  WithRequiredId<Product>[],
  void
>("products/fetchProducts", async () => {
  const data = await FetchProductsService();
  return formatProducts(data);
});

export const createProductThunk = createAsyncThunk<
  WithRequiredId<Product>,
  Product
>("products/createProduct", async (newProduct: Product) => {
  const createdProduct = await CreateProductService(newProduct);
  return createdProduct;
});

export const deleteProductThunk = createAsyncThunk<number, number>(
  "products/deleteProduct",
  async (productId: number) => {
    await DeleteProductService(productId);
    return productId;
  },
);

export const updateProductThunk = createAsyncThunk<
  WithRequiredId<Product>,
  WithRequiredId<Product>
>("products/updateProduct", async (newProduct: WithRequiredId<Product>) => {
  await UpdateProductService(newProduct);
  return newProduct;
});

function selectProduct(productId: number) {
  // dispatch productsSlice.selectedId productId productIdSelected et clearProductIdSelected avant à faire
}

async function setProductStockQuantity(productId: string, delta: number) {
  // dispatch productsSlice productStockQuantitySetted productId delta
}
