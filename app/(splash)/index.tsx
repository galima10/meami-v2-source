import { useAppDispatch, useAppSelector } from "modules/shared/hooks/redux";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { fetchIngredientCategoriesThunk } from "@stores/thunks/ingredientCategories";
import { fetchProductsThunk } from "@stores/thunks/products";
import { fetchRecipeCategoriesThunk } from "@stores/thunks/recipeCategories";
import {
  createRecipeThunk,
  deleteRecipeThunk,
  fetchRecipesThunk,
  updateRecipeThunk,
} from "@stores/thunks/recipes";
import {
  fetchAllMenusThunk,
  fetchWeeklyMenuThunk,
  addIngredientToMenuThunk,
} from "@stores/thunks/weeklyMenu";
import { fetchStorageInfosThunk } from "@stores/thunks/storageInfos";
import { fetchUnitsThunk } from "@stores/thunks/units";
import type { IngredientMenu } from "@stores/features/weeklyMenu";

import { fetchCookingInfosThunk } from "@stores/thunks/cookingInfos";
import { fetchCookingUstensilsThunk } from "@stores/thunks/cookingUstensils";
import { fetchIngredientsThunk } from "@stores/thunks/ingredients";
import {
  LoadShoppingListService,
  ResetShoppingListService,
} from "@services/shoppingList";
import {
  fetchShoppingListThunk,
  addItemToShoppingThunk,
  removeItemToShoppingThunk,
  setShoppingListItemQuantityThunk,
} from "@stores/thunks/shoppingList";
import {
  weeklyMenuToUi,
  MomentUi,
  MenuUi,
} from "@utils/dataToUi/weeklyMenuToUi";
import {
  fetchShoppingManualChecksThunk,
  fetchStockManualChecksThunk,
  setIngredientShoppingCheckThunk,
} from "@stores/thunks/manualAdjustements";
import {
  LoadShoppingManualChecksService,
  ResetShoppingManualChecksService,
} from "@services/manualAdjustements";
import {
  resetShoppingAdjustements,
  ManualAdjustementItem,
} from "@stores/features/manualAdjustements";
import type {
  ShoppingListIngredient,
  ShoppingListProduct,
} from "@stores/features/shoppingList";
import { resetShoppingList } from "@stores/features/shoppingList";

