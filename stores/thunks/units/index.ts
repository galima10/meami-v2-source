import type { Unit } from "@stores/features/units";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchUnitsService,
  CreateUnitService,
  DeleteUnitService,
  UpdateUnitService,
} from "@services/units";

export const fetchUnitsThunk = createAsyncThunk<Unit[], void>(
  "units/fetchUnits",
  async () => {
    const data = await FetchUnitsService();
    return data;
  },
);

export const createUnitThunk = createAsyncThunk<Unit, Unit>(
  "units/createUnit",
  async (newUnit: Unit) => {
    const createdUnit = await CreateUnitService(newUnit);
    return createdUnit;
  },
);

export const deleteUnitThunk = createAsyncThunk<number, number>(
  "units/deleteUnit",
  async (unitId: number) => {
    await DeleteUnitService(unitId);
    return unitId;
  },
);

export const updateUnitThunk = createAsyncThunk<Unit, Unit & { id: number }>(
  "units/updateUnit",
  async (newUnit: Unit & { id: number }) => {
    await UpdateUnitService(newUnit);
    return newUnit;
  },
);
