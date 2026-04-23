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
import { SetStateAction, Dispatch } from "react";

interface MenuModifyContentProps {
  categories: [string, string][];
  menu: MenuUi;
  openPanel?: () => void;
  setActualElements?: Dispatch<
    SetStateAction<{
      type: "recipes" | "ingredients" | null;
      categoryId?: number;
    }>
  >;
  unitSelected?: number | null;
  setUnitSelected?: Dispatch<SetStateAction<number | null>>;
}

export default function MenuModifyContent({
  categories,
  menu,
  setActualElements,
  openPanel,
  unitSelected,
  setUnitSelected,
}: MenuModifyContentProps) {
  const { ingredientsByCategory, ingredients, toggleUnitSelector } =
    useMenuModifyContent(menu, setUnitSelected, unitSelected);
  return (
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
            <AppText style={styles.categoryTitle}>{toCapitalize(name)}</AppText>
            {menuIngredients.length !== 0 && (
              <View style={styles.menuIngredients}>
                {menuIngredients.map((ingredient) => (
                  <MenuIngredientCard
                    key={ingredient.ingredientId}
                    ingredient={ingredient}
                    ingredients={ingredients}
                    menuId={menu?.id}
                    unitSelected={unitSelected}
                    toggleUnitSelector={toggleUnitSelector}
                  />
                ))}
              </View>
            )}
            <AppButton
              label="Ajouter un ingrédient +"
              type="primary"
              color="green"
              action={() => {
                openPanel?.();
                setActualElements?.({
                  type: "ingredients",
                  categoryId: Number(menuCategoryId),
                });
              }}
            />
          </View>
        );
      }}
    />
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
});
