import { FONT_BASE, TYPE_SCALE } from "@constants/general";

export function typeScale(step: number, ratio = TYPE_SCALE, base = FONT_BASE) {
  return Math.round(base * Math.pow(ratio, step));
}