export default function Splash() {
  const dispatch = useAppDispatch();
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { products } = useAppSelector((state) => state.product);
  const { units } = useAppSelector((state) => state.unit);
  const { shoppingChecks, stockChecks } = useAppSelector(
    (state) => state.manualAdjustement,
  );
  const { ingredientCategories } = useAppSelector(
    (state) => state.ingredientCategory,
  );
  const { ingredientsShopping, productsShopping } = useAppSelector(
    (state) => state.shoppingList,
  );
  const { moments, days, menuCategories } = useAppSelector(
    (state) => state.seed,
  );
  // const router = useRouter();
  const weeklyMenuUi = weeklyMenuToUi(weeklyMenu, days, moments);

  async function handleAdd() {
    try {
      const result = await dispatch(
        setIngredientShoppingCheckThunk({
          ingredientId: 1,
          checked: false,
          type: "shopping",
        }),
      ).unwrap();
      // const result = await dispatch(
      //   addItemToShoppingThunk({
      //     newItemId: 1,
      //     quantityNeeded: 1,
      //     type: "ingredients",
      //   }),
      // ).unwrap();
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  async function handleDelete() {
    try {
      // const result = await dispatch(
      //   removeItemToShoppingThunk({ itemId: 1, type: "ingredients" }),
      // ).unwrap();
      // await ResetShoppingListService();
      // dispatch(resetShoppingList());
      await ResetShoppingManualChecksService();
      dispatch(resetShoppingAdjustements());
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  async function handleUpdate() {
    try {
      // const result = await dispatch(
      //   updateIngredientThunk(newIngredient1),
      // ).unwrap();
      // await LoadShoppingListService();
      // await dispatch(fetchShoppingListThunk());
      await LoadShoppingManualChecksService();
      await dispatch(fetchShoppingManualChecksThunk());
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    dispatch(fetchStorageInfosThunk());
    dispatch(fetchCookingInfosThunk());
    dispatch(fetchCookingUstensilsThunk());
    dispatch(fetchIngredientCategoriesThunk());
    dispatch(fetchRecipeCategoriesThunk());
    dispatch(fetchUnitsThunk());
    dispatch(fetchProductsThunk());
    dispatch(fetchIngredientsThunk());
    dispatch(fetchRecipesThunk());
    dispatch(fetchShoppingListThunk());
    async function fetchMenus() {
      await dispatch(fetchAllMenusThunk());
      await dispatch(fetchWeeklyMenuThunk());
    }
    fetchMenus();
    dispatch(fetchShoppingManualChecksThunk());
  }, []);

  // useEffect(() => {
  //   console.log(shoppingChecks);
  // }, [shoppingChecks]);

  return (
    <View style={styles.container}>
      <View style={styles.infosContainer}>
        {/* {(Object.entries(weeklyMenuUi) as [string, MomentUi][]).map(
          ([keyDay, moment], dayIndex) => {
            return (
              <View key={`day-${dayIndex}`}>
                <Text style={styles.littleText}>{keyDay}</Text>
                <View>
                  {(Object.entries(moment) as [string, MenuUi][]).map(
                    ([keyMoment, menu], momentIndex) => {
                      return (
                        <View key={`moment-${momentIndex}`}>
                          <Text style={styles.littleText}>{keyMoment}</Text>
                          <Text style={styles.littleText}>{menu.id}</Text>
                          {(
                            Object.entries(menu.ingredients) as [
                              string,
                              IngredientMenu[],
                            ][]
                          ).map(([key, value], menuCategoryIndex) => {
                            return (
                              <View key={`menuCategory-${menuCategoryIndex}`}>
                                <Text style={styles.littleText}>
                                  {menuCategories[Number(key)].name}
                                </Text>
                                {value.map((item, ingredientIndex) => {
                                  return (
                                    <Text
                                      key={`ingredients-${ingredientIndex}`}
                                      style={styles.littleText}
                                    >
                                      {
                                        ingredients[Number(item?.ingredientId)]
                                          ?.name
                                      }{" "}
                                      - quantité : {item.quantity}
                                    </Text>
                                  );
                                })}
                              </View>
                            );
                          })}
                        </View>
                      );
                    },
                  )}
                </View>
              </View>
            );
          },
        )} */}
        {(
          Object.entries(shoppingChecks) as [string, ManualAdjustementItem][]
        ).map(([key, values]) => {
          return (
            <Text key={`check-${key}`}>
              {ingredients[Number(key)]?.name} - {values.usageCount} fois -{" "}
              {units[ingredients[Number(key)]?.unitId]?.abbreviation} -{" "}
              {values.checked ? "fait" : "pas fait"}
            </Text>
          );
        })}
        {(
          Object.entries(ingredientsShopping) as [
            string,
            ShoppingListIngredient,
          ][]
        ).map(([key, values]) => {
          return (
            <View key={key}>
              <Text>
                {ingredients[Number(key)]?.name}
                {/* {key} */}
              </Text>
              <Text>
                {values.quantityBuyed} / {values.quantityNeeded}{" "}
                {units[values.unitId]?.abbreviation}
              </Text>
            </View>
          );
        })}
        {(
          Object.entries(productsShopping) as [string, ShoppingListProduct][]
        ).map(([key, values]) => {
          return (
            <View key={key}>
              <Text>{products[Number(key)]?.name}</Text>
              <Text>
                {values.quantityBuyed} / {values.quantityNeeded}
              </Text>
            </View>
          );
        })}
      </View>
      <Pressable
        // onPress={() => router.replace("/(tabs)/menuTab/MenuCalendarScreen")}
        onPress={() => handleAdd()}
      >
        <Text style={styles.button}>Ajouter</Text>
      </Pressable>
      <Pressable onPress={() => handleDelete()}>
        <Text style={styles.button}>Supprimer</Text>
      </Pressable>
      <Pressable onPress={() => handleUpdate()}>
        <Text style={styles.button}>Loader</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 16,
  },
  infosContainer: {
    position: "absolute",
    left: 16,
    top: 24,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  littleText: {
    fontSize: 9,
  },
  button: {
    fontSize: 24,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

// dans la console, pour supprimer node_modules et package-lock.json dans un terminal windows : rmdir /s /q node_modules && del package-lock.json
