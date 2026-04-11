import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import type { ColorValue } from "react-native";

type Props = SvgProps & { color?: ColorValue };

export default function SvgCookingIcon({ color = "#000", ...props }: Props) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G fill={color} clipPath="url(#a)">
        <Path d="M61 30.2H3a3 3 0 00-2.9 3v13.5c0 7 5.7 12.6 12.6 12.6h17.5c7 0 12.6-5.6 12.6-12.6V36.1H61a3 3 0 000-5.9M36.9 46.7c0 3.8-3 6.8-6.7 6.8H12.6c-3.7 0-6.8-3-6.8-6.8V36.1h31zM15 16.4c-1.2-1.2-1.7-1.8-1.7-3.1s.5-2 1.7-3.2a2.4 2.4 0 10-3.5-3.4C10.2 8 8.4 9.8 8.4 13.3s1.8 5.2 3.1 6.5c1.2 1.2 1.8 1.8 1.8 3.2a2.4 2.4 0 104.8 0c0-3.5-1.8-5.3-3.1-6.6m12.9 0c-1.2-1.2-1.7-1.8-1.7-3.1s.5-2 1.7-3.2a2.4 2.4 0 10-3.4-3.4C23 8 21.3 9.8 21.3 13.3s1.8 5.2 3.2 6.5c1.2 1.2 1.7 1.8 1.7 3.2a2.4 2.4 0 104.8 0c0-3.5-1.8-5.3-3.1-6.6" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h64v64H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
