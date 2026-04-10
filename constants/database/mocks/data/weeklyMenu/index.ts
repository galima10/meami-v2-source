import type { IngredientInsert } from "@stores/thunks/weeklyMenu";

export const mockWeeklyRecipes: { recipeId: number; menuId: number }[] = [
  {
    // Petit-déj. équilibré: 3
    recipeId: 3,
    // Samedi matin: 1
    menuId: 1,
  },
  {
    // Petit-déj. équilibré: 3
    recipeId: 3,
    // Dimanche matin: 4
    menuId: 4,
  },
  {
    // Petit-déj. équilibré: 3
    recipeId: 3,
    // Lundi matin: 7
    menuId: 7,
  },
  {
    // Petit-déj. équilibré: 3
    recipeId: 3,
    // Mardi matin: 10
    menuId: 10,
  },
  {
    // Petit-déj. équilibré: 3
    recipeId: 3,
    // Mercredi matin: 13
    menuId: 13,
  },
  {
    // Petit-déj. équilibré: 3
    recipeId: 3,
    // Jeudi matin: 16
    menuId: 16,
  },
  {
    // Petit-déj. équilibré: 3
    recipeId: 3,
    // Vendredi matin: 19
    menuId: 19,
  },
  {
    // Raclette maison: 2
    recipeId: 2,
    // SAMEDI MIDI: 2
    menuId: 2,
  },
  {
    // Fish & chips de saumon: 1
    recipeId: 1,
    // DIMANCHE SOIR: 6
    menuId: 6,
  },
];

