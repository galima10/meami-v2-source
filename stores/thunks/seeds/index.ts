import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchDaysService,
  FetchMenuCategoriesService,
  FetchMomentsService,
  FetchStorageLocationsService,
} from "@services/seeds";
import { SeedsInitialState } from "@stores/features/seeds";
import { formatSeeds } from "@utils/formatData/formatSeeds";

export const fetchInitialDataThunk = createAsyncThunk<
  Omit<SeedsInitialState, "loading" | "error">,
  void
>("seeds/fetchInitialData", async () => {
  const storageLocations = await FetchStorageLocationsService();
  const menuCategories = await FetchMenuCategoriesService();
  const days = await FetchDaysService();
  const moments = await FetchMomentsService();
  return {
    storageLocations: formatSeeds(storageLocations),
    menuCategories: formatSeeds(menuCategories),
    days: formatSeeds(days),
    moments: formatSeeds(moments),
  };
});
