import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IngredientCategory {}

const initialState = {
  ingredientCategories: [] as IngredientCategory[],
};

export const ingredientCategorySlice = createSlice({
  name: "ingredientCategories",
  initialState,
  reducers: {},
});

export const {} = ingredientCategorySlice.actions;
export default ingredientCategorySlice.reducer;
