import { FONT_BASE } from "@constants/general";
import { dayColors } from "@constants/mappings/colors/dayColors";
import { menuIconsMap } from "@constants/mappings/images/menuIconsMap";
import { enDays } from "@constants/mappings/traductors/daysTraductor";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { getScreenWidth } from "@helpers/getScreenDimensions";
import AppLinearGradient from "@modules/shared/components/primitives/AppLinearGradient";
import { AppText } from "@modules/shared/components/primitives/AppText";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";
import { toCapitalize } from "@utils/toCapitalize";
import React, { Dispatch, SetStateAction } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  type ViewStyle,
  FlatList,
} from "react-native";
import MomentBand from "../../molecules/MomentBand";
import AppCheckBox from "@modules/shared/components/primitives/AppCheckBox";
import { useDayCardCalendar } from "@modules/menuTab/hooks/organisms/useDayCardCalendar";
import MenuCalendarOtherOverlay from "../../molecules/MenuCalendarOtherOverlay";
import MenuCalendarContent from "../../molecules/MenuCalendarContent";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import {
  morningMenuCategoriesOrder,
  noonEveningMenuCategoriesOrder,
} from "@constants/mappings/orders/menuCategoriesOrder";
import AppButton from "@modules/shared/components/atoms/buttons/AppButton";
import MenuIngredientCard from "../../molecules/MenuIngredientCard";
import { IngredientMenu } from "@stores/features/weeklyMenu";
import { FlashList } from "@shopify/flash-list";
import { useMemo, useState, useEffect } from "react";

interface DayCardCalendarProps {
  moment: "matin" | "midi" | "soir";
  day: string;
  setSelectedMoment: Dispatch<SetStateAction<"matin" | "midi" | "soir">>;
  selectedMoment: "matin" | "midi" | "soir";
  moments: MomentUi;
  isOverlayOpen: boolean;
  handleCloseOverlay?: (bool: boolean) => void;
  modify?: boolean;
}

export default function DayCardCalendar({
  moment,
  day,
  setSelectedMoment,
  selectedMoment,
  moments,
  isOverlayOpen,
  handleCloseOverlay,
  modify = false,
}: DayCardCalendarProps) {
  const {
    ingredients,
    menu,
    handleCheckMenu,
    checked,
    setChecked,
    ready,
    categories,
    ingredientsByCategory,
    handleRemoveMenu,
  } = useDayCardCalendar(selectedMoment, moments, moment);

  if (modify && !ready) return null;
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={menuIconsMap[`${enDays[day]}_icons`]}
        style={styles.menuContainer}
      >
        <AppLinearGradient
          colors={["transparent", dayColors[enDays[day]]]}
          locations={[0.5, 1]}
          style={styles.gradient as ViewStyle}
        >
          <View
            style={[
              styles.titleContainer,
              modify && { justifyContent: "space-between" },
            ]}
          >
            <AppText style={styles.dayTitle}>{toCapitalize(day)}</AppText>
            {!modify ? (
              <AppCheckBox
                style={styles.checkbox}
                checked={checked}
                action={handleCheckMenu}
              />
            ) : (
              <View style={modifyStyles.modifyButtons}>
                <AppIconButton
                  icon="binIcon"
                  type="outline"
                  action={handleRemoveMenu}
                />
                <AppIconButton icon="recipeIcon" type="green" />
              </View>
            )}
          </View>
          {!modify ? (
            <View style={[styles.menuContent, checked && { opacity: 0.25 }]}>
              <MenuCalendarContent
                menu={menu}
                setChecked={setChecked}
                ingredients={ingredients}
              />
            </View>
          ) : (
            <FlashList
              nestedScrollEnabled
              data={categories}
              contentContainerStyle={modifyStyles.menuContent}
              keyExtractor={([menuCategoryId]) => menuCategoryId}
              renderItem={({ item: [menuCategoryId, name] }) => {
                const menuIngredients =
                  (ingredientsByCategory?.[
                    Number(menuCategoryId)
                  ] as IngredientMenu[]) ?? [];

                return (
                  <View style={modifyStyles.menuCategory}>
                    <AppText style={modifyStyles.categoryTitle}>
                      {toCapitalize(name)}
                    </AppText>

                    <View style={modifyStyles.menuIngredients}>
                      {menuIngredients.map((ingredient) => (
                        <MenuIngredientCard
                          key={ingredient.ingredientId}
                          ingredient={ingredient}
                          ingredients={ingredients}
                          menuId={menu?.id}
                        />
                      ))}
                    </View>

                    <AppButton
                      label="Ajouter un ingrédient +"
                      type="primary"
                      color="green"
                    />
                  </View>
                );
              }}
            />
          )}
          {!modify && moment !== "matin" && (
            <MenuCalendarOtherOverlay
              isOverlayOpen={isOverlayOpen}
              handleCloseOverlay={handleCloseOverlay}
              othersIngredients={menu?.ingredients?.[8]}
              checked={checked}
            />
          )}
        </AppLinearGradient>
      </ImageBackground>
      <MomentBand
        moment={moment}
        day={day}
        setSelectedMoment={setSelectedMoment}
        selectedMoment={selectedMoment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: getScreenWidth(),
    flex: 1,
    flexDirection: "row-reverse",
    overflow: "hidden",
  },
  menuContainer: {
    flex: 3.5,
    backgroundColor: theme.properties.beige,
  },
  gradient: {
    flex: 1,
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
    paddingTop: FONT_BASE * 3.5,
    paddingHorizontal: FONT_BASE * 2.5,
    position: "relative",
  },
  checkbox: { paddingTop: FONT_BASE / 2 },
});

const modifyStyles = StyleSheet.create({
  modifyButtons: {
    flexDirection: "row",
    gap: FONT_BASE * 0.5,
  },
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
});
