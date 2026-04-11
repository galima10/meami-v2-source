import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgWarmIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M53 8.5a3.3 3.3 0 10-6.7 0v31q0 1.4-1.2 2.2a9.2 9.2 0 109.2 0 3 3 0 01-1.3-2.2zM14.3 49a2.6 2.6 0 013.6 3.7l-4 4a2.6 2.6 0 01-3.7-3.6zM32 20.6a2.6 2.6 0 010 5.1A9.2 9.2 0 0027.4 43a2.6 2.6 0 11-2.5 4.5 14.3 14.3 0 01-1.7-24l.4-.4q3.8-2.6 8.4-2.5M8.5 32.4a2.6 2.6 0 010 5.1h-6a2.6 2.6 0 110-5.1zM10.2 13c1-1 2.6-1 3.6 0l4.1 4.1a2.6 2.6 0 01-3.6 3.7l-4.1-4.1c-1-1-1-2.7 0-3.7m19.2-1.7V5.5a2.6 2.6 0 115.2 0v5.9a2.6 2.6 0 11-5.2 0m28.7 26.7a14.3 14.3 0 11-16.9 0V8.5a8.5 8.5 0 1117 0z"
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
