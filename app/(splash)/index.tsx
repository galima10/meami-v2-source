import type { WithRequiredId } from "@app-types/NameId";
import type { CookingInfo } from "@stores/features/cookingInfos";
import type { IngredientCategory } from "@stores/features/ingredientCategories";
import type { Ingredient } from "@stores/features/ingredients";
import type { Product } from "@stores/features/products";
import type { RecipeCategory } from "@stores/features/recipeCategories";
import type { Recipe } from "@stores/features/recipes";
import type { StorageInfo } from "@stores/features/storageInfos";
import type { Unit } from "@stores/features/units";
import { useAppDispatch, useAppSelector } from "modules/shared/hooks/redux";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { fetchIngredientCategoriesThunk } from "@stores/thunks/ingredientCategories";
import { fetchProductsThunk } from "@stores/thunks/products";
import { fetchRecipeCategoriesThunk } from "@stores/thunks/recipeCategories";
import {
  createRecipeThunk,
  deleteRecipeThunk,
  fetchRecipesThunk,
  updateRecipeThunk,
} from "@stores/thunks/recipes";
import { fetchStorageInfosThunk } from "@stores/thunks/storageInfos";
import { fetchUnitsThunk } from "@stores/thunks/units";

import { fetchCookingInfosThunk } from "@stores/thunks/cookingInfos";
import { fetchCookingUstensilsThunk } from "@stores/thunks/cookingUstensils";
import { fetchIngredientsThunk } from "@stores/thunks/ingredients";

const cookingInfo1: CookingInfo = {
  ingredientId: 3,
  preparationTypes: [
    {
      name: "Grillé",
      cookingDurations: [
        {
          ustensilId: 2,
          duration: 10,
          temperature: 180,
        },
      ],
    },
  ],
};

const storageInfo1: StorageInfo = {
  ingredientId: 3,
  storageLocations: [
    {
      id: 2,
      storageDurations: [
        {
          type: "avant ouverture",
          duration: null,
          units: "date de péremption",
        },
      ],
    },
  ],
};

const ingredientCategory1: IngredientCategory = {
  name: "Produit laitier",
};
const recipeCategory1: RecipeCategory = {
  name: "Groumande",
};
const cookingUstensil1: IngredientCategory = {
  name: "Air fryer",
};

const unit1: Unit = {
  name: "Bouteille",
  abbreviation: "btle",
};
const unit2: Unit = {
  name: "Portion",
  abbreviation: "prtn",
};

const ingredient1: Ingredient = {
  name: "Lait",
  categoryId: 7,
  stockQuantity: 1,
  unitId: 4,
  menuCategoryIds: [1, 8],
  quantifiable: false,
  storageLocationIds: [4, 2],
};
const ingredient2: Ingredient = {
  name: "Filet de poulet",
  categoryId: 8,
  stockQuantity: 1,
  unitId: 5,
  menuCategoryIds: [4],
  quantifiable: true,
  storageLocationIds: [2, 3],
};

const product1: Product = {
  name: "Essuie-tout",
  stockQuantity: 1,
};
const newProduct1: WithRequiredId<Product> = {
  id: 2,
  name: "Essuie-toutezzzzzzzzz",
  stockQuantity: 12,
};

const recipe1: Recipe = {
  name: "Fish & Chips de saumon",
  type: "plat princ.",
  duration: 45,
  imagePreview: null,
  recipe: null,
  categoryIds: [2],
  isMorning: false,
  ingredients: [
    {
      ingredientId: 3,
      quantity: 1,
      unitId: 5,
      menuCategoryId: 1,
    },
  ],
};

const newRecipe1: WithRequiredId<Recipe> = {
  id: 2,
  name: "Fish & Chips de saumon",
  type: "plat princ.",
  duration: 45,
  imagePreview: "url_fish_and_chips",
  recipe: "Recette du fish & chips",
  categoryIds: [2],
  isMorning: true,
  ingredients: [
    {
      ingredientId: 3,
      quantity: 1,
      unitId: 5,
      menuCategoryId: 1,
    },
  ],
};

const newStorageLocationsIngredient1 = [1, 3];

