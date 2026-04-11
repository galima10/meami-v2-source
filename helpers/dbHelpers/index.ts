import { QUANTITY_SCALE } from "@constants/general";

export function toDbNumber(value: number): number {
  return Math.round(value * QUANTITY_SCALE);
}

export function toDbNumberOrNull(
  value: number | null | undefined,
): number | null {
  if (value == null) return null;
  return toDbNumber(value);
}

export function fromDbNumber(value: number): number {
  return value / QUANTITY_SCALE;
}

export function fromDbNumberOrNull(value: number | null): number | null {
  if (value == null) return null;
  return fromDbNumber(value);
}
