import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CookingInfo {
  id: number;
  ingredientName: string;
  preparationTypes: {
    [type: string]: CookingDuration[];
  };
}

interface CookingDuration {
  id: number;
  ustensilName: string;
  duration: number | null;
  temperature: number | null;
}

const initialState = {
  cookingInfos: [] as CookingInfo[],
};

export const cookingInfoSlice = createSlice({
  name: "cookingInfos",
  initialState,
  reducers: {
    setCookingInfos: (state, action: PayloadAction<CookingInfo[]>) => {
      state.cookingInfos = action.payload;
    },
    cookingInfoSetted: (state, action: PayloadAction<CookingInfo>) => {
      const cookingInfoId = action.payload.id;

      const index = state.cookingInfos.findIndex(
        (item) => item.id === cookingInfoId,
      );

      if (index === -1) {
        state.cookingInfos.push(action.payload);
      } else {
        state.cookingInfos[index] = action.payload;
      }
    },
    cookingInfoDeleted: (state, action: PayloadAction<number>) => {
      const ingredientId = action.payload;
      state.cookingInfos = state.cookingInfos.filter(
        (item) => item.id !== ingredientId,
      );
    },
  },
});

export const { setCookingInfos, cookingInfoSetted, cookingInfoDeleted } =
  cookingInfoSlice.actions;
export default cookingInfoSlice.reducer;
