import type { SeedRow } from "@stores/features/seeds";
import type { SeedRowRaw } from "@services/seeds";

export function formatSeeds(rawData: SeedRowRaw[]): SeedRow {
  const treated = rawData.reduce<SeedRow>((acc, data) => {
    acc[data.id] = {
      name: data.name,
    };

    return acc;
  }, {});

  return treated;
}
