import type { Recipe, Recipes } from "@stores/features/recipes";
import type { WithRequiredId } from "@app-types/NameId";
import {
  FetchRecipesService,
  CreateRecipeService,
  UpdateRecipeService,
  DeleteRecipeService,
} from "@services/recipes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatRecipes } from "@utils/formatData/formatRecipes";

export const fetchRecipesThunk = createAsyncThunk<
  Recipes,
  void
>("recipes/fetchRecipes", async () => {
  const data = await FetchRecipesService();
  return formatRecipes(data);
});

export const createRecipeThunk = createAsyncThunk<
  Recipes,
  Recipe
>("recipes/createRecipe", async (newRecipe) => {
  const createdRecipe = await CreateRecipeService(newRecipe);
  return createdRecipe;
});

export const deleteRecipeThunk = createAsyncThunk<number, number>(
  "recipes/deleteRecipe",
  async (recipeId) => {
    await DeleteRecipeService(recipeId);
    return recipeId;
  },
);

export const updateRecipeThunk = createAsyncThunk<
  Recipes,
  Recipes
>("recipes/updateRecipe", async (newRecipe) => {
  await UpdateRecipeService(newRecipe);
  return newRecipe;
});


function selectRecipe(recipeId: number) {
  // => si isMorning = true, ne mettre que les menuCategories du matin sinon ceux du midi/soir
  // dispatch recipesSlice.selectedId recipeId recipeIdSelected et clearRecipeIdSelected avant à faire
}
