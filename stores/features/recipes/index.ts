import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Recipe {}

const initialState = {
  recipes: [] as Recipe[],
};

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
});

export const {} = recipeSlice.actions;
export default recipeSlice.reducer;
