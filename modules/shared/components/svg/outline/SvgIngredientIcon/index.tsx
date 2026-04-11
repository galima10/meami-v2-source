import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgIngredientIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <G fill={color} fillRule="evenodd" clipPath="url(#b)" clipRule="evenodd">
          <Path d="M64 21.5a16 16 0 01-14.3 16.1L43 51.1V61c0 1.7-1.4 3.1-3.1 3.1H24a3 3 0 01-3.1-3.1V51l-6.7-13.5A16 16 0 010 22.3v-.8a16 16 0 0113.2-16A13.5 13.5 0 0129.3 1l.5.2L32 2.5q1.2-.8 2.7-1.5l.6-.2a14 14 0 0115.5 4.8 16 16 0 0111.6 9l.4.7.3.7q.9 2.7.9 5.5m-41.5-15a7 7 0 016.8 2q1.3 1 2.7.8 1.6.2 2.7-.9 1-1 2.4-1.6l.3-.1q2-.8 4.2-.2a3.1 3.1 0 002.3 5.8 10 10 0 0111 2.1A10 10 0 0152 30.5l-.4.2c-2.3 1-5 1-7.2.2l-.5-.2-2.1-1.2c-1-.8-2.5-.9-3.6-.2l-.2.2q-1.1.8-2.2 1.2a10 10 0 01-9.8-1.2 3 3 0 00-3.8 0q-1 .8-2.1 1.2a10 10 0 01-11-2.1 10 10 0 01-1.9-2.8l-.2-.5a10 10 0 0113-13 3.1 3.1 0 002.5-5.8M32 36.9l-.2-.2h.3zm5 12l-.3 1.5v7.3h-9.4v-7.3q0-.8-.4-1.4l-6-12 2.8-1 6 6a3 3 0 004.5 0l6.1-6 1.2.5.7.3q.5 0 .8.3z" />
        </G>
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h64v64H0z" />
        </ClipPath>
        <ClipPath id="b">
          <Path fill="#fff" d="M0 0h64v64H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
