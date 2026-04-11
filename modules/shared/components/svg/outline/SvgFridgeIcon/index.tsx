import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgFridgeIcon({ color = "#000", ...props }: Props) {
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
