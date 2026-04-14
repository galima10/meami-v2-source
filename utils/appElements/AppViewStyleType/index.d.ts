import type { ViewStyle, StyleProp } from "react-native";
import type { AnimatedStyleProp } from "react-native-reanimated";

export type AppViewStyleType =
  | StyleProp<ViewStyle>
  | AnimatedStyleProp<ViewStyle>;