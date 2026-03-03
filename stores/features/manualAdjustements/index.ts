import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ManualAdjustement {}

const initialState = {
  manualAdjustements: [] as ManualAdjustement[],
};

export const manualAdjustementSlice = createSlice({
  name: "manualAdjustements",
  initialState,
  reducers: {},
});

export const {} = manualAdjustementSlice.actions;
export default manualAdjustementSlice.reducer;
