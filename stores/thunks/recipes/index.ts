import type { Recipe } from "@stores/features/recipes";
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
  WithRequiredId<Recipe>[],
  void
>("recipes/fetchRecipes", async () => {
  const data = await FetchRecipesService();
  return formatRecipes(data);
});

export const createRecipeThunk = createAsyncThunk<
  WithRequiredId<Recipe>,
  Recipe
>("recipes/createRecipe", async (newRecipe: Recipe) => {
  const createdRecipe = await CreateRecipeService(newRecipe);
  return createdRecipe;
});

export const deleteRecipeThunk = createAsyncThunk<number, number>(
  "recipes/deleteRecipe",
  async (recipeId: number) => {
    await DeleteRecipeService(recipeId);
    return recipeId;
  },
);

export const updateRecipeThunk = createAsyncThunk<
  WithRequiredId<Recipe>,
  WithRequiredId<Recipe>
>("recipes/updateRecipe", async (newRecipe: WithRequiredId<Recipe>) => {
  await UpdateRecipeService(newRecipe);
  return newRecipe;
});


function selectRecipe(recipeId: number) {
  // => si isMorning = true, ne mettre que les menuCategories du matin sinon ceux du midi/soir
  // dispatch recipesSlice.selectedId recipeId recipeIdSelected et clearRecipeIdSelected avant à faire
}
