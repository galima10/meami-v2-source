import type {
  ShoppingListIngredients,
  ShoppingListProducts,
} from "@stores/features/shoppingList";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatShoppingList } from "@utils/formatData/formatShoppingList";
import {
  FetchShoppingListService,
  AddItemToShoppingService,
  RemoveItemToShoppingService,
  SetShoppingListItemQuantityService,
} from "@services/shoppingList";
import type { RootState } from "@stores/index";

export const fetchShoppingListThunk = createAsyncThunk<
  { ingredients: ShoppingListIngredients; products: ShoppingListProducts },
  void
>("shoppingList/fetchShoppingList", async () => {
  const data = await FetchShoppingListService();
  return formatShoppingList(data);
});

export const addItemToShoppingThunk = createAsyncThunk<
  {
    newItem: ShoppingListIngredients | ShoppingListProducts;
    type: "ingredients" | "products";
  },
  {
    newItemId: number;
    quantityNeeded: number;
    type: "ingredients" | "products";
  },
  { state: RootState }
>(
  "shoppingList/addItemToShopping",
  async ({ newItemId, quantityNeeded, type }, { getState }) => {
    await AddItemToShoppingService(newItemId, quantityNeeded, type);

    const state = getState();
    const ingredients = state.ingredient.ingredients;

    if (type === "ingredients") {
      const item: ShoppingListIngredients = {
        [newItemId]: {
          quantityBuyed: 0,
          quantityNeeded: quantityNeeded,
          unitId: ingredients[newItemId]?.unitId,
          categoryId: ingredients[newItemId]?.categoryId,
        },
      };
      return { newItem: item, type };
    } else {
      const item: ShoppingListProducts = {
        [newItemId]: {
          quantityBuyed: 0,
          quantityNeeded: quantityNeeded,
        },
      };
      return { newItem: item, type };
    }
  },
);

export const removeItemToShoppingThunk = createAsyncThunk<
  { itemId: number; type: "ingredients" | "products" },
  { itemId: number; type: "ingredients" | "products" }
>("shoppingList/removeItemToShopping", async ({ itemId, type }) => {
  await RemoveItemToShoppingService(itemId, type);
  return { itemId, type };
});

export const setShoppingListItemQuantityThunk = createAsyncThunk<
  {
    itemId: number;
    type: "ingredients" | "products";
    quantityNeeded: number;
    quantityBuyed: number;
  },
  {
    itemId: number;
    type: "ingredients" | "products";
    quantityNeeded: number;
    quantityBuyed: number;
  }
>(
  "shoppingList/setShoppingListItemQuantity",
  async ({ itemId, type, quantityBuyed, quantityNeeded }) => {
    await SetShoppingListItemQuantityService(
      itemId,
      type,
      quantityNeeded,
      quantityBuyed,
    );
    return { itemId, type, quantityBuyed, quantityNeeded };
  },
);
