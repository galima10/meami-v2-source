import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchMenuCategoriesService, FetchStorageLocationsService, FetchDaysService, FetchMomentsService } from "@services/seeds";

export const fetchStorageLocationsThunk = createAsyncThunk<{ id: number; name: string}[], void>(
  "seeds/fetchStorageLocations",
  async () => {
    const data = await FetchStorageLocationsService();
    return data;
  }
);

export const fetchMenuCategoriesThunk = createAsyncThunk<{ id: number; name: string}[], void>(
  "seeds/fetchMenuCategories",
  async () => {
    const data = await FetchMenuCategoriesService();
    return data;
  }
);

export const fetchDaysThunk = createAsyncThunk<{ id: number; name: string}[], void>(
  "seeds/fetchDays",
  async () => {
    const data = await FetchDaysService();
    return data;
  }
);

export const fetchMomentsThunk = createAsyncThunk<{ id: number; name: string}[], void>(
  "seeds/fetchMoments",
  async () => {
    const data = await FetchMomentsService();
    return data;
  }
);