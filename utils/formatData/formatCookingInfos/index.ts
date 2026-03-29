import type { CookingInfo, CookingDuration } from "@stores/features/cookingInfos";
import type { CookingInfoRaw } from "@services/cookingInfos";
import type { WithRequiredId } from "@app-types/NameId";

export function formatCookingInfos(
  rawData: CookingInfoRaw[],
): WithRequiredId<CookingInfo>[] {
  const treated = rawData.reduce(
    (acc, item) => {
      const key = item.ingredient_id;

      if (!acc[key]) {
        acc[key] = {
          cookingInfoId: item.cooking_info_id,
          ingredientId: item.ingredient_id,
          preparationTypesMap: {} as Record<
            string,
            { name: string; cookingDurations: WithRequiredId<CookingDuration>[] }
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
        id: item.cooking_duration_id,
        ustensilId: item.ustensil_id,
        duration: item.duration ?? null,
        temperature: item.temperature ?? null,
      });

      return acc;
    },
    {} as Record<number, any>,
  );

  return Object.values(treated).map((ci) => ({
    id: ci.cookingInfoId,
    ingredientId: ci.ingredientId,
    preparationTypes: Object.values(ci.preparationTypesMap),
  }));
}
