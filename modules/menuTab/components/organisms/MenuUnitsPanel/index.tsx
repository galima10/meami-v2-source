import AnimatedAppView from "@modules/shared/components/primitives/AnimatedAppView";
import { withTiming, useDerivedValue } from "react-native-reanimated";
import { StyleSheet, Pressable, FlatList, View } from "react-native";
import theme from "@constants/themes";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "@modules/shared/hooks/redux";
import type { Unit } from "@stores/features/units";
import { AppText } from "@modules/shared/components/primitives/AppText";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import { FONT_BASE } from "@constants/general";
import { getScreenWidth } from "@core/getScreenDimensions";
import { getFlexWidth } from "@utils/getFlexWidth";
import AppButton from "@modules/shared/components/atoms/buttons/AppButton";

interface MenuUnitsPanelProps {
  visible: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
}

export default function MenuUnitsPanel({
  visible,
  setter,
}: MenuUnitsPanelProps) {
  const { units } = useAppSelector((state) => state.unit);
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
      <Pressable style={styles.hitbox} onPress={() => setter(false)}>
        <FlatList
          style={styles.units}
          data={Object.entries(units) as [string, Unit][]}
          keyExtractor={([key]) => key}
          renderItem={({ item: [unitId, unit] }) => (
            <Pressable
              key={unitId}
              style={({ pressed }) => [
                styles.unit,
                pressed && styles.unitActive,
              ]}
            >
              <AppText>{unit.name}</AppText>
              <AppIconButton
                icon="modifyIcon"
                type="outlineGreen"
                size={FONT_BASE * 2}
              />
            </Pressable>
          )}
          ListFooterComponent={
            <View style={styles.unitsFooter}>
              <AppButton label="Ajouter une unité" type="secondary" big />
            </View>
          }
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
