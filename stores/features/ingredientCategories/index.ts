import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IngredientCategory {}

const initialState = {
  ingredientCategories: [] as IngredientCategory[],
};

export const ingredientCategoriesSlice = createSlice({
  name: "ingredientCategories",
  initialState,
  reducers: {},
});

export const {} = ingredientCategoriesSlice.actions;
export default ingredientCategoriesSlice.reducer;
