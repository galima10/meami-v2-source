import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAppSelector, useAppDispatch } from "@modules/shared/hooks/redux";

export default function TestButton() {
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { products } = useAppSelector((state) => state.product);
  const { recipes } = useAppSelector((state) => state.recipe);
  const handleTestLog = () => {
    console.log("ingredients", products);
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
