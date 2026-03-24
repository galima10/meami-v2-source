import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { getDb } from "@database/database";
import { useEffect } from "react";
import {
  createIngredientCategoryThunk,
  deleteIngredientCategoryThunk,
  fetchIngredientCategoriesThunk,
} from "@stores/thunks/ingredientCategories";
import {
  fetchDaysThunk,
  fetchMenuCategoriesThunk,
  fetchMomentsThunk,
  fetchStorageLocationsThunk,
} from "@stores/thunks/seeds";
import { useAppDispatch, useAppSelector } from "features/shared/hooks/redux";
import type { CookingInfo } from "@stores/features/cookingInfos";
import type { IngredientCategory } from "@stores/features/ingredientCategories";

const cookingInfo1: CookingInfo = {
  cookingInfoId: 1,
  ingredientId: 3,
  ingredientName: "Poulet",
  preparationTypes: [
    {
      name: "Grillé",
      cookingDurations: [
        {
          ustensilName: "Air fryer",
          duration: 10,
          temperature: 180,
        },
      ],
    },
  ],
};

const ingredientCategory1: IngredientCategory = {
  name: "Produit laitiedzd",
};

export default function Splash() {
  const dispatch = useAppDispatch();
  // const { cookingInfos, loading, error } = useAppSelector(
  //   (state) => state.cookingInfo,
  // );
  const { ingredientCategories } = useAppSelector(
    (state) => state.ingredientCategory,
  );
  const { menuCategories, storageLocations, days, moments } = useAppSelector(
    (state) => state.seed,
  );
  const router = useRouter();

  async function handleAdd() {
    try {
      const result = await dispatch(
        createIngredientCategoryThunk(ingredientCategory1),
      ).unwrap();
      console.log("Thunk resolved:", result);
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  async function handleDelete() {
    try {
      const result = await dispatch(deleteIngredientCategoryThunk(5)).unwrap();
      console.log("Thunk resolved:", result);
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  useEffect(() => {
    dispatch(fetchDaysThunk());
    dispatch(fetchStorageLocationsThunk());
    dispatch(fetchMenuCategoriesThunk());
    dispatch(fetchMomentsThunk());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash Screen</Text>
      <Pressable
        // onPress={() => router.replace("/(tabs)/menuTab/MenuCalendarScreen")}
        onPress={() => handleAdd()}
      >
        <Text>Test</Text>
      </Pressable>
      <Pressable
        // onPress={() => router.replace("/(tabs)/menuTab/MenuCalendarScreen")}
        onPress={() => handleDelete()}
      >
        <Text>Test2</Text>
      </Pressable>
      {/* {ingredientCategories.map((ic) => (
        <Text key={ic.id}>
          {ic.name} : {ic.id}{" "}
        </Text>
      ))} */}
      <Text>Jours :</Text>
      {days.map((d) => (
        <Text key={d.id}>
          {d.name} : {d.id}{" "}
        </Text>
      ))}
      <Text>Moments :</Text>
      {moments.map((m) => (
        <Text key={m.id}>
          {m.name} : {m.id}{" "}
        </Text>
      ))}
      <Text>Lieux de stockage :</Text>
      {storageLocations.map((sl) => (
        <Text key={sl.id}>
          {sl.name} : {sl.id}{" "}
        </Text>
      ))}
      <Text>Catégories du menu :</Text>
      {menuCategories.map((mc) => (
        <Text key={mc.id}>
          {mc.name} : {mc.id}{" "}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

// dans la console, pour supprimer node_modules et package-lock.json dans un terminal windows : rmdir /s /q node_modules && del package-lock.json
