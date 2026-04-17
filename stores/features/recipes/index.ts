import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    createRecipeThunk,
    deleteRecipeThunk,
    fetchRecipesThunk,
    updateRecipeThunk,
} from "@stores/thunks/recipes";

export interface Recipe {
  name: string;
  type: RecipeType;
  duration: number;
  imagePreview: string | null;
  recipe: string | null;
  categoryIds: number[];
  isMorning: boolean;
  ingredients: RecipeIngredient[];
}

export interface Recipes {
  [recipeId: number]: Recipe;
}

export type RecipeType =
  | "petit-déj."
  | "plat princ."
  | "légumes"
  | "accomp."
  | "dessert";

export interface RecipeIngredient {
  ingredientId: number;
  quantity: number;
  unitId: number;
  menuCategoryId: number;
}

const initialState = {
  recipes: {} as Recipes,
  selectedRecipeId: null as number | null,
  loading: false,
  error: null as string | null,
};

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    resetRecipes: () => initialState,
    recipeIdSelected: (state, action: PayloadAction<number | null>) => {
      state.selectedRecipeId = action.payload;
    },
    clearRecipeIdSelected: (state) => {
      state.selectedRecipeId = null;
    },
  },
  extraReducers: (builder) => {
    // fetchRecipesThunk
    builder
      .addCase(fetchRecipesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipesThunk.fulfilled,
        (state, action: PayloadAction<Recipes>) => {
          state.loading = false;
          if (Object.keys(state.recipes).length === 0) {
            state.recipes = action.payload;
          }
        },
      )
      .addCase(
        fetchRecipesThunk.rejected,
        (state, action: ReturnType<typeof fetchRecipesThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // createRecipeThunk
    builder
      .addCase(createRecipeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createRecipeThunk.fulfilled,
        (state, action: PayloadAction<Recipes>) => {
          state.loading = false;

          const [recipeIdStr] = Object.keys(action.payload);
          const recipeId = Number(recipeIdStr);

          state.recipes[recipeId] = action.payload[recipeId];
        },
      )
      .addCase(
        createRecipeThunk.rejected,
        (state, action: ReturnType<typeof createRecipeThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // updateRecipeThunk
    builder
      .addCase(updateRecipeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateRecipeThunk.fulfilled,
        (state, action: PayloadAction<Recipes>) => {
          state.loading = false;

          const [recipeIdStr] = Object.keys(action.payload);
          const recipeId = Number(recipeIdStr);

          state.recipes[recipeId] = action.payload[recipeId];
        },
      )
      .addCase(
        updateRecipeThunk.rejected,
        (state, action: ReturnType<typeof updateRecipeThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // deleteRecipeThunk
    builder
      .addCase(deleteRecipeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteRecipeThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          delete state.recipes[action.payload];
        },
      )
      .addCase(
        deleteRecipeThunk.rejected,
        (state, action: ReturnType<typeof deleteRecipeThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const { recipeIdSelected, clearRecipeIdSelected, resetRecipes } =
  recipeSlice.actions;
export default recipeSlice.reducer;
