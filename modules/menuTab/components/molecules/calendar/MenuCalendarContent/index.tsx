import { View, StyleSheet } from "react-native";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { daysOrder } from "@constants/mappings/orders/daysOrder";
import { toCapitalize } from "@utils/toCapitalize";
import { typography } from "@constants/styles";
import { menuSchedule } from "@constants/mappings/orders/menuSchedule";
import { useAppSelector, useAppDispatch } from "@modules/shared/hooks/redux";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import React, { useState } from "react";
import IngredientCalendarItem from "@modules/menuTab/components/atoms/IngredientCalendarItem";
import AppCheckBox from "@modules/shared/components/primitives/AppCheckBox";
import { setMenuDoneThunk } from "@stores/thunks/weeklyMenu";

interface MenuCalendarContentProps {
  dayId: number;
  momentId: number;
}

export default function MenuCalendarContent({
  dayId,
  momentId,
}: MenuCalendarContentProps) {
  const dispatch = useAppDispatch();
  const menuId = menuSchedule[dayId + 1][momentId + 1];
  const menu = useAppSelector((state) => state.weeklyMenu.weeklyMenu[menuId]);
  function handleCheckMenu(menuId: number) {
    const newValue = !menu?.done;
    dispatch(setMenuDoneThunk({ menuId: menuId, done: newValue }));
  }
  return (
    <>
      <View style={styles.titleContainer}>
        <AppText style={styles.dayTitle}>
          {toCapitalize(daysOrder[dayId])}
        </AppText>
        <AppCheckBox
          style={styles.checkbox}
          checked={menu?.done}
          action={() => handleCheckMenu(menuId)}
        />
      </View>
      <View style={[styles.menuContent, menu?.done && { opacity: 0.25 }]}>
        {Object.values(menu?.ingredients ?? {}).length > 0 ? (
          (
            Object.entries(menu?.ingredients ?? {}) as [
              string,
              IngredientMenu[],
            ][]
          ).map(([menuCategoryId, menuIngredients]) => {
            if (Number(menuCategoryId) !== 8 && menuIngredients.length !== 0) {
              return (
                <React.Fragment key={`group-${menuId}-${menuCategoryId}`}>
                  <View
                    key={menuCategoryId}
                    style={[
                      styles.menuCategories,
                      Number(menuCategoryId) === 5 && {
                        paddingBottom: FONT_BASE * 0.75,
                      },
                      Number(menuCategoryId) === 6 && {
                        paddingTop: FONT_BASE * 0.75,
                      },
                    ]}
                  >
                    {menuIngredients?.map((ingredient, index) => {
                      return (
                        <IngredientCalendarItem
                          key={`ingredient-${index}`}
                          ingredientMenu={ingredient}
                        />
                      );
                    })}
                  </View>
                  {Number(menuCategoryId) !== 5 &&
                    Number(menuCategoryId) !== 3 &&
                    Number(menuCategoryId) !== 7 && (
                      <View
                        key={`separator-${menuCategoryId}`}
                        style={styles.separator}
                      />
                    )}
                </React.Fragment>
              );
            }
          })
        ) : (
          <AppText style={styles.emptyText}>Non renseigné</AppText>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: FONT_BASE,
    borderBottomWidth: 1,
    borderColor: theme.properties.brown,
    padding: FONT_BASE,
    width: "100%",
    alignItems: "center",
  },
  dayTitle: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
  checkbox: { paddingTop: FONT_BASE / 2 },
  menuContent: {
    alignItems: "center",
    paddingTop: FONT_BASE * 2,
    paddingHorizontal: FONT_BASE * 2.5,
  },
  menuCategories: {
    marginVertical: 1,
    alignItems: "center",
    gap: FONT_BASE * 0.5,
    width: "100%",
    paddingVertical: FONT_BASE * 2,
  },
  emptyText: {
    fontSize: typography.h6,
    marginTop: FONT_BASE * 4,
    fontWeight: theme.properties.medium,
  },
  separator: {
    width: "65%",
    height: 1,
    backgroundColor: theme.properties.brown,
  },
});
