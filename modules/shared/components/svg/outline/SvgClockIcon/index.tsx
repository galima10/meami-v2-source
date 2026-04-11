import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgClockIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G fill={color} fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
        <Path d="M32 64a32 32 0 100-64 32 32 0 000 64m24.2-32a24.2 24.2 0 10-48.4 0 24.2 24.2 0 0048.4 0" />
        <Path d="M45.8 36.5l-10-6.6V15.5a3.9 3.9 0 10-7.7 0V32q.1 2 1.7 3.2L41.5 43a3.9 3.9 0 104.3-6.5" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h64v64H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
