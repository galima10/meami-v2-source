import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShoppingListItem {
  id: string;
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
        itemId: string;
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
        itemId: string;
        type: "ingredients" | "products";
        quantityField: "quantityNeeded" | "quantityBuyed";
        delta: number;
      }>,
    ) => {
      const { itemId, type, quantityField, delta } = action.payload;
      state.shoppingList[type] = state.shoppingList[type].map((item) => {
        if (item.id === itemId) {
          const newQuantity =
            delta !== -1 && delta !== 1 ? delta : item[quantityField] + delta;

          return {
            ...item,
            [quantityField]: Math.max(0, newQuantity),
          };
        } else return item;
      });
    },
  },
});

export const { setShoppingList, itemAdded, itemRemoved, itemQuantitySetted } =
  shoppingListSlice.actions;
export default shoppingListSlice.reducer;
