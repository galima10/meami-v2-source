import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Unit {
  id: string;
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
    unitDeleted: (state, action: PayloadAction<string>) => {
      const unitId = action.payload;
      state.units = state.units.filter((item) => item.id !== unitId);
    },
    unitUpdated: (state, action: PayloadAction<Unit>) => {
      const unitId = action.payload.id;
      state.units = state.units.map((item) => {
        if (item.id === unitId) return action.payload;
        else return item;
      });
    },
  },
});

export const { setUnits, unitAdded, unitDeleted, unitUpdated } =
  unitSlice.actions;
export default unitSlice.reducer;
