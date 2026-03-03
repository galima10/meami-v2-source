import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShoppingListItem {}

const initialState = {
  shoppingList: [] as ShoppingListItem[],
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {},
});

export const {} = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
