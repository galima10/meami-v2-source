import type { CookingUstensils } from "@stores/features/cookingUstensils";
import type { CookingUstensilRaw } from "@services/cookingUstensils";
import type { WithRequiredId } from "@app-types/NameId";

export function formatCookingUstensils(
  rawData: CookingUstensilRaw[],
): CookingUstensils {
  const treated = rawData.reduce<CookingUstensils>((acc, data) => {
    acc[data.cooking_ustensil_id] = {
      name: data.cooking_ustensil_name,
    };

    return acc;
  }, {});

  return treated;
}
