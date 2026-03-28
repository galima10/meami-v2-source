export interface SeedRow {
  id?: number;
  name: string;
}

export type WithRequiredId<T> = T & { id: number };