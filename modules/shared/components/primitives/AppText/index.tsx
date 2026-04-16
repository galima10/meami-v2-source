import React from "react";
import { Text, TextProps } from "react-native";
import Animated from "react-native-reanimated";
import theme from "@constants/themes";
import type { AppTextStyleType } from "@utils/appElements/AppTextStyleType";
import { typography } from "@constants/styles";

const defaultStyle = {
  fontFamily: theme.properties.fontFamily,
  color: theme.properties.brown,
  fontSize: typography.body,
};

type Props = Omit<TextProps, "style"> & {
  style?: AppTextStyleType;
  children?: React.ReactNode;
};

export const AppText = ({ style, ...props }: Props) => (
  <Text {...props} style={[defaultStyle, style]} />
);

export const AnimatedAppText = ({ style, ...props }: Props) => (
  <Animated.Text {...props} style={[defaultStyle, style]} />
);
