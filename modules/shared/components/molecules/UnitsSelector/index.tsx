import AppButton from "../../atoms/buttons/AppButton";
import { useAppSelector, useAppDispatch } from "@modules/shared/hooks/redux";
import { View, StyleSheet, Pressable } from "react-native";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";
import AppIconButton from "../../atoms/buttons/AppIconButton";
import { AppText } from "../../primitives/AppText";
import { useEffect } from "react";
import { fetchUnitsThunk } from "@stores/thunks/units";

export default function UnitsSelector() {
  const { units } = useAppSelector((state) => state.unit);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (Object.keys(units).length === 0) {
      dispatch(fetchUnitsThunk());
    }
  }, []);
  return (
    <View style={styles.container}>
      <AppButton label="unité ↺" type="primary" color="orange" />
      <View style={styles.units}>
        <Pressable
          style={({ pressed }) => [styles.unit, pressed && styles.unitActive]}
        >
          <AppText>Pièce</AppText>
          <AppIconButton
            icon="modifyIcon"
            type="outlineGreen"
            size={FONT_BASE * 2}
          />
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
    right: -FONT_BASE,
    minWidth: FONT_BASE * 10,
    top: "100%",
    backgroundColor: theme.properties.white,
    borderRadius: FONT_BASE * 0.5,
    borderWidth: 1,
    borderColor: theme.properties.whiteBorder,
    boxShadow: theme.properties.bigShadow,
    overflow: "hidden",
  },
  unit: {
    padding: FONT_BASE * 0.5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: theme.properties.whiteBorder,
  },
  unitActive: {
    backgroundColor: theme.properties.beige,
  },
});
