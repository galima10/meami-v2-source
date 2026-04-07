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

export interface IngredientCategories {
  [ingredientCategoryId: number]: IngredientCategory;
}

const initialState = {
  ingredientCategories: {} as IngredientCategories,
  loading: false,
  error: null as string | null,
};

export const ingredientCategorySlice = createSlice({
  name: "ingredientCategories",
  initialState,
  reducers: {
    resetIngredientCategories: () => initialState,
  },
  extraReducers: (builder) => {
    // fetchIngredientCategoriesThunk
    builder
      .addCase(fetchIngredientCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredientCategoriesThunk.fulfilled,
        (state, action: PayloadAction<IngredientCategories>) => {
          state.loading = false;
          if (Object.keys(state.ingredientCategories).length === 0) {
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
        (state, action: PayloadAction<IngredientCategories>) => {
          state.loading = false;

          const [ingredientCategoryIdStr] = Object.keys(action.payload);
          const ingredientCategoryId = Number(ingredientCategoryIdStr);

          state.ingredientCategories[ingredientCategoryId] =
            action.payload[ingredientCategoryId];
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
          delete state.ingredientCategories[action.payload];
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

export const { resetIngredientCategories } = ingredientCategorySlice.actions;
export default ingredientCategorySlice.reducer;
