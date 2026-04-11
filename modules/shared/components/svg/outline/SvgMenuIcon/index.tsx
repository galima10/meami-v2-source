import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgMenuIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M37 12H27a3 3 0 110-6h10a3 3 0 110 6m0 6a9 9 0 009-8h2a2 2 0 012 2v44a2 2 0 01-2 2H16a2 2 0 01-2-2V12q.2-1.8 2-2h2a9 9 0 009 8zm7.5-14A9 9 0 0037 0H27a9 9 0 00-7.5 4H16a8 8 0 00-8 8v44a8 8 0 008 8h32a8 8 0 008-8V12a8 8 0 00-8-8z"
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
