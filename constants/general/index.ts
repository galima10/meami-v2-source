import type { Href } from "expo-router";

// Database
export const QUANTITY_SCALE: number = 100;

// Styles
export const FONT_BASE = 16;
export const TYPE_SCALE = 1.25;

// App
export const SPLASH_SCREEN_DELAY = 1; // 5 sec

// Routes
export const ROUTES: {
  [tabKey: string]: {
    [routeKey: string]: Href;
  };
} = {
  menu: {
    calendar: "/menuTab/MenuCalendarScreen",
    list: "/menuTab/MenuListScreen",
    modify: "/menuTab/MenuModifyScreen",
  },
  cart: {
    default: "/cartTab",
    list: "/cartTab/CartListScreen",
    modify: "/cartTab/CartModifyScreen",
  },
  stock: {
    default: "/stockTab",
    recipesList: "/stockTab/StockRecipesScreen",
    recipeInfos: "/stockTab/StockRecipesScreen/StockInfosRecipeScreen",
    recipeForm: "/stockTab/StockRecipesScreen/StockRecipeFormScreen",
    ingredientsList: "/stockTab/StockIngredientsScreen",
    ingredientInfos:
      "/stockTab/StockIngredientsScreen/StockInfosIngredientScreen",
    ingredientForm:
      "/stockTab/StockIngredientsScreen/StockIngredientFormScreen",
    productsList: "/stockTab/StockProductsScreen",
    productInfos: "/stockTab/StockProductsScreen/StockInfosProductScreen",
    productForm: "/stockTab/StockProductsScreen/StockProductFormScreen",
  },
  infos: {
    default: "/infosTab",
    cookingList: "/infosTab/InfosCookingScreen",
    cookingForm: "/infosTab/InfosCookingScreen/InfosCookingFormScreen",
    storageList: "/infosTab/InfosStorageScreen",
    storageForm: "/infosTab/InfosStorageScreen/InfosStorageFormScreen",
  },
};
