import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInitialDataThunk } from "@stores/thunks/seeds";

export interface SeedRow {
  [seedId: number]: {
    name: string;
  };
}

export interface SeedsInitialState {
  storageLocations: SeedRow;
  menuCategories: SeedRow;
  days: SeedRow;
  moments: SeedRow;
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
  reducers: { resetSeeds: () => initialState },
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
          if (Object.keys(state.menuCategories).length === 0) {
            state.menuCategories = menuCategories;
          }
          if (Object.keys(state.storageLocations).length === 0) {
            state.storageLocations = storageLocations;
          }
          if (Object.keys(state.days).length === 0) {
            state.days = days;
          }
          if (Object.keys(state.moments).length === 0) {
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

export const { resetSeeds } = seedSlice.actions;
export default seedSlice.reducer;
