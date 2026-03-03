import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ManualAdjustement {}

const initialState = {
  manualAdjustements: [] as ManualAdjustement[],
};

export const manualAdjustementsSlice = createSlice({
  name: "manualAdjustements",
  initialState,
  reducers: {},
});

export const {} = manualAdjustementsSlice.actions;
export default manualAdjustementsSlice.reducer;
