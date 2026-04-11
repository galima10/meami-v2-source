import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgInfosIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M45 36.4A18 18 0 0032 6a18 18 0 00-13 30.4A25 25 0 0125.5 48h12.8c1-4.9 4-8.8 6.7-11.6m4.4 4.1c-3 3.1-5.4 7-5.4 11.2V54a10 10 0 01-10 10h-4a10 10 0 01-10-10v-2.3c0-4.3-2.5-8-5.4-11.2a24 24 0 1134.8 0M26 23a3 3 0 11-6 0c0-6 5-11 11-11a3 3 0 110 6 5 5 0 00-5 5"
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
