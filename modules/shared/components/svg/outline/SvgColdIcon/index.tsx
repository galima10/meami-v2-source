import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgColdIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M32 24.8l-4.7 1.3 4.2 2.4-1.3 2.3-4.2-2.3 1.3 4.7-2.6.7-2-7.3-5.4-3v5.2l5.4 5.3-2 1.9-3.4-3.4v4.7h-2.6v-4.7L11.2 36l-1.9-1.9 5.4-5.3v-5.2l-5.4 3-2 7.3-2.6-.7L6 28.5l-4.2 2.3-1.3-2.3L4.7 26 0 24.8l.7-2.5 7.3 2 5.3-3-5.3-3-7.3 2.1-.7-2.6 4.7-1.3-4.2-2.3 1.3-2.3L6 14.2 4.7 9.5l2.6-.7 2 7.3 5.4 3v-5.2L9.3 8.6l2-2 3.4 3.5V5.3h2.6v4.8l3.5-3.4 1.9 1.9-5.4 5.3V19l5.4-3 2-7.3 2.6.7-1.3 4.7 4.2-2.3 1.3 2.3-4.2 2.3 4.7 1.3-.7 2.6-7.3-2-5.3 3 5.3 2.9 7.3-2zM42.7 9.3v20.1c0 4.2-1.4 6.1-3.8 8.1a12 12 0 1015.5 0c-2.4-2-3.7-4-3.7-8.1v-20a4 4 0 00-8 0m13.3 0v20.1q0 2.4 1.9 4A17.3 17.3 0 0146.7 64a17.3 17.3 0 01-11.2-30.5q1.7-1.6 1.8-4.1v-20a9.3 9.3 0 1118.7 0m0 37.4a9.3 9.3 0 11-18.7 0c0-3 1.6-5.6 3.7-7.4 2.7-2.4 4.3-4.7 4.3-8.6v-1.4H48v1.4c0 4 1.6 6.2 4.3 8.6a10 10 0 013.7 7.4"
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
