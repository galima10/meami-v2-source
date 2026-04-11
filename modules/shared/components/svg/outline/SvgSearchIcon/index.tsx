import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgSearchIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M54.8 27.4q-.1 9.6-5.6 16.7L63 57.9q1 1.1 1 2.5-.2 2-1.4 2.9-1.2.7-2.2.7-1.4 0-2.5-1L44 49.2A27.3 27.3 0 010 27.4a27.4 27.4 0 0154.8 0m-7.1 0a20.3 20.3 0 10-40.6 0 20.3 20.3 0 0040.6 0"
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
