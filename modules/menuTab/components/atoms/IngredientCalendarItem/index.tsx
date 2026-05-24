import { View, StyleSheet } from "react-native";
import { AppText } from "@modules/shared/components/primitives/AppText";
import theme from "@constants/themes";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import { useAppSelector } from "@modules/shared/hooks/redux";

interface IngredientCalendarItemProps {
  ingredientMenu: IngredientMenu;
}

export default function IngredientCalendarItem({
  ingredientMenu,
}: IngredientCalendarItemProps) {
  const ingredientName = useAppSelector(
    (state) => state.ingredient.ingredients[ingredientMenu.ingredientId]?.name,
  );
  const unitAbbr = useAppSelector((state) =>
    ingredientMenu.unitId
      ? state.unit.units[ingredientMenu.unitId]?.abbreviation
      : null,
  );
  return (
    <View style={styles.ingredientContainer}>
      <AppText>{ingredientName}</AppText>
      {ingredientMenu?.quantity && (
        <AppText
          style={{
            color: theme.properties.transparentBrown,
          }}
        >
          {" | "}
          {ingredientMenu?.quantity}{" "}
          {unitAbbr}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
