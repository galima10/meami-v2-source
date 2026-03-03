import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CookingUstensil {}

const initialState = {
  cookingUstensils: [] as CookingUstensil[],
};

export const cookingUstensilsSlice = createSlice({
  name: "cookingUstensils",
  initialState,
  reducers: {},
});

export const {} = cookingUstensilsSlice.actions;
export default cookingUstensilsSlice.reducer;
