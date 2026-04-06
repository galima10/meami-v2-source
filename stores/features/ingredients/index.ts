import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WithRequiredId } from "@app-types/NameId";
import {
  fetchIngredientsThunk,
  createIngredientThunk,
  updateIngredientThunk,
  updateStockThunk,
  updateStorageLocationsThunk,
  setQuantifiableThunk,
  deleteIngredientThunk,
} from "@stores/thunks/ingredients";

export interface Ingredient {
  id?: number;
  name: string;
  categoryId: number;
  stockQuantity: number;
  unitId: number;
  menuCategoryIds: number[];
  quantifiable: boolean;
  storageLocationIds: number[] | null;
}

const initialState = {
  ingredients: [] as WithRequiredId<Ingredient>[],
  selectedId: null as number | null,
  loading: false,
  error: null as string | null,
};

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    resetIngredients: () => initialState,
    selectIngredientId: (state, action: PayloadAction<number | null>) => {
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
  extraReducers: (builder) => {
    // fetchIngredientsThunk
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredientsThunk.fulfilled,
        (state, action: PayloadAction<WithRequiredId<Ingredient>[]>) => {
          state.loading = false;
          if (state.ingredients.length === 0) {
            state.ingredients = action.payload;
          }
        },
      )
      .addCase(
        fetchIngredientsThunk.rejected,
        (state, action: ReturnType<typeof fetchIngredientsThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // createIngredientThunk
    builder
      .addCase(createIngredientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createIngredientThunk.fulfilled,
        (state, action: PayloadAction<WithRequiredId<Ingredient>>) => {
          state.loading = false;

          const exists = state.ingredients.some(
            (item) => item.id === action.payload.id,
          );
          if (!exists) state.ingredients.push(action.payload);
        },
      )
      .addCase(
        createIngredientThunk.rejected,
        (state, action: ReturnType<typeof createIngredientThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // updateIngredientThunk
    builder
      .addCase(updateIngredientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateIngredientThunk.fulfilled,
        (state, action: PayloadAction<WithRequiredId<Ingredient>>) => {
          state.loading = false;

          const ingredientId = action.payload.id;
          const index = state.ingredients.findIndex(
            (item) => item.id === ingredientId,
          );

          if (index !== -1) {
            state.ingredients[index] = action.payload;
          }
        },
      )
      .addCase(
        updateIngredientThunk.rejected,
        (state, action: ReturnType<typeof updateIngredientThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // updateStorageLocationsThunk
    builder
      .addCase(updateStorageLocationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateStorageLocationsThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            ingredientId: number;
            newStorageLocationsIds: number[];
          }>,
        ) => {
          state.loading = false;

          const ingredientId = action.payload.ingredientId;
          const index = state.ingredients.findIndex(
            (item) => item.id === ingredientId,
          );

          if (index !== -1) {
            state.ingredients[index].storageLocationIds =
              action.payload.newStorageLocationsIds;
          }
        },
      )
      .addCase(
        updateStorageLocationsThunk.rejected,
        (
          state,
          action: ReturnType<typeof updateStorageLocationsThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // setQuantifiableThunk
    builder
      .addCase(setQuantifiableThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setQuantifiableThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            ingredientId: number;
            newQuantifiable: boolean;
          }>,
        ) => {
          state.loading = false;

          const ingredientId = action.payload.ingredientId;
          const index = state.ingredients.findIndex(
            (item) => item.id === ingredientId,
          );

          if (index !== -1) {
            state.ingredients[index].quantifiable =
              action.payload.newQuantifiable;
          }
        },
      )
      .addCase(
        setQuantifiableThunk.rejected,
        (state, action: ReturnType<typeof setQuantifiableThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // deleteIngredientThunk
    builder
      .addCase(deleteIngredientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteIngredientThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          const exists = state.ingredients.some(
            (item) => item.id === action.payload,
          );
          if (exists) {
            state.ingredients = state.ingredients.filter(
              (item) => item.id !== action.payload,
            );
          }
        },
      )
      .addCase(
        deleteIngredientThunk.rejected,
        (state, action: ReturnType<typeof deleteIngredientThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // updateStockThunk
    builder
      .addCase(updateStockThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateStockThunk.fulfilled,
        (state, action: PayloadAction<WithRequiredId<Ingredient>[]>) => {
          state.loading = false;

          const map = new Map(state.ingredients.map((i) => [i.id, i]));

          for (const updated of action.payload) {
            const existing = map.get(updated.id);

            if (existing && existing.stockQuantity !== updated.stockQuantity) {
              existing.stockQuantity = updated.stockQuantity;
            }
          }
        },
      )
      .addCase(
        updateStockThunk.rejected,
        (state, action: ReturnType<typeof updateStockThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const { selectIngredientId, clearIngredientIdSelected, resetIngredients } =
  ingredientSlice.actions;
export default ingredientSlice.reducer;
