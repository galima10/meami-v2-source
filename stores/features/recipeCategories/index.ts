import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WithRequiredId } from "@app-types/NameId";
import {
  fetchRecipeCategoriesThunk,
  deleteRecipeCategoryThunk,
  createRecipeCategoryThunk,
} from "@stores/thunks/recipeCategories";

export interface RecipeCategory {
  id?: number;
  name: string;
}

const initialState = {
  recipeCategories: [] as WithRequiredId<RecipeCategory>[],
  loading: false,
  error: null as string | null,
};

export const recipeCategorySlice = createSlice({
  name: "recipeCategories",
  initialState,
  reducers: { resetRecipeCategories: () => initialState },
  extraReducers: (builder) => {
    // fetchRecipeCategoriesThunk
    builder
      .addCase(fetchRecipeCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipeCategoriesThunk.fulfilled,
        (state, action: PayloadAction<WithRequiredId<RecipeCategory>[]>) => {
          state.loading = false;
          if (state.recipeCategories.length === 0) {
            state.recipeCategories = action.payload;
          }
        },
      )
      .addCase(
        fetchRecipeCategoriesThunk.rejected,
        (
          state,
          action: ReturnType<typeof fetchRecipeCategoriesThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // createRecipeCategoryThunk
    builder
      .addCase(createRecipeCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createRecipeCategoryThunk.fulfilled,
        (state, action: PayloadAction<WithRequiredId<RecipeCategory>>) => {
          state.loading = false;

          const exists = state.recipeCategories.some(
            (item) => item.id === action.payload.id,
          );
          if (!exists) state.recipeCategories.push(action.payload);
        },
      )
      .addCase(
        createRecipeCategoryThunk.rejected,
        (
          state,
          action: ReturnType<typeof createRecipeCategoryThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // deleteRecipeCategoryThunk
    builder
      .addCase(deleteRecipeCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteRecipeCategoryThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          const exists = state.recipeCategories.some(
            (item) => item.id === action.payload,
          );
          if (exists) {
            state.recipeCategories = state.recipeCategories.filter(
              (item) => item.id !== action.payload,
            );
          }
        },
      )
      .addCase(
        deleteRecipeCategoryThunk.rejected,
        (
          state,
          action: ReturnType<typeof deleteRecipeCategoryThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const { resetRecipeCategories } = recipeCategorySlice.actions;
export default recipeCategorySlice.reducer;
