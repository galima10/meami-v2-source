import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  stockQuantity: number;
}

const initialState = {
  products: [] as Product[],
  selectedId: null as number | null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    productAdded: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    productDeleted: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.products = state.products.filter((item) => item.id !== productId);
    },
    productUpdated: (state, action: PayloadAction<Product>) => {
      const productId = action.payload.id;
      const index = state.products.findIndex((item) => item.id === productId);

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
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
});

export const {
  setProducts,
  productAdded,
  productDeleted,
  productUpdated,
  productIdSelected,
  clearProductIdSelected,
  productStockQuantitySetted,
} = productSlice.actions;
export default productSlice.reducer;
