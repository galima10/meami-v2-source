import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CookingInfo {
  id: string;
  ingredientName: string;
  preparationTypes: {
    [type: string]: CookingDuration[];
  };
}

export interface CookingDuration {
  id: string;
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
  },
});

export const { setCookingInfos } = cookingInfoSlice.actions;
export default cookingInfoSlice.reducer;