export const mockWeeklyIngredients: {
  newIngredient: IngredientInsert;
  menuId: number;
}[] = [
  {
    newIngredient: {
      // Mousse au chocolat: 11
      ingredientId: 11,
      quantity: 1,
      // Pot: 9
      unitId: 9,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // SAMEDI MIDI: 2
    menuId: 2,
  },
  {
    newIngredient: {
      // Pomme: 4
      ingredientId: 4,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // SAMEDI MIDI: 2
    menuId: 2,
  },
  {
    newIngredient: {
      // Prunes séchées: 12
      ingredientId: 12,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // SAMEDI MIDI: 2
    menuId: 2,
  },
  {
    newIngredient: {
      // Filet de poulet: 13
      ingredientId: 13,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Lentilles en conserve: 14
      ingredientId: 14,
      quantity: 1,
      // Boîte: 8
      unitId: 8,
      // LÉGUMES: 5
      menuCategoryId: 5,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Coquillettes: 15
      ingredientId: 15,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Purée de tomates: 16
      ingredientId: 16,
      quantity: 0.5,
      // Brique: 12
      unitId: 12,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Fond de poulet: 17
      ingredientId: 17,
      quantity: 1,
      // Cuillère à soupe: 4
      unitId: 4,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Ail semoule: 10
      ingredientId: 10,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Beurre: 18
      ingredientId: 18,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Lait: 1
      ingredientId: 1,
      quantity: 1,
      // Cuillère à soupe: 4
      unitId: 4,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Fines herbes: 9
      ingredientId: 9,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Sel: 8
      ingredientId: 8,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Citron: 19
      ingredientId: 19,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Eau: 45
      ingredientId: 45,
      quantity: 1,
      // Millilitre: 2
      unitId: 2,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Banane: 20
      ingredientId: 20,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // SAMEDI SOIR: 3
    menuId: 3,
  },
  {
    newIngredient: {
      // Œuf: 21
      ingredientId: 21,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // DIMANCHE MIDI: 5
    menuId: 5,
  },
  {
    newIngredient: {
      // Tomates cerises: 22
      ingredientId: 22,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // LÉGUMES: 5
      menuCategoryId: 5,
    },
    // DIMANCHE MIDI: 5
    menuId: 5,
  },
  {
    newIngredient: {
      // Champignons pleurotes: 23
      ingredientId: 23,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // LÉGUMES: 5
      menuCategoryId: 5,
    },
    // DIMANCHE MIDI: 5
    menuId: 5,
  },
  {
    newIngredient: {
      // Fromage à raclette: 46
      ingredientId: 46,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // DIMANCHE MIDI: 5
    menuId: 5,
  },
  {
    newIngredient: {
      // Riz: 24
      ingredientId: 24,
      quantity: 1,
      // Portion: 7
      unitId: 7,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // DIMANCHE MIDI: 5
    menuId: 5,
  },
  {
    newIngredient: {
      // Olives: 25
      ingredientId: 25,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // DIMANCHE MIDI: 5
    menuId: 5,
  },
  {
    newIngredient: {
      // Paprika: 26
      ingredientId: 26,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // DIMANCHE MIDI: 5
    menuId: 5,
  },
  {
    newIngredient: {
      // Ail semoule: 10
      ingredientId: 10,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // DIMANCHE MIDI: 5
    menuId: 5,
  },
  {
    newIngredient: {
      // Mousse au chocolat: 11
      ingredientId: 11,
      quantity: 1,
      // Pot: 9
      unitId: 9,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // DIMANCHE MIDI: 5
    menuId: 5,
  },
  {
    newIngredient: {
      // Banane: 20
      ingredientId: 20,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // DIMANCHE SOIR: 6
    menuId: 6,
  },
  {
    newIngredient: {
      // Jambon cru: 5
      ingredientId: 5,
      quantity: 1,
      // Tranche: 11
      unitId: 11,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // LUNDI MIDI: 8
    menuId: 8,
  },
  {
    newIngredient: {
      // Salade batavia: 31
      ingredientId: 31,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // LÉGUMES: 5
      menuCategoryId: 5,
    },
    // LUNDI MIDI: 8
    menuId: 8,
  },
  {
    newIngredient: {
      // Pois chiches en conserve: 32
      ingredientId: 32,
      quantity: 0.5,
      // Boîte: 8
      unitId: 8,
      // LÉGUMES: 5
      menuCategoryId: 5,
    },
    // LUNDI MIDI: 8
    menuId: 8,
  },
  {
    newIngredient: {
      // Olives: 25
      ingredientId: 25,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // LUNDI MIDI: 8
    menuId: 8,
  },
  {
    newIngredient: {
      // Vinaigrette: 34
      ingredientId: 34,
      quantity: null,
      // NULL
      unitId: null,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // LUNDI MIDI: 8
    menuId: 8,
  },
  {
    newIngredient: {
      // Mousse au chocolat: 11
      ingredientId: 11,
      quantity: 1,
      // Pot: 9
      unitId: 9,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // LUNDI MIDI: 8
    menuId: 8,
  },
  {
    newIngredient: {
      // Kiwi: 35
      ingredientId: 35,
      quantity: 0.5,
      // Pièce: 1
      unitId: 1,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // LUNDI MIDI: 8
    menuId: 8,
  },
  {
    newIngredient: {
      // Prunes séchées: 12
      ingredientId: 12,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // LUNDI MIDI: 8
    menuId: 8,
  },
  {
    newIngredient: {
      // Poitrine de porc: 36
      ingredientId: 36,
      quantity: 1,
      // Tranche: 11
      unitId: 11,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // LUNDI SOIR: 9
    menuId: 9,
  },
  {
    newIngredient: {
      // Champignons pleurotes: 23
      ingredientId: 23,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // LÉGUMES: 5
      menuCategoryId: 5,
    },
    // LUNDI SOIR: 9
    menuId: 9,
  },
  {
    newIngredient: {
      // Penne: 37
      ingredientId: 37,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // LUNDI SOIR: 9
    menuId: 9,
  },
  {
    newIngredient: {
      // Huile d'olive: 7
      ingredientId: 7,
      quantity: 1,
      // Cuillère à soupe: 4
      unitId: 4,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // LUNDI SOIR: 9
    menuId: 9,
  },
  {
    newIngredient: {
      // Sauce soja: 38
      ingredientId: 38,
      quantity: null,
      // NULL
      unitId: null,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // LUNDI SOIR: 9
    menuId: 9,
  },
  {
    newIngredient: {
      // Ail semoule: 10
      ingredientId: 10,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // LUNDI SOIR: 9
    menuId: 9,
  },
  {
    newIngredient: {
      // Fines herbes: 9
      ingredientId: 9,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // LUNDI SOIR: 9
    menuId: 9,
  },
  {
    newIngredient: {
      // Sauce béarnaise: 39
      ingredientId: 39,
      quantity: null,
      // NULL
      unitId: null,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // LUNDI SOIR: 9
    menuId: 9,
  },
  {
    newIngredient: {
      // Banane: 20
      ingredientId: 20,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // LUNDI SOIR: 9
    menuId: 9,
  },
  {
    newIngredient: {
      // Merguez: 40
      ingredientId: 40,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // MARDI MIDI: 11
    menuId: 11,
  },
  {
    newIngredient: {
      // Riz: 24
      ingredientId: 24,
      quantity: 1,
      // Portion: 7
      unitId: 7,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // MARDI MIDI: 11
    menuId: 11,
  },
  {
    newIngredient: {
      // Mousse au chocolat: 11
      ingredientId: 11,
      quantity: 1,
      // Pot: 9
      unitId: 9,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // MARDI MIDI: 11
    menuId: 11,
  },
  {
    newIngredient: {
      // Kiwi: 35
      ingredientId: 35,
      quantity: 0.5,
      // Pièce: 1
      unitId: 1,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // MARDI MIDI: 11
    menuId: 11,
  },
  {
    newIngredient: {
      // Prunes séchées: 12
      ingredientId: 12,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // MARDI MIDI: 11
    menuId: 11,
  },
  {
    newIngredient: {
      // Poitrine de porc: 36
      ingredientId: 36,
      quantity: 1,
      // Tranche: 11
      unitId: 11,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // MARDI SOIR: 12
    menuId: 12,
  },
  {
    newIngredient: {
      // Pommes de terre grenailles: 6
      ingredientId: 6,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // LÉGUMES: 5
      menuCategoryId: 5,
    },
    // MARDI SOIR: 12
    menuId: 12,
  },
  {
    newIngredient: {
      // Fromage à raclette: 46
      ingredientId: 46,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // MARDI SOIR: 12
    menuId: 12,
  },
  {
    newIngredient: {
      // Huile d'olive: 7
      ingredientId: 7,
      quantity: 1,
      // Cuillère à soupe: 4
      unitId: 4,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MARDI SOIR: 12
    menuId: 12,
  },
  {
    newIngredient: {
      // Ail semoule: 10
      ingredientId: 10,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MARDI SOIR: 12
    menuId: 12,
  },
  {
    newIngredient: {
      // Fines herbes: 9
      ingredientId: 9,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MARDI SOIR: 12
    menuId: 12,
  },
  {
    newIngredient: {
      // Fines herbes: 8
      ingredientId: 8,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MARDI SOIR: 12
    menuId: 12,
  },
  {
    newIngredient: {
      // Banane: 20
      ingredientId: 20,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // MARDI SOIR: 12
    menuId: 12,
  },
  {
    newIngredient: {
      // Filet de poulet: 13
      ingredientId: 13,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Champignons pleurotes: 23
      ingredientId: 23,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // LÉGUMES: 5
      menuCategoryId: 5,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Coquillettes: 15
      ingredientId: 15,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Citron: 19
      ingredientId: 19,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Ail semoule: 10
      ingredientId: 10,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Beurre: 18
      ingredientId: 18,
      quantity: null,
      // NULL
      unitId: null,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Huile d'olive: 7
      ingredientId: 7,
      quantity: 2,
      // Cuillère à soupe: 4
      unitId: 4,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Fines herbes: 9
      ingredientId: 9,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Miel: 30
      ingredientId: 30,
      quantity: 1,
      // Cuillère à soupe: 4
      unitId: 4,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Sel: 8
      ingredientId: 8,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Mousse au chocolat: 11
      ingredientId: 11,
      quantity: 1,
      // Pot: 9
      unitId: 9,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Kiwi: 35
      ingredientId: 35,
      quantity: 0.5,
      // Pièce: 1
      unitId: 1,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Prunes séchées: 12
      ingredientId: 12,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // MERCREDI MIDI: 14
    menuId: 14,
  },
  {
    newIngredient: {
      // Poitrine de porc: 36
      ingredientId: 36,
      quantity: 1,
      // Tranche: 11
      unitId: 11,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // MERCREDI SOIR: 15
    menuId: 15,
  },
  {
    newIngredient: {
      // Spaghettis: 41
      ingredientId: 41,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // MERCREDI SOIR: 15
    menuId: 15,
  },
  {
    newIngredient: {
      // Olives: 25
      ingredientId: 25,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // MERCREDI SOIR: 15
    menuId: 15,
  },
  {
    newIngredient: {
      // Sauce béarnaise: 39
      ingredientId: 39,
      quantity: null,
      // NULL
      unitId: null,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI SOIR: 15
    menuId: 15,
  },
  {
    newIngredient: {
      // Beurre: 18
      ingredientId: 18,
      quantity: null,
      // NULL
      unitId: null,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI SOIR: 15
    menuId: 15,
  },
  {
    newIngredient: {
      // Ail semoule: 10
      ingredientId: 10,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI SOIR: 15
    menuId: 15,
  },
  {
    newIngredient: {
      // Sel: 8
      ingredientId: 8,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // MERCREDI SOIR: 15
    menuId: 15,
  },
  {
    newIngredient: {
      // Banane: 20
      ingredientId: 20,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // MERCREDI SOIR: 15
    menuId: 15,
  },
  {
    newIngredient: {
      // Merguez: 40
      ingredientId: 40,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // JEUDI MIDI: 17
    menuId: 17,
  },
  {
    newIngredient: {
      // Pommes de terre grenailles: 6
      ingredientId: 6,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // LÉGUMES: 5
      menuCategoryId: 5,
    },
    // JEUDI MIDI: 17
    menuId: 17,
  },
  {
    newIngredient: {
      // Ail semoule: 10
      ingredientId: 10,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // JEUDI MIDI: 17
    menuId: 17,
  },
  {
    newIngredient: {
      // Huile d'olive: 7
      ingredientId: 7,
      quantity: 1,
      // Cuillère à soupe: 4
      unitId: 4,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // JEUDI MIDI: 17
    menuId: 17,
  },
  {
    newIngredient: {
      // Fines herbes: 9
      ingredientId: 9,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // JEUDI MIDI: 17
    menuId: 17,
  },
  {
    newIngredient: {
      // Sel: 8
      ingredientId: 8,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // JEUDI MIDI: 17
    menuId: 17,
  },
  {
    newIngredient: {
      // Mousse au chocolat: 11
      ingredientId: 11,
      quantity: 1,
      // Pot: 9
      unitId: 9,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // JEUDI MIDI: 17
    menuId: 17,
  },
  {
    newIngredient: {
      // Kiwi: 35
      ingredientId: 35,
      quantity: 0.5,
      // Pièce: 1
      unitId: 1,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // JEUDI MIDI: 17
    menuId: 17,
  },
  {
    newIngredient: {
      // Prunes séchées: 12
      ingredientId: 12,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // JEUDI MIDI: 17
    menuId: 17,
  },
  {
    newIngredient: {
      // Coulommiers: 33
      ingredientId: 33,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // JEUDI SOIR: 18
    menuId: 18,
  },
  {
    newIngredient: {
      // Olives: 25
      ingredientId: 25,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // JEUDI SOIR: 18
    menuId: 18,
  },
  {
    newIngredient: {
      // Mousse au chocolat: 11
      ingredientId: 11,
      quantity: 1,
      // Pot: 9
      unitId: 9,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // JEUDI SOIR: 18
    menuId: 18,
  },
  {
    newIngredient: {
      // Filet de saumon: 27
      ingredientId: 27,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // VENDREDI MIDI: 20
    menuId: 20,
  },
  {
    newIngredient: {
      // Coquillettes: 15
      ingredientId: 15,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // VENDREDI MIDI: 20
    menuId: 20,
  },
  {
    newIngredient: {
      // Sauce soja: 38
      ingredientId: 38,
      quantity: null,
      // NULL
      unitId: null,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // VENDREDI MIDI: 20
    menuId: 20,
  },
  {
    newIngredient: {
      // Mousse au chocolat: 11
      ingredientId: 11,
      quantity: 1,
      // Pot: 9
      unitId: 9,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // VENDREDI MIDI: 20
    menuId: 20,
  },
  {
    newIngredient: {
      // Steak haché: 42
      ingredientId: 42,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // PROTÉINES: 4
      menuCategoryId: 4,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Pois chiches en conserve: 32
      ingredientId: 32,
      quantity: 0.5,
      // Boîte: 8
      unitId: 8,
      // LÉGUMES: 5
      menuCategoryId: 5,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Spaghettis: 41
      ingredientId: 41,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Purée de tomates: 16
      ingredientId: 16,
      quantity: 0.5,
      // Brique: 12
      unitId: 12,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Ail semoule: 10
      ingredientId: 10,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Fines herbes: 9
      ingredientId: 9,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Paprika: 26
      ingredientId: 26,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Sel: 8
      ingredientId: 8,
      quantity: 1,
      // Pincée: 17
      unitId: 17,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Huile d'olive: 7
      ingredientId: 7,
      quantity: null,
      // NULL
      unitId: null,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Fond de veau: 43
      ingredientId: 43,
      quantity: 0.5,
      // Cuillère à soupe: 4
      unitId: 4,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Lait: 1
      ingredientId: 1,
      quantity: 3,
      // Cuillère à soupe: 4
      unitId: 4,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Eau: 45
      ingredientId: 45,
      quantity: 100,
      // Millilitre: 2
      unitId: 2,
      // AUTRE: 8
      menuCategoryId: 8,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Coulommiers: 33
      ingredientId: 33,
      quantity: 1,
      // Poignée: 18
      unitId: 18,
      // ACCOMPAGNEMENT REPAS: 6
      menuCategoryId: 6,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
  {
    newIngredient: {
      // Kiwi: 35
      ingredientId: 35,
      quantity: 1,
      // Pièce: 1
      unitId: 1,
      // DESSERT: 7
      menuCategoryId: 7,
    },
    // VENDREDI SOIR: 21
    menuId: 21,
  },
];
