import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  setCookingInfoThunk,
  fetchCookingInfosThunk,
  removeCookingInfoThunk,
} from "@stores/thunks/cookingInfos";

export interface CookingInfo {
  cookingInfoId: number;
  ingredientId: number;
  ingredientName: string;
  preparationTypes: {
    name: string;
    cookingDurations: CookingDuration[];
  }[];
}

export interface CookingDuration {
  ustensilName: string;
  duration: number | null;
  temperature: number | null;
}

interface InitialState {
  cookingInfos: CookingInfo[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  cookingInfos: [],
  loading: false,
  error: null as string | null,
};

export const cookingInfoSlice = createSlice({
  name: "cookingInfos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCookingInfosThunk
    builder
      .addCase(fetchCookingInfosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCookingInfosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cookingInfos = action.payload;
      })
      .addCase(fetchCookingInfosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erreur inconnue";
      });

    // setCookingInfoThunk
    builder
      .addCase(setCookingInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setCookingInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cookingInfos.findIndex(
          (item) => item.ingredientId === action.payload.ingredientId,
        );
        if (index === -1) state.cookingInfos.push(action.payload);
        else state.cookingInfos[index] = action.payload;
      })
      .addCase(setCookingInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erreur inconnue";
      });

    // removeCookingInfoThunk
    builder
      .addCase(removeCookingInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCookingInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cookingInfos = state.cookingInfos.filter(
          (item) => item.ingredientId !== action.payload,
        );
      })
      .addCase(
        removeCookingInfoThunk.rejected,
        (state, action: ReturnType<typeof removeCookingInfoThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export default cookingInfoSlice.reducer;
