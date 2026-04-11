import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

export default function SvgMealIcon({ ...props }: SvgProps) {
  return (
    <Svg
      width={64}
      height={64}
      fill="none"
      viewBox="0 0 64 64"
      {...props}
    ></Svg>
  );
}
