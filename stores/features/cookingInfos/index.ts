import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CookingInfo {}

const initialState = {
  cookingInfos: [] as CookingInfo[],
};

export const cookingInfoSlice = createSlice({
  name: "cookingInfos",
  initialState,
  reducers: {},
});

export const {} = cookingInfoSlice.actions;
export default cookingInfoSlice.reducer;
