import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAppSelector, useAppDispatch } from "@modules/shared/hooks/redux";
import { getDb } from "@database/database";

export default function TestButton() {
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { products } = useAppSelector((state) => state.product);
  const { recipes } = useAppSelector((state) => state.recipe);
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { days } = useAppSelector((state) => state.seed);
  const { units } = useAppSelector((state) => state.unit);
  const { ingredientCategories } = useAppSelector((state) => state.ingredientCategory);
  const { recipeCategories } = useAppSelector((state) => state.recipeCategory);
  const { cookingUstensils } = useAppSelector((state) => state.cookingUstensil);

  const handleTestLog = async () => {
    const db = await getDb();
    const test = await db.getAllAsync(
    `
SELECT
      m.id_menus AS menu_id,
      mc.id_menu_categories AS menu_category_id,
      i.id_ingredients AS ingredient_id,
      mil.quantity,
      u.id_units AS unit_id
    FROM
      menus m
      JOIN menu_ingredient_links mil ON mil.id_menus = m.id_menus
      JOIN ingredients i ON i.id_ingredients = mil.id_ingredients
      JOIN ingredient_menu_category_links imcl ON imcl.id_ingredients = i.id_ingredients
      JOIN menu_categories mc ON mc.id_menu_categories = imcl.id_menu_categories
      JOIN menu_category_moments_links mcml ON mcml.id_menu_categories = mc.id_menu_categories
      AND mcml.id_moments = m.id_moments
      LEFT JOIN units u ON u.id_units = mil.id_units
    ORDER BY
      m.id_menus,
      mc.id_menu_categories;
    `,
    );
    // console.log(recipes[3]?.ingredients);
    // console.log(weeklyMenu[1]?.ingredients);
    console.log(test);
  };
  return (
    <TouchableOpacity style={styles.testButton} onPress={handleTestLog}>
      <Text style={{ color: "transparent" }}>Test</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  testButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 999,
  },
});
