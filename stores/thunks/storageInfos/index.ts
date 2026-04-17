import type { WithRequiredId } from "@app-types/WithRequiredId";
import { formatStorageInfos } from "@mappers/formatData/formatStorageInfos";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    FetchStorageInfosService,
    RemoveStorageInfoService,
    SetStorageInfoService,
} from "@services/storageInfos";
import type { StorageInfo } from "@stores/features/storageInfos";

export const removeStorageInfoThunk = createAsyncThunk<number, number>(
  "storageInfos/removeStorageInfo",
  async (ingredientId) => {
    await RemoveStorageInfoService(ingredientId);
    return ingredientId;
  },
);

export const setStorageInfoThunk = createAsyncThunk<
  WithRequiredId<StorageInfo>,
  StorageInfo
>("storageInfos/setStorageInfo", async (newStorageInfo) => {
  const createdStorageInfo = await SetStorageInfoService(newStorageInfo);
  return createdStorageInfo;
});

export const fetchStorageInfosThunk = createAsyncThunk<
  WithRequiredId<StorageInfo>[],
  void
>("storageInfos/fetchStorageInfos", async () => {
  const data = await FetchStorageInfosService();
  return formatStorageInfos(data);
});
