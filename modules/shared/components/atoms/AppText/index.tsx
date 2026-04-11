import { Text, TextProps } from "react-native";
import Animated from "react-native-reanimated";
import theme from "@constants/themes";

const defaultStyle = {
  fontFamily: theme.properties.fontFamily,
  color: theme.properties.brown,
};

export const AppText = (props: TextProps) => (
  <Text {...props} style={[defaultStyle, props.style as any]} />
);

export const AnimatedAppText = (props: TextProps) => (
  <Animated.Text style={[defaultStyle, props.style as any]} {...props} />
);
