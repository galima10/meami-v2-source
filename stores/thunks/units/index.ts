import type { Unit, Units } from "@stores/features/units";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchUnitsService,
  CreateUnitService,
  DeleteUnitService,
  UpdateUnitService,
} from "@services/units";
import type { WithRequiredId } from "@app-types/NameId";
import { formatUnits } from "@utils/formatData/formatUnits";

export const fetchUnitsThunk = createAsyncThunk<Units, void>(
  "units/fetchUnits",
  async () => {
    const data = await FetchUnitsService();
    return formatUnits(data);
  },
);

export const createUnitThunk = createAsyncThunk<Units, Unit>(
  "units/createUnit",
  async (newUnit) => {
    const createdUnit = await CreateUnitService(newUnit);
    return createdUnit;
  },
);

export const deleteUnitThunk = createAsyncThunk<number, number>(
  "units/deleteUnit",
  async (unitId) => {
    await DeleteUnitService(unitId);
    return unitId;
  },
);

export const updateUnitThunk = createAsyncThunk<Units, Units>(
  "units/updateUnit",
  async (newUnit) => {
    await UpdateUnitService(newUnit);
    return newUnit;
  },
);
