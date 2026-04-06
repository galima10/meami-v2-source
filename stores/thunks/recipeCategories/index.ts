import type { RecipeCategory } from "@stores/features/recipeCategories";
import type { WithRequiredId } from "@app-types/NameId";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatRecipeCategories } from "@utils/formatData/formatRecipeCategories";
import {
  FetchRecipeCategoriesService,
  DeleteRecipeCategoryService,
  CreateRecipeCategoryService,
} from "@services/recipeCategories";

export const fetchRecipeCategoriesThunk = createAsyncThunk<
  WithRequiredId<RecipeCategory>[],
  void
>("recipeCategories/fetchRecipeCategories", async () => {
  const data = await FetchRecipeCategoriesService();
  return formatRecipeCategories(data);
});

export const createRecipeCategoryThunk = createAsyncThunk<
  WithRequiredId<RecipeCategory>,
  RecipeCategory
>(
  "recipeCategories/createRecipeCategory",
  async (newRecipeCategory) => {
    const createdRecipeCategory =
      await CreateRecipeCategoryService(newRecipeCategory);
    return createdRecipeCategory;
  },
);

export const deleteRecipeCategoryThunk = createAsyncThunk<number, number>(
  "recipeCategories/deleteRecipeCategory",
  async (recipeCategoryId) => {
    await DeleteRecipeCategoryService(recipeCategoryId);
    return recipeCategoryId;
  },
);
