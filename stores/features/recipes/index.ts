import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Recipe {
  id: number;
  name: string;
  recipeType: string;
  duration: number;
  imagePreview: string;
  recipe: string;
  categories: Array<string>;
  isMorning: boolean;
  ingredients: Array<IngredientRecipe>;
}

interface IngredientRecipe {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  menuCategory: string;
}

const initialState = {
  recipes: [] as Recipe[],
  selectedRecipeId: null as number | null,
};

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    recipeAdded: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    recipeDeleted: (state, action: PayloadAction<number>) => {
      const recipeId = action.payload;
      state.recipes = state.recipes.filter((item) => item.id !== recipeId);
    },
    recipeUpdated: (state, action: PayloadAction<Recipe>) => {
      const recipeId = action.payload.id;
      const index = state.recipes.findIndex((item) => item.id === recipeId);

      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
    },
    recipeIdSelected: (state, action: PayloadAction<number | null>) => {
      state.selectedRecipeId = action.payload;
    },
    clearRecipeIdSelected: (state) => {
      state.selectedRecipeId = null;
    },
  },
});

export const {
  setRecipes,
  recipeAdded,
  recipeDeleted,
  recipeUpdated,
  recipeIdSelected,
  clearRecipeIdSelected,
} = recipeSlice.actions;
export default recipeSlice.reducer;
