import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    createUstensilThunk,
    deleteUstensilThunk,
    fetchCookingUstensilsThunk,
} from "@stores/thunks/cookingUstensils";

export interface CookingUstensil {
  name: string;
}

export interface CookingUstensils {
  [cookingUstensilId: number]: CookingUstensil;
}

const initialState = {
  cookingUstensils: {} as CookingUstensils,
  loading: false,
  error: null as string | null,
};

export const cookingUstensilSlice = createSlice({
  name: "cookingUstensils",
  initialState,
  reducers: {
    resetCookingUstensils: () => initialState,
  },
  extraReducers: (builder) => {
    // fetchCookingUstensilsThunk
    builder
      .addCase(fetchCookingUstensilsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCookingUstensilsThunk.fulfilled,
        (state, action: PayloadAction<CookingUstensils>) => {
          state.loading = false;
          if (Object.keys(state.cookingUstensils).length === 0) {
            state.cookingUstensils = action.payload;
          }
        },
      )
      .addCase(
        fetchCookingUstensilsThunk.rejected,
        (
          state,
          action: ReturnType<typeof fetchCookingUstensilsThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // createUstensilThunk
    builder
      .addCase(createUstensilThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createUstensilThunk.fulfilled,
        (state, action: PayloadAction<CookingUstensils>) => {
          state.loading = false;

          const [cookingUstensilIdStr] = Object.keys(action.payload);
          const cookingUstensilId = Number(cookingUstensilIdStr);

          state.cookingUstensils[cookingUstensilId] =
            action.payload[cookingUstensilId];
        },
      )
      .addCase(
        createUstensilThunk.rejected,
        (state, action: ReturnType<typeof createUstensilThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // deleteUstensilThunk
    builder
      .addCase(deleteUstensilThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteUstensilThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          delete state.cookingUstensils[action.payload];
        },
      )
      .addCase(
        deleteUstensilThunk.rejected,
        (state, action: ReturnType<typeof deleteUstensilThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const { resetCookingUstensils } = cookingUstensilSlice.actions;
export default cookingUstensilSlice.reducer;
