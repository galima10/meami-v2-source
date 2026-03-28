import type { SeedRow, WithRequiredId } from "@app-types/NameId";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDaysThunk,
  fetchMenuCategoriesThunk,
  fetchMomentsThunk,
  fetchStorageLocationsThunk,
} from "@stores/thunks/seeds";

interface SeedsInitialState {
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
    // fetchStorageLocationsThunk
    builder
      .addCase(fetchStorageLocationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStorageLocationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.storageLocations.length === 0) {
          state.storageLocations = action.payload;
        }
      })
      .addCase(
        fetchStorageLocationsThunk.rejected,
        (
          state,
          action: ReturnType<typeof fetchStorageLocationsThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // fetchMenuCategoriesThunk
    builder
      .addCase(fetchMenuCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.menuCategories.length === 0) {
          state.menuCategories = action.payload;
        }
      })
      .addCase(
        fetchMenuCategoriesThunk.rejected,
        (
          state,
          action: ReturnType<typeof fetchMenuCategoriesThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // fetchDaysThunk
    builder
      .addCase(fetchDaysThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDaysThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.days.length === 0) {
          state.days = action.payload;
        }
      })
      .addCase(
        fetchDaysThunk.rejected,
        (state, action: ReturnType<typeof fetchDaysThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // fetchMomentsThunk
    builder
      .addCase(fetchMomentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMomentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.moments.length === 0) {
          state.moments = action.payload;
        }
      })
      .addCase(
        fetchMomentsThunk.rejected,
        (state, action: ReturnType<typeof fetchMomentsThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export default seedSlice.reducer;
