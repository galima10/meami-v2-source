import AppButton from "../../atoms/buttons/AppButton";
import { useAppSelector, useAppDispatch } from "@modules/shared/hooks/redux";
import { View, StyleSheet, Pressable } from "react-native";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";
import AppIconButton from "../../atoms/buttons/AppIconButton";
import { AppText } from "../../primitives/AppText";

export default function UnitsSelector() {
  return (
    <View style={styles.container}>
      <AppButton label="unité ↺" type="primary" color="orange" />
      <View style={styles.units}>
        <Pressable style={styles.unit}>
          <AppText>Pièce</AppText>
          <View style={styles.unitButtons}>
            <AppIconButton
              icon="binIcon"
              type="outlineRed"
              size={FONT_BASE * 2}
            />
            <AppIconButton
              icon="modifyIcon"
              type="outlineGreen"
              size={FONT_BASE * 2}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  units: {
    position: "absolute",
    // width: 10,
    // height: 10,
    right: -FONT_BASE,
    minWidth: FONT_BASE * 10,
    top: "100%",
    backgroundColor: theme.properties.white,
  },
  unit: {
    padding: FONT_BASE * 0.5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unitButtons: {
    flexDirection: "row",
    gap: FONT_BASE * 0.5,
  },
});
