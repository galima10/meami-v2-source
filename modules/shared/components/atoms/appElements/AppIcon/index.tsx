import { useAppIcon, IconName } from "@modules/shared/hooks/atoms/appElements/useAppIcon";
import React from "react";
import { SvgProps } from "react-native-svg";
import theme from "@constants/themes";

interface AppIconProps extends SvgProps {
  name: IconName;
  size?: number;
  color?: string;
  withStroke?: boolean;
}
export default function AppIcon({
  name,
  size = 40,
  color = theme.properties.brown,
  ...props
}: AppIconProps) {
  const SvgComponent = useAppIcon(name);

  if (!SvgComponent) return;

  return <SvgComponent width={size} height={size} color={color} {...props} />;
}
