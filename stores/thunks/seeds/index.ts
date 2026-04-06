import type { SeedRow, WithRequiredId } from "@app-types/NameId";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchDaysService,
  FetchMenuCategoriesService,
  FetchMomentsService,
  FetchStorageLocationsService,
} from "@services/seeds";
import { SeedsInitialState } from "@stores/features/seeds";

export const fetchInitialDataThunk = createAsyncThunk<
  Omit<SeedsInitialState, "loading" | "error">,
  void
>("seeds/fetchInitialData", async () => {
  const storageLocations = await FetchStorageLocationsService();
  const menuCategories = await FetchMenuCategoriesService();
  const days = await FetchDaysService();
  const moments = await FetchMomentsService();
  return {
    storageLocations,
    menuCategories,
    days,
    moments,
  };
});
