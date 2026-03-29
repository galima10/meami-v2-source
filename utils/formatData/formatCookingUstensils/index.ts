import type { CookingUstensil } from "@stores/features/cookingUstensils";
import type { CookingUstensilRaw } from "@services/cookingUstensils";
import type { WithRequiredId } from "@app-types/NameId";

export function formatCookingUstensils(
  rawData: CookingUstensilRaw[],
): WithRequiredId<CookingUstensil>[] {
  const treated: WithRequiredId<CookingUstensil>[] = rawData.map((data) => {
    return {
      id: data.cooking_ustensil_id,
      name: data.cooking_ustensil_name,
    };
  });
  return treated;
}
