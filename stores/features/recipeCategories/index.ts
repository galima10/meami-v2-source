import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RecipeCategory {
  id: number;
  name: string;
}

const initialState = {
  recipeCategories: [] as RecipeCategory[],
};

export const recipeCategorySlice = createSlice({
  name: "recipeCategories",
  initialState,
  reducers: {
    setRecipeCategories: (state, action: PayloadAction<RecipeCategory[]>) => {
      state.recipeCategories = action.payload;
    },
    recipeCategoryAdded: (state, action: PayloadAction<RecipeCategory>) => {
      state.recipeCategories.push(action.payload);
    },
    recipeCategoryDeleted: (state, action: PayloadAction<number>) => {
      const recipeCategoryId = action.payload;
      state.recipeCategories = state.recipeCategories.filter(
        (item) => item.id !== recipeCategoryId,
      );
    },
  },
});

export const {
  setRecipeCategories,
  recipeCategoryAdded,
  recipeCategoryDeleted,
} = recipeCategorySlice.actions;
export default recipeCategorySlice.reducer;
