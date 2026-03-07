import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  stockQuantity: number;
}

const initialState = {
  products: [] as Product[],
  selectedId: null as string | null,
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
    productDeleted: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.products = state.products.filter((item) => item.id !== productId);
    },
    productUpdated: (state, action: PayloadAction<Product>) => {
      const productId = action.payload.id;
      state.products = state.products.map((item) => {
        if (item.id === productId) return action.payload;
        else return item;
      });
    },
    productIdSelected: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
    clearProductIdSelected: (state) => {
      state.selectedId = null;
    },
    productStockQuantitySetted: (
      state,
      action: PayloadAction<{ ingredientId: string; delta: number }>,
    ) => {
      const { ingredientId, delta } = action.payload;
      state.products = state.products.map((item) => {
        if (item.id === ingredientId) {
          return {
            ...item,
            stockQuantity:
              delta !== -1 && delta !== 1 ? delta : item.stockQuantity + delta,
          };
        } else return item;
      });
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
  productStockQuantitySetted
} = productSlice.actions;
export default productSlice.reducer;
