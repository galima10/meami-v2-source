import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Unit {
  id: number;
  name: string;
  abbreviation: string;
}

const initialState = {
  units: [] as Unit[],
};

export const unitSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    setUnits: (state, action: PayloadAction<Unit[]>) => {
      state.units = action.payload;
    },
    unitAdded: (state, action: PayloadAction<Unit>) => {
      state.units.push(action.payload);
    },
    unitDeleted: (state, action: PayloadAction<number>) => {
      const unitId = action.payload;
      state.units = state.units.filter((item) => item.id !== unitId);
    },
    unitUpdated: (state, action: PayloadAction<Unit>) => {
      const unitId = action.payload.id;
      const index = state.units.findIndex((item) => item.id === unitId);

      if (index !== -1) {
        state.units[index] = action.payload;
      }
    },
  },
});

export const { setUnits, unitAdded, unitDeleted, unitUpdated } =
  unitSlice.actions;
export default unitSlice.reducer;
