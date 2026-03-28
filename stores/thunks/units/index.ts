import type { Unit } from "@stores/features/units";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchUnitsService,
  CreateUnitService,
  DeleteUnitService,
  UpdateUnitService,
} from "@services/units";
import type { WithRequiredId } from "@app-types/NameId";

export const fetchUnitsThunk = createAsyncThunk<WithRequiredId<Unit>[], void>(
  "units/fetchUnits",
  async () => {
    const data = await FetchUnitsService();
    return data;
  },
);

export const createUnitThunk = createAsyncThunk<WithRequiredId<Unit>, Unit>(
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

export const updateUnitThunk = createAsyncThunk<WithRequiredId<Unit>, WithRequiredId<Unit>>(
  "units/updateUnit",
  async (newUnit: Unit & { id: number }) => {
    await UpdateUnitService(newUnit);
    return newUnit;
  },
);
