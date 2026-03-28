import type { IngredientCategory } from "@stores/features/ingredientCategories";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatIngredientCategories } from "@utils/formatData/formatIngredientCategories";

import {
  FetchIngredientCategoriesService,
  CreateIngredientCategoryService,
  DeleteIngredientCategoryService,
} from "@services/ingredientCategories";

export const fetchIngredientCategoriesThunk = createAsyncThunk<
  IngredientCategory[],
  void
>("ingredientCategories/fetchIngredientCategoriy", async () => {
  const data = await FetchIngredientCategoriesService();
  return formatIngredientCategories(data);
});

export const createIngredientCategoryThunk = createAsyncThunk<
  IngredientCategory,
  IngredientCategory
>(
  "ingredientCategories/createIngredientCategory",
  async (newIngredientCategory: IngredientCategory) => {
    const createdCategory = await CreateIngredientCategoryService(
      newIngredientCategory,
    );
    return createdCategory; // Retourne l'objet avec l'ID généré
  },
);

export const deleteIngredientCategoryThunk = createAsyncThunk<number, number>(
  "ingredientCategories/deleteIngredientCategory",
  async (ingredientCategoryId: number) => {
    await DeleteIngredientCategoryService(ingredientCategoryId);
    return ingredientCategoryId;
  },
);
