import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RecipeCategory {}

const initialState = {
  recipeCategories: [] as RecipeCategory[],
};

export const recipeCategoriesSlice = createSlice({
  name: "recipeCategories",
  initialState,
  reducers: {},
});

export const {} = recipeCategoriesSlice.actions;
export default recipeCategoriesSlice.reducer;
