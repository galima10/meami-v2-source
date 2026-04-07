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
  name: string;
  categoryId: number;
  stockQuantity: number;
  unitId: number;
  menuCategoryIds: number[];
  quantifiable: boolean;
  storageLocationIds: number[] | null;
}

export interface Ingredients {
  [ingredientId: number]: Ingredient;
}

const initialState = {
  ingredients: {} as Ingredients,
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
    // ingredientStockQuantitySetted: (
    //   state,
    //   action: PayloadAction<{ ingredientId: number; delta: number }>,
    // ) => {
    //   const { ingredientId, delta } = action.payload;
    //   const index = state.ingredients.findIndex(
    //     (item) => item.id === ingredientId,
    //   );

    //   const ingredient = state.ingredients[ingredientId];

    //   if (index !== -1) {
    //     const newQuantity =
    //       delta !== -1 && delta !== 1
    //         ? delta
    //         : state.ingredients[index].stockQuantity + delta;

    //     state.ingredients[index] = {
    //       ...state.ingredients[index],
    //       stockQuantity: newQuantity,
    //     };
    //   }
    // },
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
        (state, action: PayloadAction<Ingredients>) => {
          state.loading = false;
          if (Object.values(state.ingredients).length === 0) {
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
        (state, action: PayloadAction<Ingredients>) => {
          state.loading = false;

          const [ingredientIdStr] = Object.keys(action.payload);
          const ingredientId = Number(ingredientIdStr);

          state.ingredients[ingredientId] = action.payload[ingredientId];
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
        (state, action: PayloadAction<Ingredients>) => {
          state.loading = false;

          const [ingredientIdStr] = Object.keys(action.payload);
          const ingredientId = Number(ingredientIdStr);

          state.ingredients[ingredientId] = action.payload[ingredientId];
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

          const { ingredientId, newStorageLocationsIds } = action.payload;

          state.ingredients[ingredientId].storageLocationIds =
            newStorageLocationsIds;
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
          const { ingredientId, newQuantifiable } = action.payload;

          state.ingredients[ingredientId].quantifiable = newQuantifiable;
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
          delete state.ingredients[action.payload];
        },
      )
      .addCase(
        deleteIngredientThunk.rejected,
        (state, action: ReturnType<typeof deleteIngredientThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      )

      // updateStockThunk
      .addCase(
        updateStockThunk.fulfilled,
        (state, action: PayloadAction<Ingredients>) => {
          state.loading = false;

          const updatedIngredients = action.payload;

          for (const ingredientIdStr of Object.keys(updatedIngredients)) {
            const ingredientId = Number(ingredientIdStr);
            const updated = updatedIngredients[ingredientId];

            const existing = state.ingredients[ingredientId];
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

export const {
  selectIngredientId,
  clearIngredientIdSelected,
  resetIngredients,
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
