import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Operation } from "@app-types/DbQuantity";
import {
  fetchProductsThunk,
  createProductThunk,
  deleteProductThunk,
  updateProductThunk,
  setProductStockQuantityThunk,
} from "@stores/thunks/products";
import { applyOperation } from "@utils/applyOperation";

export interface Product {
  name: string;
  stockQuantity: number;
}

export interface Products {
  [productId: number]: Product;
}

const initialState = {
  products: {} as Products,
  selectedId: null as number | null,
  loading: false,
  error: null as string | null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: () => initialState,
    productIdSelected: (state, action: PayloadAction<number | null>) => {
      state.selectedId = action.payload;
    },
    clearProductIdSelected: (state) => {
      state.selectedId = null;
    },
  },
  extraReducers: (builder) => {
    // fetchProductsThunk
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsThunk.fulfilled,
        (state, action: PayloadAction<Products>) => {
          state.loading = false;
          if (Object.keys(state.products).length === 0) {
            state.products = action.payload;
          }
        },
      )
      .addCase(
        fetchProductsThunk.rejected,
        (state, action: ReturnType<typeof fetchProductsThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // createProductThunk
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProductThunk.fulfilled,
        (state, action: PayloadAction<Products>) => {
          state.loading = false;

          const [productIdStr] = Object.keys(action.payload);
          const productId = Number(productIdStr);

          state.products[productId] = action.payload[productId];
        },
      )
      .addCase(
        createProductThunk.rejected,
        (state, action: ReturnType<typeof createProductThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // updateProductThunk
    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProductThunk.fulfilled,
        (state, action: PayloadAction<Products>) => {
          state.loading = false;

          const [productIdStr] = Object.keys(action.payload);
          const productId = Number(productIdStr);

          state.products[productId] = action.payload[productId];
        },
      )
      .addCase(
        updateProductThunk.rejected,
        (state, action: ReturnType<typeof updateProductThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // deleteProductThunk
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProductThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          delete state.products[action.payload];
        },
      )
      .addCase(
        deleteProductThunk.rejected,
        (state, action: ReturnType<typeof deleteProductThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // setProductStockQuantityThunk
    builder
      .addCase(setProductStockQuantityThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setProductStockQuantityThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            itemId: number;
            value: number;
            operation: Operation;
          }>,
        ) => {
          state.loading = false;

          const { itemId, value, operation } = action.payload;
          const product = state.products[itemId];
          if (!product) return;
          product.stockQuantity = applyOperation(
            product.stockQuantity,
            value,
            operation,
          );
        },
      )
      .addCase(
        setProductStockQuantityThunk.rejected,
        (
          state,
          action: ReturnType<typeof setProductStockQuantityThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const { productIdSelected, clearProductIdSelected, resetProducts } =
  productSlice.actions;
export default productSlice.reducer;
