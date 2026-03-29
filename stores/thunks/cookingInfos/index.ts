import type { CookingInfo } from "@stores/features/cookingInfos";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatCookingInfos } from "@utils/formatData/formatCookingInfos";
import type { WithRequiredId } from "@app-types/NameId";

import {
  SetCookingInfoService,
  RemoveCookingInfoService,
  FetchCookingInfosService,
} from "@services/cookingInfos";

export const removeCookingInfoThunk = createAsyncThunk<number, number>(
  "cookingInfos/removeCookingInfo",
  async (ingredientId: number) => {
    await RemoveCookingInfoService(ingredientId);
    return ingredientId;
  },
);

export const setCookingInfoThunk = createAsyncThunk<
  WithRequiredId<CookingInfo>,
  CookingInfo
>("cookingInfos/setCookingInfo", async (newCookingInfo: CookingInfo) => {
  const createdCookingInfo = await SetCookingInfoService(newCookingInfo);
  return createdCookingInfo;
});

export const fetchCookingInfosThunk = createAsyncThunk<
  WithRequiredId<CookingInfo>[],
  void
>("cookingInfos/fetchCookingInfos", async () => {
  const data = await FetchCookingInfosService();
  return formatCookingInfos(data);
});
