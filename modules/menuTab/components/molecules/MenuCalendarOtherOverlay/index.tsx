import { FONT_BASE } from "@constants/general";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { useMenuCalendarOtherOverlay } from "@modules/menuTab/hooks/molecules/useMenuCalendarOtherOverlay";
import AnimatedAppView from "@modules/shared/components/primitives/AnimatedAppView";
import { AppText } from "@modules/shared/components/primitives/AppText";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import { getFlexWidth } from "@utils/getFlexWidth";
import { getScreenHeight, getScreenWidth } from "@core/getScreenDimensions";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface MenuCalendarOtherOverlayProps {
  isOverlayOpen: boolean;
  handleCloseOverlay?: (bool: boolean) => void;
  othersIngredients: IngredientMenu[];
  checked: boolean;
}

export default function MenuCalendarOtherOverlay({
  isOverlayOpen,
  handleCloseOverlay,
  othersIngredients,
  checked,
}: MenuCalendarOtherOverlayProps) {
  const { toggleOverlay, animatedStyle, ingredients, units } =
    useMenuCalendarOtherOverlay(isOverlayOpen, handleCloseOverlay);
  if (!othersIngredients || othersIngredients.length === 0) return null;
  return (
    <View style={styles.container}>
      {isOverlayOpen && (
        <Pressable style={styles.hitbox} onPress={toggleOverlay} />
      )}
      <AnimatedAppView style={[styles.overlay, animatedStyle]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            !checked
              ? pressed && styles.buttonActive
              : { pointerEvents: "none", opacity: 0.5 },
          ]}
          onPress={toggleOverlay}
        >
          <AppText style={styles.textButton}>Autres</AppText>
        </Pressable>
        <View style={styles.content}>
          {othersIngredients?.map((ingredient, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <React.Fragment key={index}>
                <AppText key={index} style={styles.text}>
                  {ingredients[ingredient?.ingredientId]?.name}
                </AppText>
                {ingredient?.quantity && (
                  <AppText style={[styles.text, styles.quantity]}>
                    {" | "}
                    {ingredient?.quantity && ingredient?.quantity}{" "}
                    {ingredient?.unitId &&
                      units[ingredient?.unitId].abbreviation}
                  </AppText>
                )}
                <AppText style={styles.text}>{!isLast && " • "}</AppText>
              </React.Fragment>
            );
          })}
        </View>
      </AnimatedAppView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: getScreenHeight(),
    width: getScreenWidth(),
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: "box-none",
  },
  hitbox: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    width: getFlexWidth(getScreenWidth(), 3.5, 1 + 3.5),
    position: "absolute",
    bottom: FONT_BASE * 3,
    right: 0,
    flexDirection: "row",
    minHeight: FONT_BASE * 6.75,
    alignItems: "center",
  },
  overlayActive: {
    right: 0,
  },
  content: {
    backgroundColor: theme.properties.beige,
    borderColor: theme.properties.beigeBorder,
    borderWidth: 1,
    boxShadow: theme.properties.bigShadow,
    borderTopLeftRadius: FONT_BASE,
    borderBottomLeftRadius: FONT_BASE,
    padding: FONT_BASE * 0.5,
    flex: 1,
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },
  button: {
    width: FONT_BASE * 2,
    height: FONT_BASE * 5,
    borderWidth: 1,
    backgroundColor: theme.properties.darkGreen,
    borderColor: theme.properties.greenBorder,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: FONT_BASE * 0.75,
    borderBottomLeftRadius: FONT_BASE * 0.75,
    boxShadow: theme.properties.bigShadow,
  },
  textButton: {
    fontWeight: theme.properties.bold,
    color: theme.properties.beige,
    textAlign: "center",
    transform: [{ rotate: "-90deg" }],
    width: FONT_BASE * 3,
  },
  buttonActive: {
    backgroundColor: theme.properties.lightGreen,
    borderColor: theme.properties.lightGreenBorder,
  },
  text: {
    fontSize: typography.small,
    fontWeight: theme.properties.semibold,
  },
  quantity: {
    color: theme.properties.vibrantOrange,
    fontWeight: theme.properties.regular,
  },
});