export default function Splash() {
  const dispatch = useAppDispatch();
  const { cookingInfos } = useAppSelector((state) => state.cookingInfo);
  const { storageInfos } = useAppSelector((state) => state.storageInfo);
  const { ingredientCategories } = useAppSelector(
    (state) => state.ingredientCategory,
  );
  const { recipeCategories } = useAppSelector((state) => state.recipeCategory);
  const { cookingUstensils } = useAppSelector((state) => state.cookingUstensil);
  const { menuCategories, storageLocations, days, moments } = useAppSelector(
    (state) => state.seed,
  );
  const { units } = useAppSelector((state) => state.unit);
  const { products } = useAppSelector((state) => state.product);
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { recipes } = useAppSelector((state) => state.recipe);
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  // const router = useRouter();

  async function handleAdd() {
    try {
      // const result = await dispatch(
      //   createIngredientCategoryThunk(ingredientCategory2),
      // ).unwrap();
      // const result = await dispatch(
      //   createRecipeCategoryThunk(recipeCategory1),
      // ).unwrap();
      // const result = await dispatch(
      //   createUstensilThunk(cookingUstensil1),
      // ).unwrap();
      // const result = await dispatch(setCookingInfoThunk(cookingInfo1)).unwrap();
      // const result = await dispatch(setStorageInfoThunk(storageInfo1)).unwrap();
      // const result = await dispatch(createProductThunk(product1)).unwrap();
      const result = await dispatch(createRecipeThunk(recipe1)).unwrap();
      // const result = await dispatch(createUnitThunk(unit2)).unwrap();
      // const result = await dispatch(
      //   createIngredientThunk(ingredient2),
      // ).unwrap();
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  async function handleDelete() {
    try {
      // const result = await dispatch(deleteIngredientCategoryThunk(1)).unwrap();
      // const result = await dispatch(deleteRecipeCategoryThunk(1)).unwrap();
      // const result = await dispatch(deleteUstensilThunk(1)).unwrap();
      // const result = await dispatch(removeCookingInfoThunk(3)).unwrap();
      // const result = await dispatch(removeStorageInfoThunk(3)).unwrap();
      // const result = await dispatch(deleteUnitThunk(3)).unwrap();
      // const result = await dispatch(deleteIngredientThunk(1)).unwrap();
      // const result = await dispatch(deleteProductThunk(2)).unwrap();
      const result = await dispatch(deleteRecipeThunk(2)).unwrap();
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  async function handleUpdate() {
    try {
      // const result = await dispatch(
      //   updateIngredientThunk(newIngredient1),
      // ).unwrap();
      // const result = await dispatch(
      //   setQuantifiableThunk({
      //     ingredientId: 2,
      //     newQuantifiable: true,
      //   }),
      // ).unwrap();
      // const result = await dispatch(updateProductThunk(newProduct1)).unwrap();
      // const result = await dispatch(updateRecipeThunk(newRecipe1)).unwrap();
    } catch (err) {
      console.error("Thunk rejected:", err);
    }
  }

  useEffect(() => {
    dispatch(fetchStorageInfosThunk());
    dispatch(fetchCookingInfosThunk());
    dispatch(fetchCookingUstensilsThunk());
    dispatch(fetchIngredientCategoriesThunk());
    dispatch(fetchRecipeCategoriesThunk());
    dispatch(fetchUnitsThunk());
    dispatch(fetchProductsThunk());
    dispatch(fetchIngredientsThunk());
    dispatch(fetchRecipesThunk());
  }, []);
  // useEffect(() => {
  //   console.log(ingredients);
  // }, [ingredients]);

  

  return (
    <View style={styles.container}>
      <Pressable
        // onPress={() => router.replace("/(tabs)/menuTab/MenuCalendarScreen")}
        onPress={() => handleAdd()}
      >
        <Text style={styles.button}>Ajouter</Text>
      </Pressable>
      <Pressable onPress={() => handleDelete()}>
        <Text style={styles.button}>Supprimer</Text>
      </Pressable>
      <Pressable onPress={() => handleUpdate()}>
        <Text style={styles.button}>Modifier</Text>
      </Pressable>
      {/* {ingredients.map((i) => {
        const ingredientUnit = units.find((u) => u.id === i.unitId);
        const ingredientCategory = ingredientCategories.find(
          (ic) => ic.id === i.categoryId,
        );
        const ingredientMenuCategories = i.menuCategoryIds
          ? menuCategories.filter((mc) => i.menuCategoryIds.includes(mc.id))
          : [];
        console.log("ingredientMenuCategories", i.menuCategoryIds);
        const ingredientStorageLocations = i.storageLocationIds
          ? storageLocations.filter((sl) =>
              i.storageLocationIds?.includes(sl.id),
            )
          : [];

        return (
          <View key={`ingredients-${i.id}`} style={styles.rowContainer}>
            <Text>
              {i.name} - quantifiable: {i.quantifiable ? "true" : "false"} -
              stock: {i.stockQuantity} :: id: {i.id}
              {"   "}
            </Text>
            <Text>
              {ingredientCategory?.name}
              {"   "}
            </Text>
            <Text>
              {ingredientUnit?.name} : ({ingredientUnit?.abbreviation}){"   "}
            </Text>
            {ingredientMenuCategories.map((imc) => (
              <Text key={imc.id}>
                {imc.name.toLowerCase()}
                {"   "}
              </Text>
            ))}
            {ingredientStorageLocations.map((isl) => (
              <Text key={isl.id}>
                {isl.name.toLowerCase()}
                {"   "}
              </Text>
            ))}
          </View>
        );
      })} */}
      {/* {cookingInfos.map((ci) => {
        const ingredient = ingredients.find((i) => i.id === ci.ingredientId);
        return (
          <View key={`cookingInfo-${ci.id}`} style={styles.rowContainer}>
            <Text>
              ci.id: {ci.id}
              {"   "}{" "}
            </Text>
            <Text>
              {ingredient?.name} :: {ci.ingredientId}
              {"   "}
            </Text>
            {ci.preparationTypes.map((pt, index) => (
              <View key={`pt-${index}`}>
                <Text>
                  {pt.name}
                  {"   "}
                </Text>
                {pt.cookingDurations.map((cd) => {
                  const ustensil = cookingUstensils.find(
                    (cu) => cu.id === cd.ustensilId,
                  );
                  return (
                    <Text key={cd.id}>
                      {cd.duration} minutes - {cd.temperature}° -{" "}
                      {ustensil?.name}
                    </Text>
                  );
                })}
              </View>
            ))}
          </View>
        );
      })}
      {storageInfos.map((si) => {
        const ingredient = ingredients.find((i) => i.id === si.ingredientId);
        return (
          <View key={`storageInfo-${si.id}`} style={styles.rowContainer}>
            <Text>
              si.id: {si.id}
              {"   "}{" "}
            </Text>
            <Text>
              {ingredient?.name} :: {si.ingredientId}
              {"   "}
            </Text>
            {si.storageLocations.map((sl, index) => {
              const location = storageLocations.find((sls) => sls.id === sl.id);
              return (
                <View key={`pt-${index}`}>
                  <Text>
                    {sl.id} :: {location?.name.toLowerCase()}
                    {"   "}
                  </Text>
                  {sl.storageDurations.map((sd, index) => (
                    <Text key={`sd-${index}`}>
                      {sd.duration} {sd.units} - {sd.type}
                    </Text>
                  ))}
                </View>
              );
            })}
          </View>
        );
      })} */}
      {/* {recipes.map((r) => {
        const categories = r.categoryIds
          ? recipeCategories.filter((rc) => r.categoryIds.includes(rc.id))
          : [];
        const ingredientsRecipe = r.ingredients
          .map((ri) => {
            const ingredient = ingredients.find(
              (i) => i.id === ri.ingredientId,
            );
            if (!ingredient) return null; // filtre les cas où l'ingrédient n'existe pas
            return {
              ...ingredient, // infos globales de l'ingrédient (nom, stock, etc.)
              quantity: ri.quantity, // quantité spécifique à la recette
              unitId: ri.unitId, // unité spécifique à la recette
            };
          })
          .filter(Boolean) as (Ingredient & {
          quantity: number;
          unitId: number;
        })[];
        return (
          <View key={`recipes-${r.id}`}>
            <Text>
              id: {r.id} :: {r.name} - {r.type} - {r.duration} min -{" "}
              {r.imagePreview} - {r.recipe} - isMorning:{" "}
              {r.isMorning ? "true" : "false"} : {r.id}{" "}
            </Text>
            {categories.map((rc, index) => {
              return <Text key={`category-${index}`}>{rc.name}</Text>;
            })}
            {ingredientsRecipe.map((ic, index) => {
              const ingredientUnit = units.find((u) => u.id === ic.unitId);
              return (
                <Text key={`ingredients-${index}`}>
                  {ic.name} - {ic.quantity} {ingredientUnit?.abbreviation}
                </Text>
              );
            })}
          </View>
        );
      })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 16,
  },
  infosContainer: {
    position: "absolute",
    left: 16,
    top: 24,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  littleText: {
    fontSize: 9,
  },
  button: {
    fontSize: 24,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

// dans la console, pour supprimer node_modules et package-lock.json dans un terminal windows : rmdir /s /q node_modules && del package-lock.json
