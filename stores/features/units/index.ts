import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Unit {}

const initialState = {
  units: [] as Unit[],
};

export const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {},
});

export const {} = unitsSlice.actions;
export default unitsSlice.reducer;
