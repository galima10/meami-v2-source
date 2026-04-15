import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";

interface Props {
  colors: readonly [string, string, ...string[]];
  locations?: readonly [number, number, ...number[]];
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export default function AppLinearGradient(props: Props) {
  return <LinearGradient {...props} />;
}
