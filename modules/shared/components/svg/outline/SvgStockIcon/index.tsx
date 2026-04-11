import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgStockIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          fillRule="evenodd"
          d="M30.7 61.8L8 49.8V39.2l14.4 8.3 8.3-9zm2.6 0V38.3l8.5 9 14.2-8v10.4zm-27.5-27L0 31.5l8-8.8-8-7.5 23.3-12 8.5 6.3 8.9-6.3L64 15.3l-8 7.4 8 9.2-6 3.3-15.7 8.7-9-9.4 19.8-10.6-21-11.6-21.2 11.6 19.8 10.5-8.8 9.7-13.9-8-.4-.2z"
          clipRule="evenodd"
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
