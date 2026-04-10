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
import { fetchStorageInfosThunk } from "@stores/thunks/storageInfos";
import { fetchUnitsThunk } from "@stores/thunks/units";

import { fetchCookingInfosThunk } from "@stores/thunks/cookingInfos";
import { fetchCookingUstensilsThunk } from "@stores/thunks/cookingUstensils";
import { fetchIngredientsThunk } from "@stores/thunks/ingredients";
import {
  fetchWeeklyMenuThunk,
  fetchAllMenusThunk,
  addIngredientToMenuThunk,
  addRecipeToMenuThunk,
  removeIngredientToMenuThunk,
  removeMenuThunk,
  removeWeeklyMenuThunk,
} from "@stores/thunks/weeklyMenu";
import type {
  WeeklyMenu,
  MenuIngredients,
  IngredientMenu,
} from "@stores/features/weeklyMenu";
import type { Recipe } from "@stores/features/recipes";
import {
  weeklyMenuToUi,
  MomentUi,
  MenuUi,
} from "@utils/dataToUi/weeklyMenuToUi";
import type { IngredientInsert } from "@stores/thunks/weeklyMenu";

const ingredient: IngredientInsert = {
  menuCategoryId: 4,
  ingredientId: 13,
  quantity: 1,
  unitId: 1,
};

export default function Splash() {
  const dispatch = useAppDispatch();
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { moments, days, menuCategories } = useAppSelector(
    (state) => state.seed,
  );
  // const router = useRouter();
  const weeklyMenuUi = weeklyMenuToUi(weeklyMenu, days, moments);

  async function handleAdd() {
    try {
      // const result = await dispatch(
      //   addRecipeToMenuThunk({ recipeId: 3, menuId: 1 }),
      // ).unwrap();
      // const result = await dispatch(
      //   addIngredientToMenuThunk({ newIngredient: ingredient, menuId: 2 }),
      // ).unwrap();
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  async function handleDelete() {
    try {
      // const result = await dispatch(removeWeeklyMenuThunk()).unwrap();
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  async function handleUpdate() {
    try {
      // const result = await dispatch(
      //   updateIngredientThunk(newIngredient1),
      // ).unwrap();
    } catch (err) {
      console.error("Thunk rejected:", err);
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
    async function fetchMenus() {
      await dispatch(fetchAllMenusThunk());
      await dispatch(fetchWeeklyMenuThunk());
    }
    fetchMenus();
  }, []);

  return (
    <View style={styles.container}>
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
        <Text style={styles.button}>Modifier</Text>
      </Pressable>
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
                                      }
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
      </View>
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
