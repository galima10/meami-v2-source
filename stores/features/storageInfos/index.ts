import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StorageInfo {}

const initialState = {
  storageInfos: [] as StorageInfo[],
};

export const storageInfosSlice = createSlice({
  name: "storageInfos",
  initialState,
  reducers: {},
});

export const {} = storageInfosSlice.actions;
export default storageInfosSlice.reducer;
