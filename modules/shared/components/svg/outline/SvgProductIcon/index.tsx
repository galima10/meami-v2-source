import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgProductIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M51.7 9.6L48 4A8 8 0 0041.1.4H21a2 2 0 00-2.1 2.1v4.1c0 1.2 1 2 2 2H25v2.1q0 3.3-2.3 5.6l-1.2 1.2a2 2 0 102.9 3l1.2-1.3q2.7-2.7 3.3-6.4h.2c2.3 0 4.1 1.8 4.1 4.1V21h-.7a6 6 0 00-6.2 6.2v8.2q-.2 1.9-2 2h-4.1a6 6 0 00-6.2 6.3v13.7c0 3.4 2.8 6.2 6.2 6.2h24.7c3.4 0 6.1-2.8 6.1-6.2V27.2c0-3.4-2.7-6.2-6.1-6.2h-3.5v-4c0-2.4 1.9-4.2 4.2-4.2h4.3a2 2 0 001.8-3.2M34.6 45.7H18v-2c0-1.2 1-2.1 2-2.1h4.2c3.4 0 6.2-2.8 6.2-6.2v-8.2q.2-1.8 2-2h2zm10.3-20.6c1.1 0 2 1 2 2.1v18.5h-8.2V25.1z"
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
