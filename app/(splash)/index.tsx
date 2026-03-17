import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { getDb } from "@database/database";
import { useEffect } from "react";
import {
  setCookingInfoThunk,
  fetchCookingInfosThunk,
} from "@stores/thunks/cookingInfos";
import { useAppDispatch, useAppSelector } from "features/shared/hooks/redux";
import { CookingInfo } from "@stores/features/cookingInfos";

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

export default function Splash() {
  const dispatch = useAppDispatch();
  const { cookingInfos, loading, error } = useAppSelector(
    (state) => state.cookingInfo,
  );
  const router = useRouter();

  async function handleAdd() {
    try {
      const result = await dispatch(setCookingInfoThunk(cookingInfo1)).unwrap();
      // console.log("Thunk resolved:", result);
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }
  async function testSelect() {
    const db = await getDb();
    const days = await db.getAllAsync<{ id?: number; name: string }>(
      "SELECT * FROM cooking_infos",
    );
    console.log(days);
  }

  // testSelect();

  useEffect(() => {
    dispatch(fetchCookingInfosThunk());
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
        onPress={() => testSelect()}
      >
        <Text>Test2</Text>
      </Pressable>
      {cookingInfos.map((info) => (
        <Text key={info.cookingInfoId}>{info.ingredientName}</Text>
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
