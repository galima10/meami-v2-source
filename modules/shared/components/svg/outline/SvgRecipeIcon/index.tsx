import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgRecipeIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <G clipPath="url(#b)">
          <Path
            fill={color}
            fillRule="evenodd"
            d="M30.2 29l2.4-3q.5-.6.2-1.4c-.6-2.2-1.6-6.2 2.3-10.2C39.5 9.7 47.8 2.6 50.7 0L64 10.4c-1.7 3.4-6.6 13.2-10 18.6-3 5-7.2 4.9-9.6 4.8q-.8 0-1.4.6l-4.3 5.4 10.6 13.4a6.7 6.7 0 01-10.5 8.2l-8.7-10.9c-4.2 5.2-8 9.8-8.6 10.8a6.4 6.4 0 01-9.3 1.3 6.5 6.5 0 01-1.3-9.5l10.6-13.3-1.6-2-5.4 4.2C9.5 35 0 16.4 0 6.5 0-.3 4.7 0 4.9 0a5 5 0 013.9 2zm-9.4 1.3L43 58.2c.6.8 1.6.5 1.9.2q1-.9.2-1.9L5.2 6A71 71 0 0016 34.1zM25 44.1l-9.7 12c-.4.6-.8 1.5 0 2.2s1.6.1 2.1-.5l9.3-11.6zm10.3-8.6l3.8-4.8c1-1.2 2-2.2 4.7-2.3 2 0 4 .6 5.7-2.2 3-4.8 8.1-14 8.1-14l-1-.9L48.4 22l-1.7-1.4 8-10.7-1.2-.9L45 19.2 43.3 18l8.2-10.5-1-.8S42.9 13.9 38.9 18c-2.1 2.3-1.2 4-.7 6 .6 2.6-.2 3.9-1.2 5l-3.4 4.3z"
            clipRule="evenodd"
          />
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
