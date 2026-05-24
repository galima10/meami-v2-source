import { FONT_BASE } from "@constants/general";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { getScreenHeight, getScreenWidth } from "@core/getScreenDimensions";
import AnimatedAppView from "@modules/shared/components/primitives/AnimatedAppView";
import { AppText } from "@modules/shared/components/primitives/AppText";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import { getFlexWidth } from "@utils/getFlexWidth";
import React, { type Dispatch, type SetStateAction } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useMenuCalendarOtherOverlay } from "@modules/menuTab/hooks/molecules/calendar/useMenuCalendarOtherOverlay";
import IngredientOtherItem from "@modules/menuTab/components/atoms/calendar/IngredientOtherItem";

interface MenuCalendarOtherOverlayProps {
  isOtherOverlayOpen: boolean;
  setIsOtherOverlayOpen: Dispatch<SetStateAction<boolean>>;
  othersIngredients: IngredientMenu[];
  checked: boolean;
}

export default function MenuCalendarOtherOverlay({
  isOtherOverlayOpen,
  setIsOtherOverlayOpen,
  othersIngredients,
  checked,
}: MenuCalendarOtherOverlayProps) {
  const { animatedStyle } = useMenuCalendarOtherOverlay(isOtherOverlayOpen);
  if (!othersIngredients || othersIngredients.length === 0) return null;
  return (
    <View style={styles.container}>
      {isOtherOverlayOpen && (
        <Pressable
          style={styles.hitbox}
          onPress={() => setIsOtherOverlayOpen(false)}
        />
      )}
      <AnimatedAppView style={[styles.overlay, animatedStyle]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            !checked
              ? pressed && styles.buttonActive
              : { pointerEvents: "none", opacity: 0.5 },
          ]}
          onPress={() => setIsOtherOverlayOpen(!isOtherOverlayOpen)}
        >
          <AppText style={styles.textButton}>Autres</AppText>
        </Pressable>
        <View style={styles.content}>
          {othersIngredients?.map((ingredient, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <IngredientOtherItem ingredient={ingredient} isLast={isLast} />
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
