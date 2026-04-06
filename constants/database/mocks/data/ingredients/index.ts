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
    // Féculent: 10
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
  {
    // ID : 6
    name: "Pommes de terre grenailles",
    // Féculent: 10
    categoryId: 10,
    stockQuantity: 0,
    // Paquet: 14
    unitId: 14,
    // LÉGUMES: 5
    menuCategoryIds: [5],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 7
    name: "Huile d'olive",
    // Matière grasse: 17
    categoryId: 17,
    stockQuantity: 0,
    // Bouteille: 13
    unitId: 13,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 8
    name: "Sel",
    // Assaisonnement: 14
    categoryId: 14,
    stockQuantity: 0,
    // Salière: 15
    unitId: 15,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 9
    name: "Fines herbes",
    // Herbe aromatique: 13
    categoryId: 13,
    stockQuantity: 0,
    // Flacon: 10
    unitId: 10,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 10
    name: "Ail semoule",
    // Aromate: 11
    categoryId: 11,
    stockQuantity: 0,
    // Flacon: 10
    unitId: 10,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 11
    name: "Mousse au chocolat",
    // Produit sucré: 16
    categoryId: 16,
    stockQuantity: 0,
    // Pot: 9
    unitId: 9,
    // DESSERT: 7
    menuCategoryIds: [7],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 12
    name: "Prunes séchées",
    // Fruit sec: 9
    categoryId: 9,
    stockQuantity: 0,
    // Paquet: 14
    unitId: 14,
    // DESSERT: 7
    menuCategoryIds: [7],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 13
    name: "Filet de poulet",
    // Viande: 1
    categoryId: 1,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // PROTÉINES: 4
    menuCategoryIds: [4],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 14
    name: "Lentilles en conserve",
    // Légumes transformés: 5
    categoryId: 5,
    stockQuantity: 0,
    // Boîte: 8
    unitId: 8,
    // LÉGUMES: 5
    menuCategoryIds: [5],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 15
    name: "Coquillettes",
    // Féculent: 10
    categoryId: 10,
    stockQuantity: 0,
    // Paquet: 14
    unitId: 14,
    // ACCOMPAGNEMENT REPAS: 6
    menuCategoryIds: [6],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 16
    name: "Purée de tomates",
    // Légumes transformés: 5
    categoryId: 5,
    stockQuantity: 0,
    // Brique: 12
    unitId: 12,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 17
    name: "Fond de poulet",
    // Produit protéique: 18
    categoryId: 18,
    stockQuantity: 0,
    // Pot: 9
    unitId: 9,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 18
    name: "Beurre",
    // Matière grasse: 17
    categoryId: 17,
    stockQuantity: 0,
    // Pot: 9
    unitId: 9,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 19
    name: "Citron",
    // Fruit frais: 8
    categoryId: 8,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 20
    name: "Banane",
    // Fruit frais: 8
    categoryId: 8,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // DESSERT: 7
    menuCategoryIds: [7],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 21
    name: "Œuf",
    // Produit protéique: 18
    categoryId: 18,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // PROTÉINES: 4
    menuCategoryIds: [4],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 22
    name: "Tomates cerises",
    // Légume frais: 4
    categoryId: 4,
    stockQuantity: 0,
    // Barquette: 16
    unitId: 16,
    // LÉGUMES: 5
    menuCategoryIds: [5],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 23
    name: "Champignons pleurotes",
    // Légume frais: 4
    categoryId: 4,
    stockQuantity: 0,
    // Barquette: 16
    unitId: 16,
    // LÉGUMES: 5
    menuCategoryIds: [5],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 24
    name: "Riz",
    // Féculent: 10
    categoryId: 10,
    stockQuantity: 0,
    // Paquet: 14
    unitId: 14,
    // ACCOMPAGNEMENT REPAS: 6
    menuCategoryIds: [6],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 25
    name: "Olives",
    // Matière grasse: 17
    categoryId: 17,
    stockQuantity: 0,
    // Boîte: 8
    unitId: 8,
    // ACCOMPAGNEMENT REPAS: 6
    menuCategoryIds: [6],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 26
    name: "Paprika",
    // Épice: 12
    categoryId: 12,
    stockQuantity: 0,
    // Flacon: 10
    unitId: 10,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 27
    name: "Filet de saumon",
    // Poisson: 2
    categoryId: 2,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // PROTÉINES: 4
    menuCategoryIds: [4],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 28
    name: "Chapelure",
    // Féculent: 10
    categoryId: 10,
    stockQuantity: 0,
    // Boîte: 8
    unitId: 8,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 29
    name: "Mayonnaise",
    // Sauce: 19
    categoryId: 19,
    stockQuantity: 0,
    // Pot: 9
    unitId: 9,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 30
    name: "Miel",
    // Produit sucré: 16
    categoryId: 16,
    stockQuantity: 0,
    // Pot: 9
    unitId: 9,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 31
    name: "Salade batavia",
    // Légume frais: 4
    categoryId: 4,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // LÉGUMES: 5
    menuCategoryIds: [5],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 32
    name: "Pois chiches en conserve",
    // Légumes transformés: 5
    categoryId: 5,
    stockQuantity: 0,
    // Boîte: 8
    unitId: 8,
    // LÉGUMES: 5
    menuCategoryIds: [5],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 33
    name: "Coulommiers",
    // Produit laitier: 15
    categoryId: 15,
    stockQuantity: 0,
    // Boîte: 8
    unitId: 8,
    // ACCOMPAGNEMENT REPAS: 6
    menuCategoryIds: [6],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 34
    name: "Vinaigrette",
    // Sauce: 19
    categoryId: 19,
    stockQuantity: 0,
    // Bouteille: 13
    unitId: 13,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 35
    name: "Kiwi",
    // Fruit frais: 8
    categoryId: 8,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // DESSERT: 7
    menuCategoryIds: [7],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 36
    name: "Poitrine de porc",
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
  {
    // ID : 37
    name: "Penne",
    // Féculent: 10
    categoryId: 10,
    stockQuantity: 0,
    // Paquet: 14
    unitId: 14,
    // ACCOMPAGNEMENT REPAS: 6
    menuCategoryIds: [6],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 38
    name: "Sauce soja",
    // Assaisonnement: 14
    categoryId: 14,
    stockQuantity: 0,
    // Bouteille: 13
    unitId: 13,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 39
    name: "Sauce béarnaise",
    // Sauce: 19
    categoryId: 19,
    stockQuantity: 0,
    // Pot: 9
    unitId: 9,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 40
    name: "Merguez",
    // Viande: 1
    categoryId: 1,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // PROTÉINES: 4
    menuCategoryIds: [4],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 41
    name: "Spaghettis",
    // Féculent: 10
    categoryId: 10,
    stockQuantity: 0,
    // Paquet: 14
    unitId: 14,
    // ACCOMPAGNEMENT REPAS: 6
    menuCategoryIds: [6],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 42
    name: "Steak haché",
    // Viande: 1
    categoryId: 1,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // PROTÉINES: 4
    menuCategoryIds: [4],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 43
    name: "Fond de veau",
    // Produit protéique: 18
    categoryId: 18,
    stockQuantity: 0,
    // Pot: 9
    unitId: 9,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 44
    name: "Pomme de terre",
    // Féculent: 10
    categoryId: 10,
    stockQuantity: 0,
    // Pièce: 1
    unitId: 1,
    // LÉGUMES: 5
    menuCategoryIds: [5],
    quantifiable: true,
    // NULL
    storageLocationIds: [],
  },
  {
    // ID : 45
    name: "Eau",
    // Base: 20
    categoryId: 20,
    stockQuantity: 0,
    // Infini: 19
    unitId: 19,
    // AUTRE: 8
    menuCategoryIds: [8],
    quantifiable: false,
    // NULL
    storageLocationIds: [],
  },
];
