import type {
  IngredientCategory,
  IngredientCategories,
} from "@stores/features/ingredientCategories";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatIngredientCategories } from "@utils/formatData/formatIngredientCategories";

import {
  FetchIngredientCategoriesService,
  CreateIngredientCategoryService,
  DeleteIngredientCategoryService,
} from "@services/ingredientCategories";
import type { WithRequiredId } from "@app-types/NameId";

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
