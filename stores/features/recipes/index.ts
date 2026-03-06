import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Recipe {
  id: string;
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
  id: string;
  name: string;
  quantity: number;
  unit: string;
  menuCategory: string;
}

const initialState = {
  recipes: [] as Recipe[],
  selectedRecipeId: null as string | null,
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
    recipeDeleted: (state, action: PayloadAction<string>) => {
      const recipeId = action.payload;
      state.recipes = state.recipes.filter((item) => item.id !== recipeId);
    },
    recipeUpdated: (state, action: PayloadAction<Recipe>) => {
      const recipeId = action.payload.id;
      state.recipes = state.recipes.map((item) => {
        if (item.id === recipeId) return action.payload;
        else return item;
      });
    },
    recipeIdSelected: (state, action: PayloadAction<string | null>) => {
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
