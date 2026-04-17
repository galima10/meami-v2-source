import type { Operation, QuantityField } from "@app-types/DbQuantity";
import { applyOperation } from "@helpers/applyOperation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    addItemToShoppingThunk,
    fetchShoppingListThunk,
    removeItemToShoppingThunk,
    setItemShoppingQuantityThunk,
} from "@stores/thunks/shoppingList";

export interface ShoppingListIngredient {
  quantityNeeded: number;
  quantityBuyed: number;
  unitId: number;
  categoryId: number;
}

export interface ShoppingListProduct {
  quantityNeeded: number;
  quantityBuyed: number;
}

export interface ShoppingListIngredients {
  [ingredientId: number]: ShoppingListIngredient;
}

export interface ShoppingListProducts {
  [productId: number]: ShoppingListProduct;
}

const initialState = {
  ingredientsShopping: {} as ShoppingListIngredients,
  productsShopping: {} as ShoppingListProducts,
  loading: false,
  error: null as string | null,
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    resetShoppingList: () => initialState,
  },
  extraReducers: (builder) => {
    // fetchShoppingListThunk
    builder
      .addCase(fetchShoppingListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchShoppingListThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            ingredients: ShoppingListIngredients;
            products: ShoppingListProducts;
          }>,
        ) => {
          state.loading = false;
          const { ingredients, products } = action.payload;
          if (Object.keys(state.ingredientsShopping).length === 0) {
            state.ingredientsShopping = ingredients;
          }
          if (Object.keys(state.productsShopping).length === 0) {
            state.productsShopping = products;
          }
        },
      )
      .addCase(
        fetchShoppingListThunk.rejected,
        (state, action: ReturnType<typeof fetchShoppingListThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // addItemToShoppingThunk
    builder
      .addCase(addItemToShoppingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addItemToShoppingThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            newItem: ShoppingListIngredients | ShoppingListProducts;
            type: "ingredients" | "products";
          }>,
        ) => {
          state.loading = false;

          const { newItem, type } = action.payload;

          const [itemIdStr] = Object.keys(newItem);
          const itemId = Number(itemIdStr);

          if (state[`${type}Shopping`][itemId])
            state[`${type}Shopping`][itemId].quantityNeeded++;
          else state[`${type}Shopping`][itemId] = newItem[itemId];
        },
      )
      .addCase(
        addItemToShoppingThunk.rejected,
        (state, action: ReturnType<typeof addItemToShoppingThunk.rejected>) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // removeItemToShoppingThunk
    builder
      .addCase(removeItemToShoppingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeItemToShoppingThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            itemId: number;
            type: "ingredients" | "products";
          }>,
        ) => {
          state.loading = false;

          const { itemId, type } = action.payload;
          delete state[`${type}Shopping`][itemId];
        },
      )
      .addCase(
        removeItemToShoppingThunk.rejected,
        (
          state,
          action: ReturnType<typeof removeItemToShoppingThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );

    // setItemShoppingQuantityThunk
    builder
      .addCase(setItemShoppingQuantityThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setItemShoppingQuantityThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            itemId: number;
            value: number;
            field: QuantityField;
            operation: Operation;
            type: "ingredients" | "products";
          }>,
        ) => {
          state.loading = false;
          const { itemId, value, field, operation, type } = action.payload;
          const property =
            field === "quantity_buyed" ? "quantityBuyed" : "quantityNeeded";
          const item = state[`${type}Shopping`][itemId];
          if (!item) return;
          item[property] = applyOperation(item[property], value, operation);
        },
      )
      .addCase(
        setItemShoppingQuantityThunk.rejected,
        (
          state,
          action: ReturnType<typeof setItemShoppingQuantityThunk.rejected>,
        ) => {
          state.loading = false;
          state.error = action.error.message ?? "Erreur inconnue";
        },
      );
  },
});

export const { resetShoppingList } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
