import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WithRequiredId } from "@app-types/NameId";
import {
  fetchCookingUstensilsThunk,
  createUstensilThunk,
  deleteUstensilThunk,
} from "@stores/thunks/cookingUstensils";

export interface CookingUstensil {
  id?: number;
  name: string;
}

const initialState = {
  cookingUstensils: [] as WithRequiredId<CookingUstensil>[],
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
        (state, action: PayloadAction<WithRequiredId<CookingUstensil>[]>) => {
          state.loading = false;
          if (state.cookingUstensils.length === 0) {
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
        (state, action: PayloadAction<WithRequiredId<CookingUstensil>>) => {
          state.loading = false;

          const exists = state.cookingUstensils.some(
            (item) => item.id === action.payload.id,
          );
          if (!exists) state.cookingUstensils.push(action.payload);
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
          const exists = state.cookingUstensils.some(
            (item) => item.id === action.payload,
          );
          if (exists) {
            state.cookingUstensils = state.cookingUstensils.filter(
              (item) => item.id !== action.payload,
            );
          }
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
