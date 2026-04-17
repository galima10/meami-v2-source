import type { Units } from "@stores/features/units";
import type { UnitRaw } from "@services/units";

export function formatUnits(rawData: UnitRaw[]): Units {
  const treated = rawData.reduce<Units>((acc, data) => {
    acc[data.id] = {
      name: data.name,
      abbreviation: data.abbreviation,
    };

    return acc;
  }, {});

  return treated;
}
