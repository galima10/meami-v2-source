import type { ManualAdjustementItemRaw } from "@services/manualAdjustements";
import type { ManualAdjustementItems } from "@stores/features/manualAdjustements";
import { fromDbNumber } from "helpers/dbHelpers";

export function formatManualAdjustements(
  rawData: ManualAdjustementItemRaw[],
): ManualAdjustementItems {
  const treated = rawData.reduce<ManualAdjustementItems>((acc, data) => {
    acc[data.ingredient_id] = {
      usageCount: fromDbNumber(data.usage_count),
      checked: Boolean(data.checked),
    };

    return acc;
  }, {});

  return treated;
}
