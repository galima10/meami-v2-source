import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  type ViewStyle,
} from "react-native";
import AppLinearGradient from "@modules/shared/components/primitives/AppLinearGradient";
import MomentBand from "../../molecules/MomentBand";
import { getScreenWidth } from "@helpers/getScreenDimensions";
import { Dispatch, SetStateAction } from "react";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";
import { menuIconsMap } from "@constants/mappings/images/menuIconsMap";
import { enDays } from "@constants/mappings/traductors/days";
import { toCapitalize } from "@utils/toCapitalize";
import { dayColors } from "@constants/mappings/colors/dayColors";
import { AppText } from "@modules/shared/components/primitives/AppText";
import type {
  MenuIngredients,
  IngredientMenu,
} from "@stores/features/weeklyMenu";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";
import { typography } from "@constants/styles";
import { useAppSelector } from "@modules/shared/hooks/redux";
import React from "react";

interface DayCardCalendarProps {
  moment: "matin" | "midi" | "soir";
  day: string;
  setSelectedMoment: Dispatch<SetStateAction<"matin" | "midi" | "soir">>;
  selectedMoment: "matin" | "midi" | "soir";
  moments: MomentUi;
}

export default function DayCardCalendar({
  moment,
  day,
  setSelectedMoment,
  selectedMoment,
  moments,
}: DayCardCalendarProps) {
  const menu = moments[selectedMoment.toUpperCase()];
  const { ingredients } = useAppSelector((state) => state.ingredient);

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
          <View style={styles.titleContainer}>
            <AppText style={styles.dayTitle}>{toCapitalize(day)}</AppText>
          </View>
          <View style={styles.menuContent}>
            {(
              Object.entries(menu?.ingredients) as [string, IngredientMenu[]][]
            ).map(([menuCategoryId, menuIngredients]) => {
              if (Number(menuCategoryId) !== 8) {
                return (
                  <React.Fragment key={`group-${menu?.id}-${menuCategoryId}`}>
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
                          <AppText key={`ingredient-${index}`}>
                            {ingredients[ingredient.ingredientId]?.name}
                          </AppText>
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
            })}
          </View>
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
  },
  menuContainer: {
    flex: 3.5,
    backgroundColor: theme.properties.beige,
    borderLeftWidth: 1,
    borderColor: theme.properties.beigeBorder,
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
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: theme.properties.brown,
    padding: FONT_BASE,
    width: "100%",
  },
  menuContent: {
    paddingTop: FONT_BASE * 3.5,
    alignItems: "center",
    paddingHorizontal: FONT_BASE * 2.5,
  },
  menuCategories: {
    marginBottom: 2,
    alignItems: "center",
    gap: FONT_BASE * 0.5,
    width: "100%",
    paddingVertical: FONT_BASE * 2,
  },
  separator: {
    width: "75%",
    height: 1,
    backgroundColor: theme.properties.brown,
  },
});
