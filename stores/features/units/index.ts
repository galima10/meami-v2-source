import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUnitsThunk,
  createUnitThunk,
  updateUnitThunk,
  deleteUnitThunk,
} from "@stores/thunks/units";
import type { WithRequiredId } from "@app-types/NameId";

export interface Unit {
  name: string;
  abbreviation: string;
}

export interface Units {
  [unitId: number]: Unit;
}

const initialState = {
  units: {} as Units,
  loading: false,
  error: null as string | null,
};

export const unitSlice = createSlice({
  name: "units",
  initialState,
  reducers: { resetUnits: () => initialState },
  extraReducers: (builder) => {
    // fetchUnitsThunk
    builder
      .addCase(fetchUnitsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUnitsThunk.fulfilled,
        (state, action: PayloadAction<Units>) => {
          state.loading = false;
          if (Object.keys(state.units).length === 0) {
            state.units = action.payload;
          }
        },
      )
      .addCase(
        fetchUnitsThunk.rejected,
        (state, action: ReturnType<typeof fetchUnitsThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // createUnitThunk
    builder
      .addCase(createUnitThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createUnitThunk.fulfilled,
        (state, action: PayloadAction<Units>) => {
          state.loading = false;

          const [unitIdStr] = Object.keys(action.payload);
          const unittId = Number(unitIdStr);

          state.units[unittId] = action.payload[unittId];
        },
      )
      .addCase(
        createUnitThunk.rejected,
        (state, action: ReturnType<typeof createUnitThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // updateUnitThunk
    builder
      .addCase(updateUnitThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUnitThunk.fulfilled,
        (state, action: PayloadAction<Units>) => {
          state.loading = false;

          const [unitIdStr] = Object.keys(action.payload);
          const unittId = Number(unitIdStr);

          state.units[unittId] = action.payload[unittId];
        },
      )
      .addCase(
        updateUnitThunk.rejected,
        (state, action: ReturnType<typeof updateUnitThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // deleteUnitThunk
    builder
      .addCase(deleteUnitThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteUnitThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          delete state.units[action.payload];
        },
      )
      .addCase(
        deleteUnitThunk.rejected,
        (state, action: ReturnType<typeof deleteUnitThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const { resetUnits } = unitSlice.actions;
export default unitSlice.reducer;
