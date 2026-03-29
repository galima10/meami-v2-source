import type { Ingredient } from "@stores/features/ingredients";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { WithRequiredId, SeedRow } from "@app-types/NameId";
import {
  FetchIngredientsService,
  UpdateIngredientService,
  UpdateStockService,
  UpdateStorageLocationsService,
  CreateIngredientService,
  DeleteIngredientService,
  SetQuantifiableService,
} from "@services/ingredients";
import { formatIngredients } from "@utils/formatData/formatIngredients";

export const fetchIngredientsThunk = createAsyncThunk<
  WithRequiredId<Ingredient>[],
  void
>("ingredients/fetchIngredients", async () => {
  const data = await FetchIngredientsService();
  return formatIngredients(data);
});

export const createIngredientThunk = createAsyncThunk<
  WithRequiredId<Ingredient>,
  Ingredient
>("ingredients/createIngredient", async (newIngredient: Ingredient) => {
  const createdIngredient = await CreateIngredientService(newIngredient);
  return createdIngredient;
});

export const updateIngredientThunk = createAsyncThunk<
  WithRequiredId<Ingredient>,
  WithRequiredId<Ingredient>
>(
  "ingredients/updateIngredient",
  async (newIngredient: WithRequiredId<Ingredient>) => {
    await UpdateIngredientService(newIngredient);
    return newIngredient;
  },
);

export const updateStorageLocationsThunk = createAsyncThunk<
  {
    ingredientId: number;
    newStorageLocationsIds: number[];
  },
  {
    ingredientId: number;
    newStorageLocationsIds: number[];
  }
>(
  "ingredients/updateStorageLocations",
  async ({
    ingredientId,
    newStorageLocationsIds,
  }: {
    ingredientId: number;
    newStorageLocationsIds: number[];
  }) => {
    await UpdateStorageLocationsService(ingredientId, newStorageLocationsIds);
    return {
      ingredientId,
      newStorageLocationsIds,
    };
  },
);

export const setQuantifiableThunk = createAsyncThunk<
  { ingredientId: number; newQuantifiable: boolean },
  { ingredientId: number; newQuantifiable: boolean }
>("ingredients/setQuantifiable", async ({ ingredientId, newQuantifiable }) => {
  await SetQuantifiableService(ingredientId, newQuantifiable);
  return {
    ingredientId,
    newQuantifiable,
  };
});

export const deleteIngredientThunk = createAsyncThunk<number, number>(
  "ingredients/deleteIngredient",
  async (ingredientId: number) => {
    await DeleteIngredientService(ingredientId);
    return ingredientId;
  },
);

export const updateStockThunk = createAsyncThunk<
  WithRequiredId<Ingredient>[],
  "menu" | "shopping"
>("ingredients/updateStock", async (from: "menu" | "shopping") => {
  await UpdateStockService(from);
  const data = await FetchIngredientsService();
  return formatIngredients(data);
});

function selectIngredient(ingredientId: number) {
  // dispatch ingredientsSlice.selectedId ingredientId ingredientIdSelected et clearIngredientIdSelected avant à faire
}

function setIngredientStockQuantity(ingredientId: number, delta: number) {
  // dispatch ingredientsSlice ingredientStockQuantitySetted ingredientId delta
}
