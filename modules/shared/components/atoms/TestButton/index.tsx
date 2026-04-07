import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAppSelector, useAppDispatch } from "@modules/shared/hooks/redux";
import { getDb } from "@database/database";

export default function TestButton() {
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { products } = useAppSelector((state) => state.product);
  const { recipes } = useAppSelector((state) => state.recipe);
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { days } = useAppSelector((state) => state.seed);
  const { units } = useAppSelector((state) => state.unit);

  const handleTestLog = async () => {
    // const db = await getDb();
    // const test = await db.getAllAsync(
    // `
    // SELECT id_recipes, id_ingredients, quantity
    // FROM recipe_ingredient_links
    // WHERE quantity IS NULL OR quantity < 1;
    // `,
    // );
    console.log(units);
  };
  return (
    <TouchableOpacity style={styles.testButton} onPress={handleTestLog}>
      <Text style={{ color: "transparent" }}>Reset</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  testButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 999,
  },
});
