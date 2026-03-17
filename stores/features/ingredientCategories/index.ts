import { createSlice } from "@reduxjs/toolkit";
import {
  fetchIngredientCategoriesThunk,
  createIngredientCategoryThunk,
  deleteIngredientCategoryThunk,
} from "@stores/thunks/ingredientCategories";

export interface IngredientCategory {
  id?: number;
  name: string;
}

const initialState = {
  ingredientCategories: [] as IngredientCategory[],
  loading: false,
  error: null as string | null,
};

export const ingredientCategorySlice = createSlice({
  name: "ingredientCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchIngredientCategoriesThunk
    builder
      .addCase(fetchIngredientCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredientCategories = action.payload;
      })
      .addCase(fetchIngredientCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erreur inconnue";
      });

    // createIngredientCategoryThunk
    builder
      .addCase(createIngredientCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIngredientCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredientCategories.push(action.payload);
      })
      .addCase(createIngredientCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erreur inconnue";
      });

    // deleteIngredientCategoryThunk
    builder
      .addCase(deleteIngredientCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIngredientCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredientCategories = state.ingredientCategories.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(
        deleteIngredientCategoryThunk.rejected,
        (
          state,
          action: ReturnType<typeof deleteIngredientCategoryThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export default ingredientCategorySlice.reducer;
