import { FONT_BASE } from "@constants/general";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import type { MenuUi } from "@mappers/dataToUi/weeklyMenuToUi";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { useAppSelector } from "@modules/shared/hooks/redux";
import type { Ingredients } from "@stores/features/ingredients";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";

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
  const { units } = useAppSelector((state) => state.unit);
  return (
    <>
      {Object.values(menu?.ingredients).length > 0 ? (
        (Object.entries(menu?.ingredients) as [string, IngredientMenu[]][]).map(
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
                        <View
                          key={`ingredient-${index}`}
                          style={styles.ingredientContainer}
                        >
                          <AppText>
                            {ingredients[ingredient.ingredientId]?.name}
                          </AppText>
                          {ingredient?.unitId && (
                            <AppText style={styles.quantity}>
                              {" | "}
                              {ingredient?.quantity}{" "}
                              {units[ingredient?.unitId].abbreviation}
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
          },
        )
      ) : (
        <AppText style={styles.emptyText}>Non renseigné</AppText>
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
});
