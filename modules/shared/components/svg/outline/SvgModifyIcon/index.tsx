import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgModifyIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M29.6 10.7c1.3 0 2.4 1.3 2.4 2.7S30.9 16 29.6 16H4.8v42.6h54.4v-31c0-1.5 1-2.7 2.4-2.7s2.4 1.2 2.4 2.7v32.8c0 2.3-1.7 3.6-3.2 3.6H3.2C1.7 64 0 62.7 0 60.4V14.3c0-1.7 1.2-3.6 3.2-3.6zM23.2 34c-3.4 10.6-4 12.2-4 13.6 0 1.6 1.2 2.3 2 2.3s3.6-1.1 12.3-4.5zm2.8-3.2l10.3 11.5 26.9-29.9q.8-.9.8-2a3 3 0 00-.8-2.2L56.7 1q-.8-.9-2-.9-1 0-1.8.9z"
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
