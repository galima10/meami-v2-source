import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  stockQuantity: number;
  unit: string;
  menuCategories: Array<string>;
  quantifiable: boolean;
  storageLocations: Array<string>;
}

const initialState = {
  ingredients: [] as Ingredient[],
};

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload;
    },
    ingredientAdded: (state, action: PayloadAction<Ingredient>) => {
      state.ingredients.push(action.payload);
    },
    ingredientDeleted: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== ingredientId,
      );
    },
    ingredientUpdated: (state, action: PayloadAction<Ingredient>) => {
      const ingredientId = action.payload.id;
      state.ingredients = state.ingredients.map(item => {
        if (item.id === ingredientId) return action.payload;
        else return item;
      });
    },
  },
});

export const {
  setIngredients,
  ingredientAdded,
  ingredientDeleted,
  ingredientUpdated,
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
