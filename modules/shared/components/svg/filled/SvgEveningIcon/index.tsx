import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

export default function SvgEveningIcon({ ...props }: SvgProps) {
  return (
    <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill="#0078b5"
          d="M0 36.8V64h64V36.8zm47.03 11.3h-9.35a.93.93 0 01-.93-.93c0-.52.42-.94.93-.94h9.35c.52 0 .95.43.95.94s-.43.93-.95.93m6.55-3.73H31.14a.94.94 0 01-.94-.94c0-.51.42-.93.94-.93h22.44a.93.93 0 110 1.87m2.8-3.75H28.33a.93.93 0 01-.93-.93c0-.52.42-.94.93-.94h28.05c.52 0 .95.43.95.94s-.43.93-.95.93"
        />
        <Path
          fill="#57b7ff"
          fillRule="evenodd"
          d="M47.04 46.23h-9.35a.93.93 0 00-.94.94c0 .52.42.93.94.93h9.35a.93.93 0 100-1.87m9.35-7.48H28.34a.93.93 0 00-.94.94c0 .52.42.93.94.93h28.05a.93.93 0 100-1.87m-2.8 3.75H31.13a.93.93 0 00-.93.93c0 .52.41.94.93.94h22.44c.52 0 .94-.42.94-.94a.93.93 0 00-.94-.93"
          clipRule="evenodd"
        />
        <Path
          fill="#f4b652"
          d="M64 0v36.8h-7.16a14.96 14.96 0 10-28.94 0H0V0z"
        />
        <Path
          fill="#ffef0d"
          fillRule="evenodd"
          d="M42.37 18.1A14.96 14.96 0 0027.9 36.8h6.16q-.29-1.1-.3-2.31c0-5.12 3.86-9.27 8.6-9.27 4.76 0 8.6 4.15 8.6 9.27q0 1.2-.28 2.32h6.16q.48-1.8.49-3.75c0-8.26-6.7-14.96-14.96-14.96"
          clipRule="evenodd"
        />
        <Path
          fill="#fffe72"
          fillRule="evenodd"
          d="M42.36 25.22c-4.74 0-8.6 4.16-8.6 9.28q.01 1.2.29 2.32h16.62q.27-1.12.28-2.32c0-5.12-3.85-9.28-8.6-9.28z"
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
