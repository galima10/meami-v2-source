import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  fetchDaysThunk,
  fetchMenuCategoriesThunk,
  fetchMomentsThunk,
  fetchStorageLocationsThunk,
} from "@stores/thunks/seeds";
import { useAppDispatch, useAppSelector } from "features/shared/hooks/redux";
import type { CookingInfo } from "@stores/features/cookingInfos";
import type { IngredientCategory } from "@stores/features/ingredientCategories";
import type { Unit } from "@stores/features/units";

import {
  createIngredientCategoryThunk,
  deleteIngredientCategoryThunk,
  fetchIngredientCategoriesThunk,
} from "@stores/thunks/ingredientCategories";
import {
  createUnitThunk,
  fetchUnitsThunk,
  deleteUnitThunk,
  updateUnitThunk,
} from "@stores/thunks/units";

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
  name: "Produit laitier",
};

const unit1: Unit = {
  name: "Bouteille",
  abbreviation: "btle",
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

  const { units } = useAppSelector((state) => state.unit);
  const router = useRouter();

  async function handleAdd() {
    try {
      // const result = await dispatch(
      //   createIngredientCategoryThunk(ingredientCategory1),
      // ).unwrap();
      // const result = await dispatch(createUnitThunk(unit1)).unwrap();
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  async function handleDelete() {
    try {
      // const result = await dispatch(deleteIngredientCategoryThunk(5)).unwrap();
      const result = await dispatch(deleteUnitThunk(3)).unwrap();
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  async function handleUpdate() {
    
  }

  useEffect(() => {
    dispatch(fetchDaysThunk());
    dispatch(fetchStorageLocationsThunk());
    dispatch(fetchMenuCategoriesThunk());
    dispatch(fetchMomentsThunk());

    dispatch(fetchIngredientCategoriesThunk());
    dispatch(fetchUnitsThunk());
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
      {ingredientCategories.map((ic) => (
        <Text key={ic.id}>
          {ic.name} :: {ic.id}{" "}
        </Text>
      ))}
      {units.map((u) => (
        <Text key={u.id}>
          {u.name} - {u.abbreviation} :: {u.id}{" "}
        </Text>
      ))}
      <View style={styles.infosContainer}>
        {days.map((d) => (
          <Text key={d.id} style={styles.littleText}>
            {d.name} : {d.id}{" "}
          </Text>
        ))}
        {moments.map((m) => (
          <Text key={m.id} style={styles.littleText}>
            {m.name} : {m.id}{" "}
          </Text>
        ))}
        {storageLocations.map((sl) => (
          <Text key={sl.id} style={styles.littleText}>
            {sl.name} : {sl.id}{" "}
          </Text>
        ))}
        {menuCategories.map((mc) => (
          <Text key={mc.id} style={styles.littleText}>
            {mc.name} : {mc.id}{" "}
          </Text>
        ))}
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
});

// dans la console, pour supprimer node_modules et package-lock.json dans un terminal windows : rmdir /s /q node_modules && del package-lock.json
