import type { Recipe } from "@stores/features/recipes";

export const mockRecipes: Recipe[] = [
  {
    // ID : 1
    name: "Fish & chips de saumon",
    type: "plat princ.",
    duration: 45,
    imagePreview: null,
    recipe: null,
    // Simple: 1 & Maison: 6
    categoryIds: [1, 6],
    isMorning: false,
    ingredients: [
      {
        // Filet de saumon: 27
        ingredientId: 27,
        quantity: 1,
        // Pièce: 1
        unitId: 1,
        // PROTÉINES: 4
        menuCategoryId: 4,
      },
      {
        // Pomme de terre: 44
        ingredientId: 44,
        quantity: 1,
        // Pièce: 1
        unitId: 1,
        // LÉGUMES: 5
        menuCategoryId: 5,
      },
      {
        // Chapelure: 28
        ingredientId: 28,
        quantity: 1,
        // Poignée: 18
        unitId: 18,
        // AUTRE: 8
        menuCategoryId: 8,
      },
      {
        // Mayonnaise: 29
        ingredientId: 29,
        quantity: 1,
        // Cuillère à soupe: 4
        unitId: 4,
        // AUTRE: 8
        menuCategoryId: 8,
      },
      {
        // Miel: 30
        ingredientId: 30,
        quantity: 1,
        // Cuillère à soupe: 4
        unitId: 4,
        // AUTRE: 8
        menuCategoryId: 8,
      },
      {
        // Ail semoule: 10
        ingredientId: 10,
        quantity: 1,
        // Pincée: 17
        unitId: 17,
        // AUTRE: 8
        menuCategoryId: 8,
      },
      {
        // Fines herbes: 9
        ingredientId: 9,
        quantity: 1,
        // Pincée: 17
        unitId: 17,
        // AUTRE: 8
        menuCategoryId: 8,
      },
      {
        // Sel: 8
        ingredientId: 8,
        quantity: 1,
        // Pincée: 17
        unitId: 17,
        // AUTRE: 8
        menuCategoryId: 8,
      },
      {
        // Huile d'olive: 7
        ingredientId: 7,
        quantity: 1,
        // Cuillère à soupe: 4
        unitId: 4,
        // AUTRE: 8
        menuCategoryId: 8,
      },
    ],
  },
  {
    // ID : 2
    name: "Raclette maison",
    type: "plat princ.",
    duration: 30,
    imagePreview: null,
    recipe: null,
    // Réconfortante: 3 & Gourmande: 5
    categoryIds: [3, 5],
    isMorning: false,
    ingredients: [
      {
        // Jambon cru: 5
        ingredientId: 5,
        quantity: 1,
        // Tranche: 11
        unitId: 11,
        // PROTÉINES: 4
        menuCategoryId: 4,
      },
      {
        // Pomme de terre: 44
        ingredientId: 44,
        quantity: 2,
        // Pièce: 1
        unitId: 1,
        // LÉGUMES: 5
        menuCategoryId: 5,
      },
      {
        // Fromage à raclette: 46
        ingredientId: 46,
        quantity: 1,
        // Poignée: 18
        unitId: 18,
        // ACCOMPAGNEMENT REPAS: 6
        menuCategoryId: 6,
      },
      {
        // Ail semoule: 10
        ingredientId: 10,
        quantity: 1,
        // Pincée: 17
        unitId: 17,
        // AUTRE: 8
        menuCategoryId: 8,
      },
      {
        // Fines herbes: 9
        ingredientId: 9,
        quantity: 1,
        // Pincée: 17
        unitId: 17,
        // AUTRE: 8
        menuCategoryId: 8,
      },
      {
        // Sel: 8
        ingredientId: 8,
        quantity: 1,
        // Pincée: 17
        unitId: 17,
        // AUTRE: 8
        menuCategoryId: 8,
      },
      {
        // Huile d'olive: 7
        ingredientId: 7,
        quantity: 1,
        // Cuillère à soupe: 4
        unitId: 4,
        // AUTRE: 8
        menuCategoryId: 8,
      },
    ],
  },
  {
    // ID : 3
    name: "Petit-déj équilibré",
    type: "petit-déj.",
    duration: 5,
    imagePreview: null,
    recipe: null,
    // Simple: 1 & Équilibrée: 4 & Rapide: 2
    categoryIds: [1, 4, 2],
    isMorning: true,
    ingredients: [
      {
        // Lait: 1
        ingredientId: 1,
        quantity: 1,
        // Verre: 1
        unitId: 1,
        // BOISSON CHAUDE: 1
        menuCategoryId: 1,
      },
      {
        // Chocolat en poudre: 2
        ingredientId: 2,
        quantity: 3,
        // Cuillère à café: 5
        unitId: 5,
        // BOISSON CHAUDE: 1
        menuCategoryId: 1,
      },
      {
        // Céréales: 3
        ingredientId: 3,
        quantity: 1,
        // Bol: 6
        unitId: 6,
        // ACCOMPAGNEMENT MATIN: 2
        menuCategoryId: 2,
      },
      {
        // Pomme: 4
        ingredientId: 4,
        quantity: 0.5,
        // Pièce: 1
        unitId: 1,
        // FRUIT: 3
        menuCategoryId: 3,
      },
    ],
  },
];
