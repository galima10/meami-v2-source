import type {
  ShoppingListProduct,
  ShoppingListIngredient,
} from "@stores/features/shoppingList";

export const mockIngredientsBuyed: {
  itemId: number;
  type: "ingredients" | "products";
  quantityNeeded: number;
  quantityBuyed: number;
}[] = [
  {
    // Pomme: 4
    itemId: 4,
    type: "ingredients",
    quantityBuyed: 4.5,
    quantityNeeded: 4.5,
  },
  {
    // Jambon cru: 5
    itemId: 5,
    type: "ingredients",
    quantityBuyed: 2,
    quantityNeeded: 2,
  },
  {
    // Mousse au chocolat: 11
    itemId: 11,
    type: "ingredients",
    quantityBuyed: 8,
    quantityNeeded: 8,
  },
  {
    // Filet de poulet: 13
    itemId: 13,
    type: "ingredients",
    quantityBuyed: 2,
    quantityNeeded: 2,
  },
  {
    // Lentilles en conserve: 14
    itemId: 14,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Purée de tomates: 16
    itemId: 16,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Citron: 19
    itemId: 19,
    type: "ingredients",
    quantityBuyed: 2,
    quantityNeeded: 2,
  },
  {
    // Banane: 20
    itemId: 20,
    type: "ingredients",
    quantityBuyed: 5,
    quantityNeeded: 5,
  },
  {
    // Œuf: 21
    itemId: 21,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Filet de saumon: 27
    itemId: 27,
    type: "ingredients",
    quantityBuyed: 2,
    quantityNeeded: 2,
  },
  {
    // Salade batavia: 31
    itemId: 31,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Pois chiches en conserve: 32
    itemId: 32,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Kiwi: 35
    itemId: 35,
    type: "ingredients",
    quantityBuyed: 3,
    quantityNeeded: 3,
  },
  {
    // Poitrine de porc: 36
    itemId: 36,
    type: "ingredients",
    quantityBuyed: 3,
    quantityNeeded: 3,
  },
  {
    // Merguez: 40
    itemId: 40,
    type: "ingredients",
    quantityBuyed: 2,
    quantityNeeded: 2,
  },
  {
    // Steak haché: 42
    itemId: 42,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Pomme de terre: 44
    itemId: 44,
    type: "ingredients",
    quantityBuyed: 3,
    quantityNeeded: 3,
  },
];
