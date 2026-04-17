import type { TextStyle, StyleProp } from "react-native";
import type { AnimatedStyleProp } from "react-native-reanimated";

export type AppTextStyleType =
  | StyleProp<TextStyle>
  | AnimatedStyleProp<TextStyle>;