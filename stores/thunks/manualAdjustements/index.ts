import { ManualAdjustementItems } from "@stores/features/manualAdjustements";
import { formatManualAdjustements } from "@utils/formatData/formatManualAdjustements";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchShoppingManualChecksService,
  FetchStockManualChecksService,
  SetIngredientShoppingCheckService,
  SetIngredientStockCheckService,
} from "@services/manualAdjustements";

export const fetchShoppingManualChecksThunk = createAsyncThunk<
  ManualAdjustementItems,
  void
>("manualAdjustements/fetchShoppingManualChecks", async () => {
  const data = await FetchShoppingManualChecksService();
  return formatManualAdjustements(data);
});

export const fetchStockManualChecksThunk = createAsyncThunk<
  ManualAdjustementItems,
  void
>("manualAdjustements/fetchStockManualChecks", async () => {
  const data = await FetchStockManualChecksService();
  return formatManualAdjustements(data);
});

export const setIngredientShoppingCheckThunk = createAsyncThunk<
  {
    ingredientId: number;
    checked: boolean;
    type: "shopping" | "stock";
  },
  {
    ingredientId: number;
    checked: boolean;
    type: "shopping" | "stock";
  }
>(
  "manualAdjustements/setIngredientShoppingCheck",
  async ({ ingredientId, checked, type }) => {
    if (type === "shopping")
      await SetIngredientShoppingCheckService(ingredientId, checked);
    else await SetIngredientStockCheckService(ingredientId, checked);
    return { ingredientId, checked, type };
  },
);
