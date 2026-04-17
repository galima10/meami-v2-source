import { View, StyleSheet, type ViewStyle } from "react-native";
import { typography } from "@constants/styles";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { toCapitalize } from "@utils/toCapitalize";
import type { MomentUi, MenuUi } from "@utils/dataToUi/weeklyMenuToUi";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import React from "react";
import { useDayCardList } from "@modules/menuTab/hooks/atoms/useDayCardList";

interface DayCardListProps {
  day: string;
  today: string;
  moments: MomentUi;
}

export default function DayCardList({ day, today, moments }: DayCardListProps) {
  const { categoryColor, ingredients } = useDayCardList();
  return (
    <View
      style={[styles.container, day.toLowerCase() === today && styles.active]}
    >
      <AppText style={styles.dayTitle}>{toCapitalize(day)}</AppText>
      {(Object.entries(moments) as [string, MenuUi][]).map(([moment, menu]) => {
        return (
          <AppText key={moment}>
            <AppText style={styles.momentLabel}>
              {toCapitalize(moment)} :
            </AppText>{" "}
            {Object.values(menu?.ingredients).length > 0
              ? Object.entries(menu.ingredients)
                  .flatMap(([menuCategoryId, menuIngredients]) =>
                    menuIngredients.map((ingredient: IngredientMenu) => ({
                      ingredient,
                      menuCategoryId,
                    })),
                  )
                  .map(({ ingredient, menuCategoryId }, index, array) => {
                    const isLast = index === array.length - 1;

                    return (
                      <AppText
                        key={`ingredient-${index}`}
                        style={{ color: categoryColor(Number(menuCategoryId)) }}
                      >
                        {ingredients[ingredient.ingredientId]?.name}
                        {!isLast && " • "}
                      </AppText>
                    );
                  })
              : "----"}
          </AppText>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: FONT_BASE * 1.25,
    padding: FONT_BASE,
    boxShadow: theme.properties.bigShadow,
    borderColor: theme.properties.border,
    gap: FONT_BASE * 0.75,
    position: "relative",
  },
  active: {
    borderColor: theme.properties.vibrantOrange,
    borderWidth: 1.5,
  },
  dayTitle: {
    fontSize: typography.h5,
    fontWeight: theme.properties.semibold,
    borderBottomWidth: 1,
    borderColor: theme.properties.brown,
    paddingBottom: FONT_BASE * 0.5,
  },
  momentLabel: {
    fontWeight: theme.properties.semibold,
    fontSize: FONT_BASE * 1.1,
  },
});
