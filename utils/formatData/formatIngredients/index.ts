import type { IngredientRaw } from "@services/ingredients";
import type { Ingredient } from "@stores/features/ingredients";
import type { WithRequiredId } from "@app-types/NameId";

export function formatIngredients(
  rawData: IngredientRaw[],
): WithRequiredId<Ingredient>[] {
  const treated = rawData.map((data) => {
    const menuCategoryIds = data.menu_categorie_ids.split(",").map(mc => parseInt(mc));
    const storageLocationIds = data.storage_location_ids.split(",").map(sl => parseInt(sl));
    return {
      id: data.ingredient_id,
      name: data.ingredient_name,
      categoryId: data.category_id,
      stockQuantity: data.stock_quantity,
      unitId: data.unit_id,
      menuCategoryIds: menuCategoryIds,
      quantifiable: Boolean(data.quantifiable),
      storageLocationIds: storageLocationIds
    }
  });
  return treated;
}
