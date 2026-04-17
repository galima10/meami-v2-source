import { formatCookingUstensils } from "@mappers/formatData/formatCookingUstensils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    CreateUstensilService,
    DeleteUstensilService,
    FetchCookingUstensilsService,
} from "@services/cookingUstensils";
import type {
    CookingUstensil,
    CookingUstensils,
} from "@stores/features/cookingUstensils";

export const fetchCookingUstensilsThunk = createAsyncThunk<
  CookingUstensils,
  void
>("cookingUstensils/fetchCookingUstensils", async () => {
  const data = await FetchCookingUstensilsService();
  return formatCookingUstensils(data);
});

export const createUstensilThunk = createAsyncThunk<
  CookingUstensils,
  CookingUstensil
>("cookingUstensils/createUstensil", async (newCookingUstensil) => {
  const createdCookingUstensil =
    await CreateUstensilService(newCookingUstensil);
  return createdCookingUstensil;
});

export const deleteUstensilThunk = createAsyncThunk<number, number>(
  "cookingUstensils/deleteUstensil",
  async (cookingUstensilId) => {
    await DeleteUstensilService(cookingUstensilId);
    return cookingUstensilId;
  },
);
