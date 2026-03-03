import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Recipe {}

const initialState = {
  recipes: [] as Recipe[],
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
});

export const {} = recipesSlice.actions;
export default recipesSlice.reducer;
