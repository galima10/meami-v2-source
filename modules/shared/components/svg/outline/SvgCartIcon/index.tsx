import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgCartIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M30.6 24.5a2.7 2.7 0 01-.9-3.7l8.1-13.5q.8-1.2 2.3-1.3c2.1 0 3.4 2.3 2.3 4.1l-8.1 13.5a2.7 2.7 0 01-3.7 1zm23.7 5.8v.1l-9.8 24.2h-25L9.6 30.4v-.1h11.5c2.5 3.4 6.4 5.4 10.8 5.4 4.3 0 8.2-2 10.8-5.4zm10.1-5.4H39.8l-1 1.5a8 8 0 01-6.8 3.9 8 8 0 01-7.6-5.4H-.4v5.4h1.7q2.4 0 3.4 2.1L15.8 60h32.4l11-27.6q1.1-2 3.5-2.1h1.7zM26.6 49.2c0 1.5-1.2 2.7-2.7 2.7a2.7 2.7 0 01-2.7-2.7v-8.1c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7zm16.2 0c0 1.5-1.2 2.7-2.7 2.7a2.7 2.7 0 01-2.7-2.7v-8.1c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7zm-8.1 0c0 1.5-1.2 2.7-2.7 2.7a2.7 2.7 0 01-2.7-2.7v-8.1c0-1.5 1.2-2.7 2.7-2.7s2.7 1.2 2.7 2.7z"
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
