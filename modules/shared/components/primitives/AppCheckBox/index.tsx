import {
  Pressable,
  View,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";

interface AppCheckBoxProps {
  checked?: boolean;
  action?: () => void;
  style?: StyleProp<ViewStyle> | object;
}

export default function AppCheckBox({
  checked,
  action,
  style,
}: AppCheckBoxProps) {
  return (
    <Pressable onPress={() => action?.()} style={[styles.container, style]}>
      <View style={styles.box}>{checked && <View style={styles.dot} />}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: FONT_BASE * 2.5,
    height: FONT_BASE * 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: FONT_BASE * 1.125,
    height: FONT_BASE * 1.125,
    backgroundColor: theme.properties.white,
    borderRadius: FONT_BASE * 0.375,
    borderWidth: 0.5,
    borderColor: theme.properties.whiteBorder,
    boxShadow: theme.properties.littleShadow,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: FONT_BASE * 0.75,
    height: FONT_BASE * 0.75,
    backgroundColor: theme.properties.darkRed,
    borderRadius: FONT_BASE * 0.25,
  },
});
