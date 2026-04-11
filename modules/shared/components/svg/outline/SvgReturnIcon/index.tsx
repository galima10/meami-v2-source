import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgReturnIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <G clipPath="url(#b)">
          <Path
            fill={color}
            d="M36 58.8c30.5-18.4 7.1-46.7-14.8-35l4 6.6L5.4 25l5.2-19.5 3.6 6.2C54-8.3 78.6 45.4 36 58.8"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h64v64H0z" />
        </ClipPath>
        <ClipPath id="b">
          <Path fill="#fff" d="M5 5h54v54H5z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
