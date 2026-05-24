import { View, StyleSheet } from "react-native";
import { AppText } from "@modules/shared/components/primitives/AppText";
import theme from "@constants/themes";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import { useIdSelectors } from "@modules/shared/hooks/useIdSelectors";

interface IngredientCalendarItemProps {
  ingredient: IngredientMenu;
}

export default function IngredientCalendarItem({
  ingredient,
}: IngredientCalendarItemProps) {
  const { getIngredientNameById, getUnitAbbrById } = useIdSelectors();
  return (
    <View style={styles.ingredientContainer}>
      <AppText>{getIngredientNameById(ingredient?.ingredientId)}</AppText>
      {ingredient?.quantity && (
        <AppText
          style={{
            color: theme.properties.transparentBrown,
          }}
        >
          {" | "}
          {ingredient?.quantity} {getUnitAbbrById(ingredient?.unitId)}
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
