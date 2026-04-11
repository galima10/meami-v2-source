import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgListIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M8 14a2 2 0 00-2 2v32q.2 1.8 2 2h48a2 2 0 002-2V16a2 2 0 00-2-2zm-8 2a8 8 0 018-8h48a8 8 0 018 8v32a8 8 0 01-8 8H8a8 8 0 01-8-8zm20 24a4 4 0 11-8 0 4 4 0 018 0m-4-12a4 4 0 110-8 4 4 0 010 8m13-7h20a3 3 0 110 6H29a3 3 0 110-6m0 16h20a3 3 0 110 6H29a3 3 0 110-6"
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
