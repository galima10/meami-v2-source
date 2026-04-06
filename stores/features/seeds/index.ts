import type { SeedRow, WithRequiredId } from "@app-types/NameId";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInitialDataThunk } from "@stores/thunks/seeds";

export interface SeedsInitialState {
  storageLocations: Array<WithRequiredId<SeedRow>>;
  menuCategories: Array<WithRequiredId<SeedRow>>;
  days: Array<WithRequiredId<SeedRow>>;
  moments: Array<WithRequiredId<SeedRow>>;
  loading: boolean;
  error: string | null;
}

const initialState: SeedsInitialState = {
  storageLocations: [],
  menuCategories: [],
  days: [],
  moments: [],
  loading: false,
  error: null,
};

export const seedSlice = createSlice({
  name: "seeds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchInitialDataThunk
    builder
      .addCase(fetchInitialDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInitialDataThunk.fulfilled,
        (
          state,
          action: PayloadAction<Omit<SeedsInitialState, "loading" | "error">>,
        ) => {
          state.loading = false;
          const { storageLocations, days, menuCategories, moments } =
            action.payload;
          if (state.menuCategories.length === 0) {
            state.menuCategories = menuCategories;
          }
          if (state.storageLocations.length === 0) {
            state.storageLocations = storageLocations;
          }
          if (state.days.length === 0) {
            state.days = days;
          }
          if (state.moments.length === 0) {
            state.moments = moments;
          }
        },
      )
      .addCase(
        fetchInitialDataThunk.rejected,
        (state, action: ReturnType<typeof fetchInitialDataThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export default seedSlice.reducer;
