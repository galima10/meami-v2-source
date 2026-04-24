import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInitialDataThunk } from "@stores/thunks/seeds";

export interface SeedRow {
  [seedId: number]: {
    name: string;
  };
}

export interface Seeds {
  storageLocations: SeedRow;
  menuCategories: SeedRow;
  days: SeedRow;
  moments: SeedRow;
}

const initialState = {
  storageLocations: {} as SeedRow,
  menuCategories: {} as SeedRow,
  days: {} as SeedRow,
  moments: {} as SeedRow,
  loading: false,
  error: null as string | null,
  hasLoaded: false,
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
        (state, action: PayloadAction<Seeds>) => {
          state.loading = false;
          const { storageLocations, days, menuCategories, moments } =
            action.payload;
          state.menuCategories = menuCategories;
          state.storageLocations = storageLocations;
          state.days = days;
          state.moments = moments;
          state.hasLoaded = true;
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
