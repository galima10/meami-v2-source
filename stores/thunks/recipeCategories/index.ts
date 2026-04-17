import { formatRecipeCategories } from "@mappers/formatData/formatRecipeCategories";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    CreateRecipeCategoryService,
    DeleteRecipeCategoryService,
    FetchRecipeCategoriesService,
} from "@services/recipeCategories";
import type {
    RecipeCategories,
    RecipeCategory,
} from "@stores/features/recipeCategories";

export const fetchRecipeCategoriesThunk = createAsyncThunk<
  RecipeCategories,
  void
>("recipeCategories/fetchRecipeCategories", async () => {
  const data = await FetchRecipeCategoriesService();
  return formatRecipeCategories(data);
});

export const createRecipeCategoryThunk = createAsyncThunk<
  RecipeCategories,
  RecipeCategory
>("recipeCategories/createRecipeCategory", async (newRecipeCategory) => {
  const createdRecipeCategory =
    await CreateRecipeCategoryService(newRecipeCategory);
  return createdRecipeCategory;
});

export const deleteRecipeCategoryThunk = createAsyncThunk<number, number>(
  "recipeCategories/deleteRecipeCategory",
  async (recipeCategoryId) => {
    await DeleteRecipeCategoryService(recipeCategoryId);
    return recipeCategoryId;
  },
);
