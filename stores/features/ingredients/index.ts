import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ingredient {}

const initialState = {
  ingredients: [] as Ingredient[],
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
});

export const {} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
