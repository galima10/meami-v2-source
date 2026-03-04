import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  stockQuantity: number;
  unit: string;
  menuCategories: string[];
}

type SelectedId = null | string;

const initialState = {
  ingredients: {
    list: [] as Ingredient[],
    selectedId: null as SelectedId,
  },
};

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    ingredientsUpdated: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients.list = action.payload;
    },
    selectIngredient: (state, action: PayloadAction<SelectedId>) => {
      state.ingredients.selectedId = action.payload;
    }
  },
});

export const { ingredientsUpdated } = ingredientSlice.actions;
export default ingredientSlice.reducer;
