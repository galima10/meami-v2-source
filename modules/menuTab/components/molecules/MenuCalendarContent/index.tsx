import type { IngredientMenu } from "@stores/features/weeklyMenu";
import type { MenuUi } from "@utils/dataToUi/weeklyMenuToUi";
import React, { Dispatch, SetStateAction } from "react";
import { FONT_BASE } from "@constants/general";
import { View, StyleSheet } from "react-native";
import { AppText } from "@modules/shared/components/primitives/AppText";
import type { Ingredients } from "@stores/features/ingredients";
import theme from "@constants/themes";

interface MenuCalendarContentProps {
  menu: MenuUi;
  setChecked: Dispatch<SetStateAction<boolean>>;
  ingredients: Ingredients;
}

export default function MenuCalendarContent({
  menu,
  setChecked,
  ingredients,
}: MenuCalendarContentProps) {
  return (
    <>
      {(Object.entries(menu?.ingredients) as [string, IngredientMenu[]][]).map(
        ([menuCategoryId, menuIngredients]) => {
          setChecked(menu?.done);
          if (Number(menuCategoryId) !== 8 && menuIngredients.length !== 0) {
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
        },
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
