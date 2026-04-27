import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet } from "react-native";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import { AppText } from "@modules/shared/components/primitives/AppText";
import MenuIngredientCard from "../MenuIngredientCard";
import AppButton from "@modules/shared/components/atoms/buttons/AppButton";
import { useMenuModifyContent } from "@modules/menuTab/hooks/molecules/useMenuModifyContent";
import { toCapitalize } from "@utils/toCapitalize";
import { FONT_BASE } from "@constants/general";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import type { MenuUi } from "@mappers/dataToUi/weeklyMenuToUi";
import { SetStateAction, Dispatch, useState, useMemo } from "react";
import type { Menu } from "@stores/features/weeklyMenu";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import {
  morningMenuCategoriesOrder,
  noonEveningMenuCategoriesOrder,
} from "@constants/mappings/orders/menuCategoriesOrder";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import { removeMenuThunk } from "@stores/thunks/weeklyMenu";
import { getDayById } from "@helpers/getSeedById";
import type { MenuSchedule } from "@stores/features/weeklyMenu";

interface MenuModifyContentProps {
  selectedMoment: number;
  setActualElements: Dispatch<
    SetStateAction<{
      type: "recipes" | "ingredients" | null;
      categoryId?: number;
    }>
  >;
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedIngredient: Dispatch<
    SetStateAction<{
      ingredientId: number | null;
      menuId: number | null;
    }>
  >;
  dayId: number;
  setIsUnitsPanelOpen: Dispatch<SetStateAction<boolean>>;
  actualDayMoment: 1 | 2 | 3;
  menuSchedule: MenuSchedule;
}

export default function MenuModifyContent({
  actualDayMoment,
  setActualElements,
  selectedMoment,
  setIsPanelOpen,
  setSelectedIngredient,
  dayId,
  setIsUnitsPanelOpen,
  menuSchedule
}: MenuModifyContentProps) {
  const dispatch = useAppDispatch();
  // const { ingredientsByCategory, ingredients } = useMenuModifyContent(menu);
  const menuId = menuSchedule?.[dayId]?.[actualDayMoment] ?? null;

  const menu = useAppSelector((state) =>
    menuId ? state.weeklyMenu.weeklyMenu[menuId] : undefined,
  );
  const { ingredients } = useAppSelector((state) => state.ingredient);

  const ingredientsByCategory = useMemo(() => {
    return menu?.ingredients ?? {};
  }, [menu]);
  const categories = Object.entries(
    selectedMoment === 1
      ? morningMenuCategoriesOrder
      : noonEveningMenuCategoriesOrder,
  ) as [string, string][];

  function handleRemoveMenu() {
    if (menu?.ingredients && Object.values(menu?.ingredients).length === 0)
      return;
    dispatch(removeMenuThunk(menuId));
  }
  return (
    <>
      <View
        style={[styles.titleContainer, { justifyContent: "space-between" }]}
      >
        <AppText style={styles.dayTitle}>
          {/* {toCapitalize(getDayById(dayId)?.name)} */}
        </AppText>
        <View style={styles.modifyButtons}>
          <AppIconButton
            icon="binIcon"
            type="outlineRed"
            action={handleRemoveMenu}
          />
          <AppIconButton
            icon="recipeIcon"
            type="green"
            action={() => {
              setIsPanelOpen(true);
              setActualElements({
                type: "recipes",
              });
            }}
          />
        </View>
      </View>
      <FlashList
        nestedScrollEnabled
        data={categories}
        contentContainerStyle={styles.menuContent}
        keyExtractor={([menuCategoryId]) => menuCategoryId}
        renderItem={({ item: [menuCategoryId, name] }) => {
          const menuIngredients =
            (ingredientsByCategory?.[
              Number(menuCategoryId)
            ] as IngredientMenu[]) ?? [];

          return (
            <View style={styles.menuCategory}>
              <AppText style={styles.categoryTitle}>
                {toCapitalize(name)}
              </AppText>
              {menuIngredients.length !== 0 && (
                <View style={styles.menuIngredients}>
                  {menuIngredients.map((ingredient) => (
                    <MenuIngredientCard
                      key={ingredient.ingredientId}
                      ingredient={ingredient}
                      ingredients={ingredients}
                      menuId={menuId}
                      setIsUnitsPanelOpen={setIsUnitsPanelOpen}
                      setSelectedIngredient={setSelectedIngredient}
                    />
                  ))}
                </View>
              )}
              <AppButton
                label="Ajouter un ingrédient +"
                type="primary"
                color="green"
                action={() => {
                  setIsPanelOpen(true);
                  setActualElements({
                    type: "ingredients",
                    categoryId: Number(menuCategoryId),
                  });
                }}
              />
            </View>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  menuContent: {
    padding: FONT_BASE,
    paddingBottom: FONT_BASE * 6,
  },
  categoryTitle: {
    fontSize: typography.h6,
    fontWeight: theme.properties.semibold,
  },
  menuCategory: {
    width: "100%",
    alignItems: "flex-start",
    gap: FONT_BASE,
    marginBottom: FONT_BASE * 1.5,
  },
  menuIngredients: {
    width: "100%",
    gap: FONT_BASE,
  },
  modifyButtons: {
    flexDirection: "row",
    gap: FONT_BASE * 0.5,
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
});
