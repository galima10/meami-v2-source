import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgChangeIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G fill={color} clipPath="url(#a)">
        <Path
          fillRule="evenodd"
          d="M6.7 27.5l-.1.4c-.2 1.4-.4 2.3-.4 4.1"
          clipRule="evenodd"
        />
        <Path d="M63.5 37.8A32 32 0 0012 7l.8-3c.4-1.6-.4-3.2-2-3.8h-.2l-.3-.2C8.9-.2 7.4.6 7 2l-.1.3L4 12.4c-.4 1.7.6 3.4 2.2 3.9L16.4 19a3.1 3.1 0 001.6-6l-2.5-.8A25.8 25.8 0 0157.8 32a24 24 0 01-.5 4.7 3.1 3.1 0 005 3q1-.8 1.2-2" />
        <Path
          fillRule="evenodd"
          d="M6.2 32a25.8 25.8 0 0042.3 19.8L46 51a3.1 3.1 0 011.6-6l10 2.6c1.6.5 2.6 2 2.3 3.6v.3l-2.8 10a3.1 3.1 0 01-6-1.5l.9-3A32 32 0 01.5 26.2V26q.3-1 1.2-1.7a3.1 3.1 0 015 3l-.1.6c-.2 1.4-.4 2.3-.4 4.1"
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
