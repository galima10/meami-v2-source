import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WithRequiredId } from "@app-types/NameId";
import {
  fetchRecipesThunk,
  updateRecipeThunk,
  deleteRecipeThunk,
  createRecipeThunk,
} from "@stores/thunks/recipes";

export interface Recipe {
  id?: number;
  name: string;
  type: RecipeType;
  duration: number;
  imagePreview: string | null;
  recipe: string | null;
  categoryIds: number[];
  isMorning: boolean;
  ingredients: RecipeIngredient[];
}

type RecipeType =
  | "petit-déj."
  | "plat princ."
  | "légumes"
  | "accomp."
  | "dessert";

export interface RecipeIngredient {
  ingredientId: number;
  quantity: number | null;
  unitId: number | null;
  menuCategoryId: number;
}

const initialState = {
  recipes: [] as Recipe[],
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
        (state, action: PayloadAction<WithRequiredId<Recipe>[]>) => {
          state.loading = false;
          if (state.recipes.length === 0) {
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
        (state, action: PayloadAction<WithRequiredId<Recipe>>) => {
          state.loading = false;

          const exists = state.recipes.some(
            (item) => item.id === action.payload.id,
          );
          if (!exists) state.recipes.push(action.payload);
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
        (state, action: PayloadAction<WithRequiredId<Recipe>>) => {
          state.loading = false;

          const recipeId = action.payload.id;
          const index = state.recipes.findIndex((item) => item.id === recipeId);

          if (index !== -1) {
            state.recipes[index] = action.payload;
          }
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
          const exists = state.recipes.some(
            (item) => item.id === action.payload,
          );
          if (exists) {
            state.recipes = state.recipes.filter(
              (item) => item.id !== action.payload,
            );
          }
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
