import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StorageInfo {}

const initialState = {
  storageInfos: [] as StorageInfo[],
};

export const storageInfoSlice = createSlice({
  name: "storageInfos",
  initialState,
  reducers: {},
});

export const {} = storageInfoSlice.actions;
export default storageInfoSlice.reducer;
