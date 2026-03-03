import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {}

const initialState = {
  products: [] as Product[],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;
export default productSlice.reducer;
