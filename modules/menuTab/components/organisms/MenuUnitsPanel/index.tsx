import AnimatedAppView from "@modules/shared/components/primitives/AnimatedAppView";
import { withTiming, useDerivedValue } from "react-native-reanimated";
import { StyleSheet, Pressable } from "react-native";
import theme from "@constants/themes";
import { Dispatch, SetStateAction } from "react";
import { FONT_BASE } from "@constants/general";
import { getScreenWidth } from "@core/getScreenDimensions";
import { getFlexWidth } from "@utils/getFlexWidth";
import MenuUnitsList from "../../molecules/MenuUnitsList";

interface MenuUnitsPanelProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  selectedIngredient: {
    ingredientId: number | null;
    menuId: number | null;
  };
  setSelectedIngredient: Dispatch<
    SetStateAction<{
      ingredientId: number | null;
      menuId: number | null;
    }>
  >;
}

export default function MenuUnitsPanel({
  visible,
  setVisible,
  selectedIngredient,
  setSelectedIngredient,
}: MenuUnitsPanelProps) {
  const opacity = useDerivedValue(() => {
    return withTiming(visible ? 1 : 0, { duration: 250 });
  });

  return (
    <AnimatedAppView
      style={[
        styles.container,
        { opacity, pointerEvents: visible ? "auto" : "none" },
      ]}
    >
      <Pressable
        style={styles.hitbox}
        onPress={() => {
          setVisible(false);
          setSelectedIngredient({
            ingredientId: null,
            menuId: null,
          });
        }}
      >
        <MenuUnitsList
          selectedIngredient={selectedIngredient}
          setVisible={setVisible}
        />
      </Pressable>
    </AnimatedAppView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.properties.darkerBackground,
    position: "absolute",
    top: 0,
    left: 0,
  },
  hitbox: {
    width: "100%",
    height: "100%",
  },
  units: {
    backgroundColor: theme.properties.white,
    height: "100%",
    width: getFlexWidth(getScreenWidth(), 4, 7),
    boxShadow: theme.properties.bigShadow,
    borderRightWidth: 1,
    borderColor: theme.properties.whiteBorder,
  },
  unit: {
    paddingHorizontal: FONT_BASE,
    paddingVertical: FONT_BASE * 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: theme.properties.border,
  },
  unitActive: {
    backgroundColor: theme.properties.beige,
  },
  unitsFooter: {
    paddingVertical: FONT_BASE * 1.5,
    paddingHorizontal: FONT_BASE,
  },
});
