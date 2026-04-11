import { fromDbNumber } from "@helpers/dbHelpers";
import type { IngredientRaw } from "@services/ingredients";
import type { Ingredients } from "@stores/features/ingredients";

export function formatIngredients(rawData: IngredientRaw[]): Ingredients {
  const treated = rawData.reduce<Ingredients>((acc, data) => {
    const menuCategoryIds = data.menu_category_ids
      ? data.menu_category_ids.split(",").map(Number)
      : [];

    const storageLocationIds = data.storage_location_ids
      ? data.storage_location_ids.split(",").map(Number)
      : [];

    acc[data.ingredient_id] = {
      name: data.ingredient_name,
      categoryId: data.category_id,
      stockQuantity: fromDbNumber(data.stock_quantity)!,
      unitId: data.unit_id,
      menuCategoryIds,
      quantifiable: Boolean(data.quantifiable),
      storageLocationIds,
    };

    return acc;
  }, {});

  return treated;
}
