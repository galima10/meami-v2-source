import Animated from "react-native-reanimated";
import type { PropsWithChildren } from "react";
import type { ViewProps, StyleProp, ViewStyle } from "react-native";
import type { AppViewStyleType } from "@utils/appElements/AppViewStyleType";

type AnimatedAppViewProps = PropsWithChildren<ViewProps> & {
  style?: AppViewStyleType;
};

const AnimatedAppView =
  Animated.View as unknown as React.ComponentType<AnimatedAppViewProps>;

export default AnimatedAppView;
