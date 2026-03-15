import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IngredientCategory {
  id: number;
  name: string;
}

const initialState = {
  ingredientCategories: [] as IngredientCategory[],
};

export const ingredientCategorySlice = createSlice({
  name: "ingredientCategories",
  initialState,
  reducers: {
    setIngredientCategories: (
      state,
      action: PayloadAction<IngredientCategory[]>,
    ) => {
      state.ingredientCategories = action.payload;
    },
    ingredientCategoryAdded: (
      state,
      action: PayloadAction<IngredientCategory>,
    ) => {
      state.ingredientCategories.push(action.payload);
    },
    ingredientCategoryDeleted: (state, action: PayloadAction<number>) => {
      const ingredientCategoryId = action.payload;
      state.ingredientCategories = state.ingredientCategories.filter(
        (item) => item.id !== ingredientCategoryId,
      );
    },
  },
});

export const { setIngredientCategories, ingredientCategoryAdded, ingredientCategoryDeleted } = ingredientCategorySlice.actions;
export default ingredientCategorySlice.reducer;
