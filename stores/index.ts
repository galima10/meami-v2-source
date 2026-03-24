import { configureStore } from "@reduxjs/toolkit";
import cookingInfoReducer from "./features/cookingInfos";
import cookingUstensilReducer from "./features/cookingUstensils";
import ingredientCategoryReducer from "./features/ingredientCategories";
import ingredientReducer from "./features/ingredients";
import manualAdjustementReducer from "./features/manualAdjustements";
import productReducer from "./features/products";
import recipeCategoryReducer from "./features/recipeCategories";
import recipeReducer from "./features/recipes";
import shoppingListReducer from "./features/shoppingList";
import storageInfoReducer from "./features/storageInfos";
import unitReducer from "./features/units";
import weeklyMenuReducer from "./features/weeklyMenu";
import seedReducer from "./features/seeds";

export const store = configureStore({
  reducer: {
    cookingInfo: cookingInfoReducer,
    cookingUstensil: cookingUstensilReducer,
    ingredientCategory: ingredientCategoryReducer,
    ingredient: ingredientReducer,
    manualAdjustement: manualAdjustementReducer,
    product: productReducer,
    recipeCategory: recipeCategoryReducer,
    recipe: recipeReducer,
    shoppingList: shoppingListReducer,
    storageInfo: storageInfoReducer,
    unit: unitReducer,
    weeklyMenu: weeklyMenuReducer,
    seed: seedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
