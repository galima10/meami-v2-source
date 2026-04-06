import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUnitsThunk,
  createUnitThunk,
  updateUnitThunk,
  deleteUnitThunk,
} from "@stores/thunks/units";
import type { WithRequiredId } from "@app-types/NameId";

export interface Unit {
  id?: number;
  name: string;
  abbreviation: string;
}

const initialState = {
  units: [] as WithRequiredId<Unit>[],
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
        (state, action: PayloadAction<WithRequiredId<Unit>[]>) => {
          state.loading = false;
          if (state.units.length === 0) {
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
        (state, action: PayloadAction<WithRequiredId<Unit>>) => {
          state.loading = false;

          const exists = state.units.some(
            (item) => item.id === action.payload.id,
          );
          if (!exists) state.units.push(action.payload);
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
        (state, action: PayloadAction<WithRequiredId<Unit>>) => {
          state.loading = false;

          const unitId = action.payload.id;
          const index = state.units.findIndex((item) => item.id === unitId);

          if (index !== -1) {
            state.units[index] = action.payload;
          }
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
          const exists = state.units.some((item) => item.id === action.payload);
          if (exists) {
            state.units = state.units.filter(
              (item) => item.id !== action.payload,
            );
          }
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
