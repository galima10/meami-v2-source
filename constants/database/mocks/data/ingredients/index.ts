import type { Ingredient } from "@stores/features/ingredients";

export const mockIngredients: Ingredient[] = [
  {
    // ID : 1
    name: "Lait",
    // Produit laitier: 15
    categoryId: 15,
    stockQuantity: 0,
    // Bouteille 13:
    unitId: 13,
    // BOISSON CHAUDE: 1 & AUTRE: 8
    menuCategoryIds: [1, 8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 2
    name: "Chocolat en poudre",
    // Produit sucré: 16
    categoryId: 16,
    stockQuantity: 0,
    // Boîte: 8
    unitId: 8,
    // BOISSON CHAUDE: 1 & AUTRE: 8
    menuCategoryIds: [1, 8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 3
    name: "Céréales",
    // Féculent: 16
    categoryId: 10,
    stockQuantity: 0,
    // Boîte: 8
    unitId: 8,
    // ACCOMPAGNEMENT MATIN: 2 & DESSERT: 7
    menuCategoryIds: [2, 7],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 4
    name: "Pomme",
    // Fruit frais: 8
    categoryId: 8,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // FRUIT: 3 & ACCOMPAGNEMENT REPAS: 6
    menuCategoryIds: [3, 6],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 5
    name: "Jambon cru",
    // Viande: 1
    categoryId: 1,
    stockQuantity: 0,
    // Tranche: 11
    unitId: 11,
    // PROTÉINES: 4
    menuCategoryIds: [4],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
];
