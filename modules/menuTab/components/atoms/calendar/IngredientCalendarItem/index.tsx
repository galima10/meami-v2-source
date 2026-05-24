import { View, StyleSheet } from "react-native";
import { AppText } from "@modules/shared/components/primitives/AppText";
import theme from "@constants/themes";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import { useAppSelector } from "@modules/shared/hooks/redux";

interface IngredientCalendarItemProps {
  ingredient: IngredientMenu;
}

export default function IngredientCalendarItem({
  ingredient,
}: IngredientCalendarItemProps) {
  const ingrName = useAppSelector(
    (state) => state.ingredient.ingredients[ingredient?.ingredientId].name,
  );
  const unitAbbr = useAppSelector((state) =>
    ingredient?.unitId != null
      ? (state.unit.units?.[ingredient.unitId]?.abbreviation ?? null)
      : null,
  );
  return (
    <View style={styles.ingredientContainer}>
      <AppText>{ingrName}</AppText>
      {ingredient?.quantity && (
        <AppText
          style={{
            color: theme.properties.transparentBrown,
          }}
        >
          {" | "}
          {ingredient?.quantity} {ingredient?.unitId && unitAbbr}
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
