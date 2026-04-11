import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchShoppingManualChecksThunk,
  fetchStockManualChecksThunk,
  setIngredientShoppingCheckThunk,
} from "@stores/thunks/manualAdjustements";

export interface ManualAdjustementItem {
  usageCount: number;
  checked: boolean;
}

export interface ManualAdjustementItems {
  [ingredientId: number]: ManualAdjustementItem;
}

const initialState = {
  shoppingChecks: {} as ManualAdjustementItems,
  stockChecks: {} as ManualAdjustementItems,
  loading: false,
  error: null as string | null,
};

export const manualAdjustementSlice = createSlice({
  name: "manualAdjustements",
  initialState,
  reducers: {
    resetManualAdjustements: () => initialState,
    resetShoppingAdjustements: (state) => {
      state.shoppingChecks = initialState.shoppingChecks;
    },
    resetStockAdjustements: (state) => {
      state.stockChecks = initialState.stockChecks;
    },
  },
  extraReducers: (builder) => {
    // fetchShoppingManualChecksThunk
    builder
      .addCase(fetchShoppingManualChecksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchShoppingManualChecksThunk.fulfilled,
        (state, action: PayloadAction<ManualAdjustementItems>) => {
          state.loading = false;
          if (Object.keys(state.shoppingChecks).length === 0) {
            state.shoppingChecks = action.payload;
          }
        },
      )
      .addCase(
        fetchShoppingManualChecksThunk.rejected,
        (
          state,
          action: ReturnType<typeof fetchShoppingManualChecksThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // fetchStockManualChecksThunk
    builder
      .addCase(fetchStockManualChecksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStockManualChecksThunk.fulfilled,
        (state, action: PayloadAction<ManualAdjustementItems>) => {
          state.loading = false;
          if (Object.keys(state.stockChecks).length === 0) {
            state.stockChecks = action.payload;
          }
        },
      )
      .addCase(
        fetchStockManualChecksThunk.rejected,
        (
          state,
          action: ReturnType<typeof fetchStockManualChecksThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // setIngredientShoppingCheckThunk
    builder
      .addCase(setIngredientShoppingCheckThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setIngredientShoppingCheckThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            ingredientId: number;
            checked: boolean;
            type: "shopping" | "stock";
          }>,
        ) => {
          state.loading = false;

          const { ingredientId, checked, type } = action.payload;
          state[`${type}Checks`][ingredientId].checked = checked;
        },
      )
      .addCase(
        setIngredientShoppingCheckThunk.rejected,
        (
          state,
          action: ReturnType<typeof setIngredientShoppingCheckThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const {
  resetManualAdjustements,
  resetShoppingAdjustements,
  resetStockAdjustements,
} = manualAdjustementSlice.actions;
export default manualAdjustementSlice.reducer;
