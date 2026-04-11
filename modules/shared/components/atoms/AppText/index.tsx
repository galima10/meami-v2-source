import React from "react";
import { Text, TextProps } from "react-native";
import Animated from "react-native-reanimated";
import theme from "@constants/themes";

const defaultStyle = {
  fontFamily: theme.properties.fontFamily,
  color: theme.properties.brown,
};

type Props = Omit<TextProps, "style"> & {
  style?: TextProps["style"] | object;
  children?: React.ReactNode;
};

export const AppText = ({ style, ...props }: Props) => (
  <Text
    {...props}
    style={[defaultStyle, style] as any}
  />
);

export const AnimatedAppText = ({ style, ...props }: Props) => (
  <Animated.Text
    {...props}
    style={[defaultStyle, style] as any}
  />
);