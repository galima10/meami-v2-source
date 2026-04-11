import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgAddStockIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G fill={color} clipPath="url(#a)">
        <Path d="M53.56 14.06V8.44h-5.62a.94.94 0 110-1.88h5.62V.94a.94.94 0 111.88 0v5.62h5.62a.94.94 0 110 1.88h-5.62v5.62a.94.94 0 11-1.88 0" />
        <Path
          fillRule="evenodd"
          d="M28.92 64L10.5 52.88v-9.7l11.7 7.66 6.72-8.37zm2.16 0V42.38l6.85 8.2L49.5 43.3v9.55L31.08 63.98zM8.68 39.14L4 36.09l6.5-8.1L4 21.07 22.9 10l6.97 5.84 7.2-5.84L56 21.2 49.52 28 56 36.43l-4.85 3.04-12.79 8.03-7.25-8.7 16.07-9.71-17.16-10.73L12.86 29.1l16.08 9.67v.05l-7.15 8.88-11.27-7.39-.34-.22-1.48-.95z"
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
