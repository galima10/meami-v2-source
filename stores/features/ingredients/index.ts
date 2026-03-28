import type { SeedRow, WithRequiredId } from "@app-types/NameId";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IngredientCategory } from "../ingredientCategories";
import type { Unit } from "../units";

export interface Ingredient {
  id?: number;
  name: string;
  category: WithRequiredId<IngredientCategory>;
  stockQuantity: number;
  unit: WithRequiredId<Unit>;
  menuCategories: WithRequiredId<SeedRow>[];
  quantifiable: boolean;
  storageLocations: WithRequiredId<SeedRow>[];
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
