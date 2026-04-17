import type { Operation } from "@app-types/DbQuantity";

export function applyOperation(
  current: number,
  value: number,
  operation: Operation,
) {
  switch (operation) {
    case "set":
      return value;
    case "increment":
      return current + value;
    case "decrement":
      return Math.max(0, current - value);
  }
}
