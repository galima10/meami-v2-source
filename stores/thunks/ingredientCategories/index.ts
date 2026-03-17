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

// export async function fetchIngredientCategories() {
//   // SELECT * FROM ingredient_categories;
//   // dispatch ingredientCategoriesSlice setIngredientCategories
// }

// export async function createIngredientCategory(
//   newIngredientCategory: IngredientCategory,
// ) {
//   // Vérifier si la catégorie n'existe pas déjà dans le slice
//   /*

// INSERT INTO
//   ingredient_categories (name)
// VALUES
//   (newIngredientCategory.name);

// */
//   // dispatch ingredientCategoriesSlice ingredientCategoryAdded newIngredientCategory
// }

// export async function deleteIngredientCategory(ingredientCategoryId: number) {
//   // Vérifier si l'id est bien dans le slice
//   /*

// DELETE FROM
//   ingredient_categories
// WHERE
//   id_ingredient_categories = ingredientCategoryId;

// */
//   // dispatch ingredientCategoriesSlice ingredientCategoryDeleted ingredientCategoryId
// }
