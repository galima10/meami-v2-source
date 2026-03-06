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
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients.list = action.payload;
    },
    ingredientAdded: (state, action: PayloadAction<Ingredient>) => {
      state.ingredients.list.push(action.payload);
    },
    ingredientDeleted: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      state.ingredients.list = state.ingredients.list.filter(
        (item) => item.id !== ingredientId,
      );
    },
    ingredientUpdated: (state, action: PayloadAction<Ingredient>) => {
      const ingredientId = action.payload.id;
      state.ingredients.list = state.ingredients.list.map((item) => {
        if (item.id == ingredientId) return action.payload;
        else return item;
      });
    },
    selectIngredientId: (state, action: PayloadAction<SelectedId>) => {
      state.ingredients.selectedId = action.payload;
    },
    clearIngredientSelectedId: (state) => {
      state.ingredients.selectedId = null;
    },
  },
});

export const {
  setIngredients,
  selectIngredientId,
  clearIngredientSelectedId,
  ingredientAdded,
  ingredientDeleted,
  ingredientUpdated
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
