import React from "react";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { StyleSheet } from "react-native";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import { useAppSelector } from "@modules/shared/hooks/redux";
import { typography } from "@constants/styles";
import theme from "@constants/themes";

interface IngredientOtherItemProps {
  ingredient: IngredientMenu;
  isLast: boolean;
}

export default function IngredientOtherItem({
  ingredient,
  isLast,
}: IngredientOtherItemProps) {
  const ingrName = useAppSelector(
    (state) => state.ingredient.ingredients[ingredient?.ingredientId].name,
  );
  const unitAbbr = useAppSelector((state) =>
    ingredient?.unitId != null
      ? (state.unit.units?.[ingredient.unitId]?.abbreviation ?? null)
      : null,
  );
  return (
    <React.Fragment>
      <AppText style={styles.text}>{ingrName}</AppText>
      {ingredient?.quantity && (
        <AppText style={[styles.text, styles.quantity]}>
          {" | "}
          {ingredient?.quantity && ingredient?.quantity}{" "}
          {ingredient?.unitId && unitAbbr}
        </AppText>
      )}
      <AppText style={styles.text}>{!isLast && " • "}</AppText>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: typography.small,
    fontWeight: theme.properties.semibold,
  },
  quantity: {
    color: theme.properties.vibrantOrange,
    fontWeight: theme.properties.regular,
  },
});
