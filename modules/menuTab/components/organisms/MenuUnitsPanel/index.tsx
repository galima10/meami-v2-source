import AnimatedAppView from "@modules/shared/components/primitives/AnimatedAppView";
import { withTiming, useDerivedValue } from "react-native-reanimated";
import { StyleSheet, Pressable, View } from "react-native";
import AppInput from "@modules/shared/components/primitives/AppInput";
import theme from "@constants/themes";
import { Dispatch, SetStateAction } from "react";
import { FONT_BASE } from "@constants/general";
import { getScreenWidth } from "@core/getScreenDimensions";
import { getFlexWidth } from "@utils/getFlexWidth";
import MenuUnitsList from "../../molecules/MenuUnitsList";
import React, { useState } from "react";
import AppButton from "@modules/shared/components/atoms/buttons/AppButton";
import MenuUnitForm from "../../molecules/MenuUnitForm";

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
  const [isSetted, setIsSetted] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    id: number | null;
    name: string;
    abbreviation: string;
  }>({
    id: null,
    name: "",
    abbreviation: "",
  });

  return (
    <AnimatedAppView
      style={[
        styles.container,
        { opacity, pointerEvents: visible ? "auto" : "none" },
      ]}
    >
      <View style={styles.unitsContainer}>
        {!isSetted ? (
          <MenuUnitsList
            selectedIngredient={selectedIngredient}
            setVisible={setVisible}
            setIsSetted={setIsSetted}
            setFormData={setFormData}
          />
        ) : (
          <MenuUnitForm
            setIsSetted={setIsSetted}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </View>
      <Pressable
        style={styles.hitbox}
        onPress={() => {
          setVisible(false);
          setIsSetted(false);
          setSelectedIngredient({
            ingredientId: null,
            menuId: null,
          });
          setFormData({
            id: null,
            name: "",
            abbreviation: "",
          });
        }}
      ></Pressable>
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
    flexDirection: "row",
  },
  hitbox: {
    flex: 1,
  },
  unitsContainer: {
    width: getFlexWidth(getScreenWidth(), 4, 7),
    height: "100%",
    backgroundColor: theme.properties.white,
    justifyContent: "center",
  },
  inputs: {
    paddingHorizontal: FONT_BASE,
    gap: FONT_BASE,
  },
  input: {
    width: "100%",
    height: FONT_BASE * 2.5,
    paddingHorizontal: FONT_BASE * 0.75,
  },
  setContent: {
    gap: FONT_BASE * 3,
  },
});
