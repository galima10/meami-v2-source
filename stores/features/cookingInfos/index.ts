import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CookingInfo {}

const initialState = {
  cookingInfos: [] as CookingInfo[],
};

export const cookingInfosSlice = createSlice({
  name: "cookingInfos",
  initialState,
  reducers: {},
});

export const {} = cookingInfosSlice.actions;
export default cookingInfosSlice.reducer;
