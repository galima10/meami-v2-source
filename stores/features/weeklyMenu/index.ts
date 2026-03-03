import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WeeklyMenuIngredient {}

const initialState = {
  weeklyMenu: [] as WeeklyMenuIngredient[],
};

export const weeklyMenuSlice = createSlice({
  name: "weeklyMenu",
  initialState,
  reducers: {},
});

export const {} = weeklyMenuSlice.actions;
export default weeklyMenuSlice.reducer;
