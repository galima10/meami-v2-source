import type { WithRequiredId } from "@app-types/WithRequiredId";
import { formatCookingInfos } from "@mappers/formatData/formatCookingInfos";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CookingInfo } from "@stores/features/cookingInfos";

import {
    FetchCookingInfosService,
    RemoveCookingInfoService,
    SetCookingInfoService,
} from "@services/cookingInfos";

export const removeCookingInfoThunk = createAsyncThunk<number, number>(
  "cookingInfos/removeCookingInfo",
  async (ingredientId) => {
    await RemoveCookingInfoService(ingredientId);
    return ingredientId;
  },
);

export const setCookingInfoThunk = createAsyncThunk<
  WithRequiredId<CookingInfo>,
  CookingInfo
>("cookingInfos/setCookingInfo", async (newCookingInfo) => {
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
