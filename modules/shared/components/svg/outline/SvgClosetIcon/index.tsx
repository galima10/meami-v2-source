import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgClosetIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G fill={color} clipPath="url(#a)">
        <Path
          fillRule="evenodd"
          d="M60 60.9a3 3 0 01-3 3.1 3 3 0 01-3-3.1v-2.1H10v2A3 3 0 017 64a3 3 0 01-3-3.1V3a3 3 0 013-3h50a3 3 0 013 3.1zm-31-8.4H10V6.3h19zm6 0h19V6.3H35z"
          clipRule="evenodd"
        />
        <Path d="M22 24.1a2.6 2.6 0 00-2.5 2.7v7.8c0 1.5 1.1 2.6 2.5 2.6s2.5-1.1 2.5-2.6v-7.8c0-1.5-1.1-2.7-2.5-2.7m20 13.1q2.3-.2 2.5-2.6v-7.8c0-1.5-1.1-2.7-2.5-2.7a2.6 2.6 0 00-2.5 2.7v7.8q.2 2.4 2.5 2.6" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h64v64H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
