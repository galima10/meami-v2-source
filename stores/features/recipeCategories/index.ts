import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RecipeCategory {}

const initialState = {
  recipeCategories: [] as RecipeCategory[],
};

export const recipeCategorySlice = createSlice({
  name: "recipeCategories",
  initialState,
  reducers: {},
});

export const {} = recipeCategorySlice.actions;
export default recipeCategorySlice.reducer;
