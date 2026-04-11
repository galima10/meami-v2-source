import type { Product, Products } from "@stores/features/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Operation } from "@app-types/DbQuantity";
import { UpdateQuantityGenericService } from "@services/shared";
import { formatProducts } from "@utils/formatData/formatProducts";
import {
  FetchProductsService,
  UpdateProductService,
  DeleteProductService,
  CreateProductService,
} from "@services/products";

export const fetchProductsThunk = createAsyncThunk<Products, void>(
  "products/fetchProducts",
  async () => {
    const data = await FetchProductsService();
    return formatProducts(data);
  },
);

export const createProductThunk = createAsyncThunk<Products, Product>(
  "products/createProduct",
  async (newProduct) => {
    const createdProduct = await CreateProductService(newProduct);
    return createdProduct;
  },
);

export const deleteProductThunk = createAsyncThunk<number, number>(
  "products/deleteProduct",
  async (productId) => {
    await DeleteProductService(productId);
    return productId;
  },
);

export const updateProductThunk = createAsyncThunk<Products, Products>(
  "products/updateProduct",
  async (newProduct) => {
    await UpdateProductService(newProduct);
    return newProduct;
  },
);

export const setProductStockQuantityThunk = createAsyncThunk<
  {
    itemId: number;
    value: number;
    operation: Operation;
  },
  {
    itemId: number;
    value: number;
    operation: Operation;
  }
>("products/setProductStockQuantity", async ({ itemId, value, operation }) => {
  await UpdateQuantityGenericService(
    "products",
    "stock_quantity",
    "id_products",
    itemId,
    value,
    operation,
  );
  return { itemId, value, operation };
});

function selectProduct(productId: number) {
  // dispatch productsSlice.selectedId productId productIdSelected et clearProductIdSelected avant à faire
}
