import type { SeedRow, WithRequiredId } from "@app-types/NameId";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchDaysService,
  FetchMenuCategoriesService,
  FetchMomentsService,
  FetchStorageLocationsService,
} from "@services/seeds";

export const fetchStorageLocationsThunk = createAsyncThunk<
  Array<WithRequiredId<SeedRow>>,
  void
>("seeds/fetchStorageLocations", async () => {
  const data = await FetchStorageLocationsService();
  return data;
});

export const fetchMenuCategoriesThunk = createAsyncThunk<
  Array<WithRequiredId<SeedRow>>,
  void
>("seeds/fetchMenuCategories", async () => {
  const data = await FetchMenuCategoriesService();
  return data;
});

export const fetchDaysThunk = createAsyncThunk<
  Array<WithRequiredId<SeedRow>>,
  void
>("seeds/fetchDays", async () => {
  const data = await FetchDaysService();
  return data;
});

export const fetchMomentsThunk = createAsyncThunk<
  Array<WithRequiredId<SeedRow>>,
  void
>("seeds/fetchMoments", async () => {
  const data = await FetchMomentsService();
  return data;
});
