import type { Ingredient, Ingredients } from "@stores/features/ingredients";
import { createAsyncThunk } from "@reduxjs/toolkit";
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
import { UpdateQuantityGenericService } from "@services/shared";
import type { Operation } from "@app-types/DbQuantity";

export const fetchIngredientsThunk = createAsyncThunk<Ingredients, void>(
  "ingredients/fetchIngredients",
  async () => {
    const data = await FetchIngredientsService();
    return formatIngredients(data);
  },
);

export const createIngredientThunk = createAsyncThunk<Ingredients, Ingredient>(
  "ingredients/createIngredient",
  async (newIngredient) => {
    const createdIngredient = await CreateIngredientService(newIngredient);
    return createdIngredient;
  },
);

export const updateIngredientThunk = createAsyncThunk<Ingredients, Ingredients>(
  "ingredients/updateIngredient",
  async (newIngredient) => {
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
  async ({ ingredientId, newStorageLocationsIds }) => {
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
  async (ingredientId) => {
    await DeleteIngredientService(ingredientId);
    return ingredientId;
  },
);

export const updateStockThunk = createAsyncThunk<
  Ingredients,
  "menu" | "shopping"
>("ingredients/updateStock", async (from) => {
  await UpdateStockService(from);
  const data = await FetchIngredientsService();
  return formatIngredients(data);
});

export const setIngredientStockQuantityThunk = createAsyncThunk<
  {
    itemId: number;
    value: number;
    operation: Operation;
  },
  {
    itemId: number;
    value: number;
    operation: Operation;
  }
>(
  "ingredients/setIngredientStockQuantity",
  async ({ itemId, value, operation }) => {
    await UpdateQuantityGenericService(
      "ingredients",
      "stock_quantity",
      "id_ingredients",
      itemId,
      value,
      operation,
    );
    return { itemId, value, operation };
  },
);

function selectIngredient(ingredientId: number) {
  // dispatch ingredientsSlice.selectedId ingredientId ingredientIdSelected et clearIngredientIdSelected avant à faire
}

