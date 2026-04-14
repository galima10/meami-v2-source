import Animated from "react-native-reanimated";
import type { PropsWithChildren } from "react";
import type { ViewProps, StyleProp, ViewStyle } from "react-native";

type AnimatedAppViewProps = PropsWithChildren<ViewProps> & {
  style?: StyleProp<ViewStyle> | object;
};

const AnimatedAppView =
  Animated.View as unknown as React.ComponentType<AnimatedAppViewProps>;

export default AnimatedAppView;
