import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CookingUstensil {
  id: number;
  name: string;
}

const initialState = {
  cookingUstensils: [] as CookingUstensil[],
};

export const cookingUstensilSlice = createSlice({
  name: "cookingUstensils",
  initialState,
  reducers: {
    setCookingUstensils: (state, action: PayloadAction<CookingUstensil[]>) => {
      state.cookingUstensils = action.payload;
    },
    cookingUstensilAdded: (state, action: PayloadAction<CookingUstensil>) => {
      state.cookingUstensils.push(action.payload);
    },
    cookingUstensilDeleted: (state, action: PayloadAction<number>) => {
      const cookingUstensilId = action.payload;
      state.cookingUstensils = state.cookingUstensils.filter(
        (item) => item.id !== cookingUstensilId,
      );
    },
  },
});

export const {
  setCookingUstensils,
  cookingUstensilAdded,
  cookingUstensilDeleted,
} = cookingUstensilSlice.actions;
export default cookingUstensilSlice.reducer;
