import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShoppingListItem {
  id: number;
  name: string;
  quantityNeeded: number;
  quantityBuyed: number;
  unit: string;
  category: string;
}

interface ShoppingList {
  ingredients: ShoppingListItem[];
  products: ShoppingListItem[];
}

const initialState = {
  shoppingList: {} as ShoppingList,
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    resetShoppingList: () => initialState,
    setShoppingList: (state, action: PayloadAction<ShoppingList>) => {
      state.shoppingList = action.payload;
    },
    itemAdded: (
      state,
      action: PayloadAction<{
        newItem: ShoppingListItem;
        type: "ingredients" | "products";
      }>,
    ) => {
      const { newItem, type } = action.payload;
      state.shoppingList[type].push(newItem);
    },
    itemRemoved: (
      state,
      action: PayloadAction<{
        itemId: number;
        type: "ingredients" | "products";
      }>,
    ) => {
      const { itemId, type } = action.payload;
      state.shoppingList[type] = state.shoppingList[type].filter(
        (item) => item.id !== itemId,
      );
    },
    itemQuantitySetted: (
      state,
      action: PayloadAction<{
        itemId: number;
        type: "ingredients" | "products";
        quantityField: "quantityNeeded" | "quantityBuyed";
        delta: number;
      }>,
    ) => {
      const { itemId, type, quantityField, delta } = action.payload;
      const index = state.shoppingList[type].findIndex(
        (item) => item.id === itemId,
      );

      if (index !== -1) {
        const newQuantity = Math.max(
          0,
          delta !== -1 && delta !== 1
            ? delta
            : state.shoppingList[type][index][quantityField] + delta,
        );

        state.shoppingList[type][index] = {
          ...state.shoppingList[type][index],
          [quantityField]: newQuantity,
        };
      }
    },
  },
});

export const {
  setShoppingList,
  itemAdded,
  itemRemoved,
  itemQuantitySetted,
  resetShoppingList,
} = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
