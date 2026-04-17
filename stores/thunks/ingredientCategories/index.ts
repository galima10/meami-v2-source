import { formatIngredientCategories } from "@mappers/formatData/formatIngredientCategories";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
    IngredientCategories,
    IngredientCategory,
} from "@stores/features/ingredientCategories";

import {
    CreateIngredientCategoryService,
    DeleteIngredientCategoryService,
    FetchIngredientCategoriesService,
} from "@services/ingredientCategories";

export const fetchIngredientCategoriesThunk = createAsyncThunk<
  IngredientCategories,
  void
>("ingredientCategories/fetchIngredientCategoriy", async () => {
  const data = await FetchIngredientCategoriesService();
  return formatIngredientCategories(data);
});

export const createIngredientCategoryThunk = createAsyncThunk<
  IngredientCategories,
  IngredientCategory
>(
  "ingredientCategories/createIngredientCategory",
  async (newIngredientCategory) => {
    const createdCategory = await CreateIngredientCategoryService(
      newIngredientCategory,
    );
    return createdCategory;
  },
);

export const deleteIngredientCategoryThunk = createAsyncThunk<number, number>(
  "ingredientCategories/deleteIngredientCategory",
  async (ingredientCategoryId) => {
    await DeleteIngredientCategoryService(ingredientCategoryId);
    return ingredientCategoryId;
  },
);
