import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WithRequiredId } from "@app-types/NameId";
import {
  fetchProductsThunk,
  createProductThunk,
  deleteProductThunk,
  updateProductThunk,
} from "@stores/thunks/products";

export interface Product {
  id?: number;
  name: string;
  stockQuantity: number;
}

const initialState = {
  products: [] as WithRequiredId<Product>[],
  selectedId: null as number | null,
  loading: false,
  error: null as string | null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productIdSelected: (state, action: PayloadAction<number | null>) => {
      state.selectedId = action.payload;
    },
    clearProductIdSelected: (state) => {
      state.selectedId = null;
    },
    productStockQuantitySetted: (
      state,
      action: PayloadAction<{ ingredientId: number; delta: number }>,
    ) => {
      const { ingredientId, delta } = action.payload;
      const index = state.products.findIndex(
        (item) => item.id === ingredientId,
      );

      if (index !== -1) {
        const newQuantity =
          delta !== -1 && delta !== 1
            ? delta
            : state.products[index].stockQuantity + delta;

        state.products[index] = {
          ...state.products[index],
          stockQuantity: newQuantity,
        };
      }
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
        (state, action: PayloadAction<WithRequiredId<Product>[]>) => {
          state.loading = false;
          if (state.products.length === 0) {
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
        (state, action: PayloadAction<WithRequiredId<Product>>) => {
          state.loading = false;

          const exists = state.products.some(
            (item) => item.id === action.payload.id,
          );
          if (!exists) state.products.push(action.payload);
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
        (state, action: PayloadAction<WithRequiredId<Product>>) => {
          state.loading = false;

          const unitId = action.payload.id;
          const index = state.products.findIndex((item) => item.id === unitId);

          if (index !== -1) {
            state.products[index] = action.payload;
          }
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
          const exists = state.products.some(
            (item) => item.id === action.payload,
          );
          if (exists) {
            state.products = state.products.filter(
              (item) => item.id !== action.payload,
            );
          }
        },
      )
      .addCase(
        deleteProductThunk.rejected,
        (state, action: ReturnType<typeof deleteProductThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const {
  productIdSelected,
  clearProductIdSelected,
  productStockQuantitySetted,
} = productSlice.actions;
export default productSlice.reducer;
