import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Unit {}

const initialState = {
  units: [] as Unit[],
};

export const unitSlice = createSlice({
  name: "units",
  initialState,
  reducers: {},
});

export const {} = unitSlice.actions;
export default unitSlice.reducer;
