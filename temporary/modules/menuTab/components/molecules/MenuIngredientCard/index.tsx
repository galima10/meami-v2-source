import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import AppButton from "@modules/shared/components/atoms/buttons/AppButton";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import QuantifierModule from "@modules/shared/components/molecules/QuantifierModule";
import AppCheckBox from "@modules/shared/components/primitives/AppCheckBox";
import { AppText } from "@modules/shared/components/primitives/AppText";
import type { Ingredients } from "@stores/features/ingredients";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import { useMenuIngredientCard } from "@temporary/modules/menuTab/hooks/molecules/useMenuIngredientCard";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";

interface MenuIngredientCardProps {
  ingredient: IngredientMenu;
  ingredients: Ingredients;
  menuId: number;
  setIsUnitsPanelOpen?: Dispatch<SetStateAction<boolean>>;
  setSelectedIngredient?: Dispatch<
    SetStateAction<{
      ingredientId: number | null;
      menuId: number | null;
    }>
  >;
}

function MenuIngredientCard({
  ingredient,
  ingredients,
  menuId,
  setIsUnitsPanelOpen,
  setSelectedIngredient,
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
    units,
  } = useMenuIngredientCard(ingredient, menuId);
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {ingredients[ingredient?.ingredientId].name}
      </AppText>
      <View style={styles.elements}>
        <AppIconButton
          icon="binIcon"
          type="outlineRed"
          size={FONT_BASE * 2.25}
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
            <AppButton
              label={
                ingredient?.unitId
                  ? units[ingredient?.unitId].abbreviation + " ↺"
                  : "unité ↺"
              }
              color="orange"
              action={() => {
                setIsUnitsPanelOpen?.(true);
                setSelectedIngredient?.({
                  ingredientId: ingredient?.ingredientId,
                  menuId: menuId,
                });
              }}
            />
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
