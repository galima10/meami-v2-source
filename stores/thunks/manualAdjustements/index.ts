import { formatManualAdjustements } from "@mappers/formatData/formatManualAdjustements";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    FetchShoppingManualChecksService,
    FetchStockManualChecksService,
    SetIngredientShoppingCheckService,
    SetIngredientStockCheckService,
} from "@services/manualAdjustements";
import { ManualAdjustementItems } from "@stores/features/manualAdjustements";

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

export const setIngredientCheckThunk = createAsyncThunk<
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
  "manualAdjustements/setIngredientCheck",
  async ({ ingredientId, checked, type }) => {
    if (type === "shopping")
      await SetIngredientShoppingCheckService(ingredientId, checked);
    else await SetIngredientStockCheckService(ingredientId, checked);
    return { ingredientId, checked, type };
  },
);
