import type { StorageInfo } from "@stores/features/storageInfos";
import type { WithRequiredId } from "@app-types/NameId";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchStorageInfosService,
  SetStorageInfoService,
  RemoveStorageInfoService,
} from "@services/storageInfos";
import { formatStorageInfos } from "@utils/formatData/formatStorageInfos";

export const removeStorageInfoThunk = createAsyncThunk<number, number>(
  "storageInfos/removeStorageInfo",
  async (ingredientId: number) => {
    await RemoveStorageInfoService(ingredientId);
    return ingredientId;
  },
);

export const setStorageInfoThunk = createAsyncThunk<
  WithRequiredId<StorageInfo>,
  StorageInfo
>("storageInfos/setStorageInfo", async (newStorageInfo: StorageInfo) => {
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
