import type { Operation, QuantityField } from "@app-types/DbQuantity";
import { formatShoppingList } from "@mappers/formatData/formatShoppingList";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateQuantityGenericService } from "@services/shared";
import {
    AddItemToShoppingService,
    FetchShoppingListService,
    RemoveItemToShoppingService,
} from "@services/shoppingList";
import type {
    ShoppingListIngredients,
    ShoppingListProducts,
} from "@stores/features/shoppingList";
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

export const setItemShoppingQuantityThunk = createAsyncThunk<
  {
    itemId: number;
    value: number;
    field: QuantityField;
    operation: Operation;
    type: "ingredients" | "products";
  },
  {
    itemId: number;
    value: number;
    field: QuantityField;
    operation: Operation;
    type: "ingredients" | "products";
  }
>(
  "shoppingList/setItemShoppingQuantity",
  async ({ itemId, value, field, operation, type }) => {
    if (type === "products") {
      await UpdateQuantityGenericService(
        "shopping_list_items",
        field,
        "id_products",
        itemId,
        value,
        operation,
      );
    } else {
      await UpdateQuantityGenericService(
        "shopping_list_items",
        field,
        "id_ingredients",
        itemId,
        value,
        operation,
      );
    }
    return { itemId, value, field, operation, type };
  },
);
