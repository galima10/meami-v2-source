import { FONT_BASE } from "@constants/general";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import type { MenuUi } from "@mappers/dataToUi/weeklyMenuToUi";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { useAppSelector, useAppDispatch } from "@modules/shared/hooks/redux";
import type { Ingredients } from "@stores/features/ingredients";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import type { Menu } from "@stores/features/weeklyMenu";
import AppCheckBox from "@modules/shared/components/primitives/AppCheckBox";
import { toCapitalize } from "@utils/toCapitalize";
import { getDayById } from "@helpers/getSeedById";
import MenuCalendarOtherOverlay from "../MenuCalendarOtherOverlay";
import { setMenuDoneThunk } from "@stores/thunks/weeklyMenu";
import type { MenuSchedule } from "@stores/features/weeklyMenu";

interface MenuCalendarContentProps {
  selectedMoment: 1 | 2 | 3;
  dayId: number;
  handleCloseOverlay: () => void;
  isOverlayOpen: boolean;
  actualDayMoment: 1 | 2 | 3;
  menuSchedule: MenuSchedule;
}

export default function MenuCalendarContent({
  selectedMoment,
  dayId,
  handleCloseOverlay,
  isOverlayOpen,
  actualDayMoment,
  menuSchedule,
}: MenuCalendarContentProps) {
  const menuId = menuSchedule?.[dayId]?.[actualDayMoment] ?? null;

  const menu = useAppSelector((state) => state.weeklyMenu.weeklyMenu);

  const currentMenu = menu?.[menuId];
  const dispatch = useAppDispatch();
  const { units } = useAppSelector((state) => state.unit);
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const [checked, setChecked] = useState(false);
  function handleCheckMenu(menuId: number) {
    const newValue = !checked;
    setChecked(newValue);
    dispatch(setMenuDoneThunk({ menuId: menuId, done: newValue }));
  }
  // useEffect(() => {
  //   setChecked(currentMenu?.done ?? false);
  // }, [currentMenu?.done]);
  const day = getDayById(dayId);
  const dayName = day?.name;
  if (!getDayById(dayId)) {
    console.warn("INVALID DAY ID", dayId);
  }
  return (
    <>
      <View style={[styles.titleContainer]}>
        <AppText style={styles.dayTitle}>
          {/* {dayName ? toCapitalize(dayName) : ""} */}
        </AppText>
        <AppCheckBox
          style={styles.checkbox}
          checked={checked}
          action={() => handleCheckMenu(menuId)}
        />
      </View>
      <View style={[styles.menuContent, checked && { opacity: 0.25 }]}>
        {Object.values(currentMenu?.ingredients ?? {}).length > 0 ? (
          (
            Object.entries(currentMenu?.ingredients ?? {}) as [
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
                        <View
                          key={`ingredient-${index}`}
                          style={styles.ingredientContainer}
                        >
                          <AppText>
                            {ingredients[ingredient.ingredientId]?.name}
                          </AppText>
                          {ingredient?.quantity && (
                            <AppText style={styles.quantity}>
                              {" | "}
                              {ingredient?.quantity}{" "}
                              {ingredient?.unitId &&
                                units[ingredient?.unitId].abbreviation}
                            </AppText>
                          )}
                        </View>
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
      {selectedMoment !== 1 && (
        <MenuCalendarOtherOverlay
          isOverlayOpen={isOverlayOpen}
          handleCloseOverlay={handleCloseOverlay}
          othersIngredients={currentMenu?.ingredients?.[8] ?? []}
          checked={checked}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuCategories: {
    marginVertical: 1,
    alignItems: "center",
    gap: FONT_BASE * 0.5,
    width: "100%",
    paddingVertical: FONT_BASE * 2,
  },
  separator: {
    width: "65%",
    height: 1,
    backgroundColor: theme.properties.brown,
  },
  ingredientContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  quantity: {
    color: theme.properties.transparentBrown,
  },
  emptyText: {
    fontSize: typography.h6,
    marginTop: FONT_BASE * 4,
    fontWeight: theme.properties.medium,
  },
  dayTitle: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
  titleContainer: {
    flexDirection: "row",
    gap: FONT_BASE,
    borderBottomWidth: 1,
    borderColor: theme.properties.brown,
    padding: FONT_BASE,
    width: "100%",
    alignItems: "center",
  },
  menuContent: {
    alignItems: "center",
    paddingTop: FONT_BASE * 2,
    paddingHorizontal: FONT_BASE * 2.5,
  },
  checkbox: { paddingTop: FONT_BASE / 2 },
});
