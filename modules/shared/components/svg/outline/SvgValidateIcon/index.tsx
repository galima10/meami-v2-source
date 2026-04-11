import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgValidateIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M22.9 52q-1.4 0-2.4-1L5 36a3.3 3.3 0 010-4.9 3.4 3.4 0 014.9 0l12.7 12.6L54.1 13c1.4-1.3 3.6-1.3 4.9 0s1.4 3.7 0 5L25.4 51q-1.1 1-2.5 1"
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
