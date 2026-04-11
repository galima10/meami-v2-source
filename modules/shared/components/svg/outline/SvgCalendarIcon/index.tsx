import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgCalendarIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M18.1 0c1.8 0 3.2 1.4 3.2 3.2v5.3h21.4V3.2a3.2 3.2 0 116.4 0v5.3h4.2c4.7 0 8.6 3.9 8.6 8.6v38.4c0 4.7-3.9 8.5-8.6 8.5H10.7A8.5 8.5 0 012 55.5V17c0-4.7 3.9-8.6 8.6-8.6h4.2V3.2C15 1.4 16.4 0 18.1 0m0 15h-7.4c-1.2 0-2.2.9-2.2 2v6.5h47V17c0-1.2-1-2.2-2.2-2.2zM8.5 29.8v25.6c0 1.1 1 2.1 2.2 2.1h42.6c1.2 0 2.2-1 2.2-2.1V29.9z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h64v64H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
