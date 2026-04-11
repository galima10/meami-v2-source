import type {
  ShoppingListProduct,
  ShoppingListIngredient,
} from "@stores/features/shoppingList";

export const mockNonQuantifiableIngredientsNeeded: {
  newItemId: number;
  quantityNeeded: number;
  type: "ingredients" | "products";
}[] = [
  {
    // Lait: 1
    newItemId: 1,
    quantityNeeded: 3,
    type: "ingredients",
  },
  {
    // Chocolat en poudre: 2
    newItemId: 2,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Céréales: 3
    newItemId: 3,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Pommes de terre grenailles: 6
    newItemId: 6,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Huile d'olive: 7
    newItemId: 7,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Sel: 8
    newItemId: 8,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Fines herbes: 9
    newItemId: 9,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Ail semoule: 10
    newItemId: 10,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Prunes séchées: 12
    newItemId: 12,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Coquillettes: 15
    newItemId: 15,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Fond de poulet: 17
    newItemId: 17,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Beurre: 18
    newItemId: 18,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Tomates cerises: 22
    newItemId: 22,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Champignons pleurotes: 23
    newItemId: 23,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Riz: 24
    newItemId: 24,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Olives: 25
    newItemId: 25,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Paprika: 26
    newItemId: 26,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Chapelure: 28
    newItemId: 28,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Mayonnaise: 29
    newItemId: 29,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Miel: 30
    newItemId: 30,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Coulommiers: 33
    newItemId: 33,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Vinaigrette: 34
    newItemId: 34,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Penne: 37
    newItemId: 37,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Sauce soja: 38
    newItemId: 38,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Sauce béarnaise: 39
    newItemId: 39,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Spaghettis: 41
    newItemId: 41,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Fond de veau: 43
    newItemId: 43,
    quantityNeeded: 1,
    type: "ingredients",
  },
  {
    // Fromage à raclette: 46
    newItemId: 46,
    quantityNeeded: 1,
    type: "ingredients",
  },
];

export const mockIngredientsBuyed: {
  itemId: number;
  type: "ingredients" | "products";
  quantityNeeded: number;
  quantityBuyed: number;
}[] = [
  // Quantifiable ingredients
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
  // Non quantifiable ingredients
  {
    // Lait: 1
    itemId: 1,
    type: "ingredients",
    quantityBuyed: 3,
    quantityNeeded: 3,
  },
  {
    // Chocolat en poudre: 2
    itemId: 2,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Céréales: 3
    itemId: 3,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Pommes de terre grenailles: 6
    itemId: 6,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Huile d'olive: 7
    itemId: 7,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Sel: 8
    itemId: 8,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Fines herbes: 9
    itemId: 9,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Ail semoule: 10
    itemId: 10,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Prunes séchées: 12
    itemId: 12,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Coquillettes: 15
    itemId: 15,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Fond de poulet: 17
    itemId: 17,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Beurre: 18
    itemId: 18,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Tomates cerises: 22
    itemId: 22,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Champignons pleurotes: 23
    itemId: 23,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Riz: 24
    itemId: 24,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Olives: 25
    itemId: 25,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Paprika: 26
    itemId: 26,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Chapelure: 28
    itemId: 28,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Mayonnaise: 29
    itemId: 29,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Miel: 30
    itemId: 30,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Coulommiers: 33
    itemId: 33,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Vinaigrette: 34
    itemId: 34,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Penne: 37
    itemId: 37,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Sauce soja: 38
    itemId: 38,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Sauce béarnaise: 39
    itemId: 39,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Spaghettis: 41
    itemId: 41,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Fond de veau: 43
    itemId: 43,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
  {
    // Fromage à raclette: 46
    itemId: 46,
    type: "ingredients",
    quantityBuyed: 1,
    quantityNeeded: 1,
  },
];
