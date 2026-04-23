import { StyleSheet, Pressable, FlatList, View } from "react-native";
import AppButton from "@modules/shared/components/atoms/buttons/AppButton";
import { AppText } from "@modules/shared/components/primitives/AppText";
import type { Unit } from "@stores/features/units";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import { FONT_BASE } from "@constants/general";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import theme from "@constants/themes";
import { updateUnitFromWeeklyMenuThunk } from "@stores/thunks/weeklyMenu";
import { Dispatch, SetStateAction } from "react";
import { getFlexWidth } from "@utils/getFlexWidth";
import { getScreenWidth } from "@core/getScreenDimensions";

interface MenuUnitsListProps {
  selectedIngredient: {
    ingredientId: number | null;
    menuId: number | null;
  };
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function MenuUnitsList({
  selectedIngredient,
  setVisible,
}: MenuUnitsListProps) {
  const dispatch = useAppDispatch();
  const { units } = useAppSelector((state) => state.unit);
  function handleSelectUnit(unitId: number) {
    if (!selectedIngredient.ingredientId || !selectedIngredient.menuId) return;
    dispatch(
      updateUnitFromWeeklyMenuThunk({
        newUnitId: unitId,
        menuId: selectedIngredient.menuId,
        ingredientId: selectedIngredient.ingredientId,
      }),
    );
  }
  return (
    <FlatList
      style={styles.units}
      data={Object.entries(units) as [string, Unit][]}
      keyExtractor={([key]) => key}
      renderItem={({ item: [unitId, unit] }) => (
        <Pressable
          key={unitId}
          style={({ pressed }) => [styles.unit, pressed && styles.unitActive]}
          onPress={() => {
            setVisible(false);
            handleSelectUnit(Number(unitId));
          }}
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
  );
}

const styles = StyleSheet.create({
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
