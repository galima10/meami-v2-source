import { CookingInfo, CookingDuration } from "@stores/features/cookingInfos";
import { CookingInfoRawType } from "@services/cookingInfos";

export function formatCookingInfos(
  rawData: CookingInfoRawType[],
): CookingInfo[] {
  const grouped = rawData.reduce(
    (acc, item) => {
      const key = item.ingredient_id;

      if (!acc[key]) {
        acc[key] = {
          cookingInfoId: item.cooking_info_id,
          ingredientId: item.ingredient_id,
          ingredientName: item.ingredient_name,
          preparationTypesMap: {} as Record<
            string,
            { name: string; cookingDurations: CookingDuration[] }
          >,
        };
      }

      const cookingInfo = acc[key];

      if (!cookingInfo.preparationTypesMap[item.preparation_type]) {
        cookingInfo.preparationTypesMap[item.preparation_type] = {
          name: item.preparation_type,
          cookingDurations: [],
        };
      }

      cookingInfo.preparationTypesMap[
        item.preparation_type
      ].cookingDurations.push({
        ustensilName: item.ustensil_name,
        duration: item.duration ?? null,
        temperature: item.temperature ?? null,
      });

      return acc;
    },
    {} as Record<number, any>,
  );

  return Object.values(grouped).map((ci) => ({
    cookingInfoId: ci.cookingInfoId,
    ingredientId: ci.ingredientId,
    ingredientName: ci.ingredientName,
    preparationTypes: Object.values(ci.preparationTypesMap),
  }));
}
