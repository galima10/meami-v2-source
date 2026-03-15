import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ingredient {
  id: number;
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
  selectedId: null as number | null,
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
    ingredientDeleted: (state, action: PayloadAction<number>) => {
      const ingredientId = action.payload;
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== ingredientId,
      );
    },
    ingredientUpdated: (state, action: PayloadAction<Ingredient>) => {
      const ingredientId = action.payload.id;
      const index = state.ingredients.findIndex(
        (item) => item.id === ingredientId,
      );

      if (index !== -1) {
        state.ingredients[index] = action.payload;
      }
    },
    ingredientIdSelected: (state, action: PayloadAction<number | null>) => {
      state.selectedId = action.payload;
    },
    clearIngredientIdSelected: (state) => {
      state.selectedId = null;
    },
    ingredientStockQuantitySetted: (
      state,
      action: PayloadAction<{ ingredientId: number; delta: number }>,
    ) => {
      const { ingredientId, delta } = action.payload;
      const index = state.ingredients.findIndex(
        (item) => item.id === ingredientId,
      );

      if (index !== -1) {
        const newQuantity =
          delta !== -1 && delta !== 1
            ? delta
            : state.ingredients[index].stockQuantity + delta;

        state.ingredients[index] = {
          ...state.ingredients[index],
          stockQuantity: newQuantity,
        };
      }
    },
  },
});

export const {
  setIngredients,
  ingredientAdded,
  ingredientDeleted,
  ingredientUpdated,
  ingredientIdSelected,
  clearIngredientIdSelected,
  ingredientStockQuantitySetted,
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
