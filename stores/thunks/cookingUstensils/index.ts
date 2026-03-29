import type { CookingUstensil } from "@stores/features/cookingUstensils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchCookingUstensilsService,
  DeleteUstensilService,
  CreateUstensilService,
} from "@services/cookingUstensils";
import { formatCookingUstensils } from "@utils/formatData/formatCookingUstensils";
import type { WithRequiredId } from "@app-types/NameId";

export const fetchCookingUstensilsThunk = createAsyncThunk<
  WithRequiredId<CookingUstensil>[],
  void
>("cookingUstensils/fetchCookingUstensils", async () => {
  const data = await FetchCookingUstensilsService();
  return formatCookingUstensils(data);
});

export const createUstensilThunk = createAsyncThunk<
  WithRequiredId<CookingUstensil>,
  CookingUstensil
>(
  "cookingUstensils/createUstensil",
  async (newCookingUstensil: CookingUstensil) => {
    const createdCookingUstensil =
      await CreateUstensilService(newCookingUstensil);
    return createdCookingUstensil;
  },
);

export const deleteUstensilThunk = createAsyncThunk<number, number>(
  "cookingUstensils/deleteUstensil",
  async (cookingUstensilId: number) => {
    await DeleteUstensilService(cookingUstensilId);
    return cookingUstensilId;
  },
);
