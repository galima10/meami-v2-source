import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CookingUstensil {}

const initialState = {
  cookingUstensils: [] as CookingUstensil[],
};

export const cookingUstensilSlice = createSlice({
  name: "cookingUstensils",
  initialState,
  reducers: {},
});

export const {} = cookingUstensilSlice.actions;
export default cookingUstensilSlice.reducer;
