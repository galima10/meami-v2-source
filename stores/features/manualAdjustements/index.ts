import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

export interface ManualAdjustementItem {
  id: string;
  name: string;
  unit: string;
  usageCount: number;
  checked: boolean;
}

const initialState = {
  shopping: [] as ManualAdjustementItem[],
  stock: [] as ManualAdjustementItem[],
};

export const manualAdjustementSlice = createSlice({
  name: "manualAdjustements",
  initialState,
  reducers: {
    setManualAdjustements: (
      state,
      action: PayloadAction<{
        ingredients: ManualAdjustementItem[];
        type: "shopping" | "stock";
      }>,
    ) => {
      const { ingredients, type } = action.payload;
      state[type] = ingredients;
    },
    ingredientCheckToggled: (
      state,
      action: PayloadAction<{
        type: "shopping" | "stock";
        ingredientId: string;
        checked: boolean;
      }>,
    ) => {
      const { type, ingredientId, checked } = action.payload;
      const index = state[type].findIndex((item) => item.id === ingredientId);

      if (index !== -1) {
        state[type][index].checked = checked;
      }
    },
  },
});

export const { setManualAdjustements, ingredientCheckToggled } = manualAdjustementSlice.actions;
export default manualAdjustementSlice.reducer;
