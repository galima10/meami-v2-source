import type { Href } from "expo-router";
import type { TabKey } from "@app-types/TabKey";

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

export const TAB_ROUTES: Record<TabKey, string> = {
  menuTab: "/menuTab/MenuCalendarScreen",
  cartTab: "/cartTab",
  stockTab: "/stockTab",
  infosTab: "/infosTab",
};

export const TAB_FOCUS: Record<TabKey, string> = {
  menuTab: "/menuTab",
  cartTab: "/cartTab",
  stockTab: "/stockTab",
  infosTab: "/infosTab",
};