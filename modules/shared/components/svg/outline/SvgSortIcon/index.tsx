import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgSortIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G fill={color} clipPath="url(#a)">
        <Path d="M17.8 49.8c5.4 0 9.8-4.2 9.8-9.5s-4.4-9.6-9.8-9.6A9.7 9.7 0 008 40.3c0 5.3 4.4 9.5 9.8 9.5" />
        <Path
          fillRule="evenodd"
          d="M21.9 28.3l-1.5-.3a13 13 0 00-5.2 0l-1.5.3V4.4a4 4 0 014-4 4 4 0 014.2 4zm24.3 5c5.4 0 9.8-4.3 9.8-9.6s-4.4-9.5-9.8-9.5a9.7 9.7 0 00-9.8 9.5c0 5.3 4.4 9.6 9.8 9.6m0-11q1.6.1 1.6 1.4-.1 1.4-1.6 1.5-1.5-.1-1.6-1.5.1-1.3 1.6-1.5m4.1-10.4l-1.5-.3a13 13 0 00-5.2 0l-1.5.3V4.4a4 4 0 014.1-4 4 4 0 014.1 4zm-4.1 51.8a4 4 0 004.1-4V35.7l-1.5.3a13 13 0 01-5.2 0l-1.5-.3v23.9a4 4 0 004.1 4m-24.3-4a4 4 0 01-4.1 4 4 4 0 01-4.1-4v-7.4l1.5.3a13 13 0 005.2 0l1.5-.3z"
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
