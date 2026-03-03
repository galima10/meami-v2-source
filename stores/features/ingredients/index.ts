import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ingredient {}

const initialState = {
  ingredients: [] as Ingredient[],
};

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
});

export const {} = ingredientSlice.actions;
export default ingredientSlice.reducer;
