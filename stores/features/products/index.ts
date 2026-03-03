import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {}

const initialState = {
  products: [] as Product[],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
