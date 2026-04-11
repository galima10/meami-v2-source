import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgCloseIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <G clipPath="url(#b)">
          <Path
            fill={color}
            d="M46.4 51.8L31.6 36.9 16.7 51.8a3.5 3.5 0 01-4.9-5L26.6 32 11.8 17.2a3.5 3.5 0 015-5l14.8 14.9 14.8-14.9a3.5 3.5 0 015 5L36.5 32l14.9 14.8a3.5 3.5 0 01-5 5"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h64v64H0z" />
        </ClipPath>
        <ClipPath id="b">
          <Path fill="#fff" d="M8 8h48v48H8z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
