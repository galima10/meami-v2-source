import { View, StyleSheet } from "react-native";
import AppButton from "@modules/shared/components/atoms/buttons/AppButton";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import AppCheckBox from "@modules/shared/components/primitives/AppCheckBox";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import QuantifierModule from "@modules/shared/components/molecules/QuantifierModule";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import type { Ingredients } from "@stores/features/ingredients";
import React from "react";
import { useMenuIngredientCard } from "@modules/menuTab/hooks/molecules/useMenuIngredientCard";

interface MenuIngredientCardProps {
  ingredient: IngredientMenu;
  ingredients: Ingredients;
  menuId: number;
}

function MenuIngredientCard({
  ingredient,
  ingredients,
  menuId,
}: MenuIngredientCardProps) {
  const {
    isQuantifiable,
    handleQuantifiable,
    quantity,
    handleOnChange,
    updateQuantity,
    normalize,
    setQuantityState,
    handleIncrementDecrementQuantity,
    handleRemoveIngredientToMenu,
  } = useMenuIngredientCard(ingredient, menuId);
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {ingredients[ingredient?.ingredientId].name}
      </AppText>
      <View style={styles.elements}>
        <AppIconButton
          icon="binIcon"
          type="outline"
          smallBin
          action={handleRemoveIngredientToMenu}
        />
        <View style={styles.quantityContainer}>
          <AppCheckBox
            style={styles.checkbox}
            checked={isQuantifiable}
            action={handleQuantifiable}
          />
          <View
            style={[
              styles.quantifierModule,
              !isQuantifiable && styles.disabled,
            ]}
          >
            <QuantifierModule
              value={quantity}
              handleOnChange={handleOnChange}
              onValidateEntry={updateQuantity}
              setQuantityState={setQuantityState}
              normalize={normalize}
              addAction={() => handleIncrementDecrementQuantity(1)}
              removeAction={() => handleIncrementDecrementQuantity(-1)}
            />
            <AppButton label="unité ↺" type="primary" color="orange" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: FONT_BASE * 0.75,
    paddingVertical: FONT_BASE * 0.5,
    borderRadius: FONT_BASE,
    borderWidth: 1,
    borderColor: theme.properties.border,
    width: "100%",
    gap: FONT_BASE * 0.75,
    boxShadow: theme.properties.bigShadow,
  },
  elements: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  disabled: {
    pointerEvents: "none",
    opacity: 0.5,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantifierModule: {
    flexDirection: "row",
    gap: FONT_BASE,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginRight: FONT_BASE * 1.75,
  },
  checkbox: {
    right: -0.6875 * FONT_BASE,
    top: -2.1875 * FONT_BASE,
    position: "absolute",
  },
});

export default React.memo(MenuIngredientCard);
