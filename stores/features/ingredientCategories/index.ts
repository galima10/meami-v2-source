import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchIngredientCategoriesThunk,
  createIngredientCategoryThunk,
  deleteIngredientCategoryThunk,
} from "@stores/thunks/ingredientCategories";
import type { WithRequiredId } from "@app-types/NameId";

export interface IngredientCategory {
  id?: number;
  name: string;
}

const initialState = {
  ingredientCategories: [] as WithRequiredId<IngredientCategory>[],
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
      .addCase(
        fetchIngredientCategoriesThunk.fulfilled,
        (
          state,
          action: PayloadAction<WithRequiredId<IngredientCategory>[]>,
        ) => {
          state.loading = false;
          if (state.ingredientCategories.length === 0) {
            state.ingredientCategories = action.payload;
            
          }
        },
      )
      .addCase(
        fetchIngredientCategoriesThunk.rejected,
        (
          state,
          action: ReturnType<typeof fetchIngredientCategoriesThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // createIngredientCategoryThunk
    builder
      .addCase(createIngredientCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createIngredientCategoryThunk.fulfilled,
        (state, action: PayloadAction<WithRequiredId<IngredientCategory>>) => {
          state.loading = false;

          const exists = state.ingredientCategories.some(
            (item) => item.id === action.payload.id,
          );
          if (!exists) state.ingredientCategories.push(action.payload);
        },
      )
      .addCase(
        createIngredientCategoryThunk.rejected,
        (
          state,
          action: ReturnType<typeof createIngredientCategoryThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // deleteIngredientCategoryThunk
    builder
      .addCase(deleteIngredientCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteIngredientCategoryThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          const exists = state.ingredientCategories.some(
            (item) => item.id === action.payload,
          );
          if (exists) {
            state.ingredientCategories = state.ingredientCategories.filter(
              (item) => item.id !== action.payload,
            );
          }
        },
      )
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
