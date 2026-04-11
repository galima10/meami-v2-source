import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgBinIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M14.5 60q-3 0-5-1.8a6 6 0 01-2-4.4V13.3H4V7.1h17.5V4h21v3.1H60v6.2h-3.5v40.5q0 2.6-2 4.4a7 7 0 01-5 1.8zm35-46.7h-35v40.5h35zm-28 34.3h7v-28h-7zm14 0h7v-28h-7z"
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
