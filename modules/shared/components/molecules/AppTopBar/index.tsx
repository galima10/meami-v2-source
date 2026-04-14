import { View, StyleSheet } from "react-native";
import theme from "@constants/themes";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FONT_BASE } from "@constants/general";

interface AppTopBarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function AppTopBar({
  left,
  right,
}: AppTopBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, height: FONT_BASE * 4.5 + insets.top },
      ]}
    >
      <View style={styles.right}>{right}</View>
      <View style={styles.left}>{left}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.properties.darkOrange,
    borderColor: theme.properties.orangeBorder,
    borderBottomWidth: 1,
    boxShadow: theme.properties.bigShadow,
    flexDirection: "row-reverse",
    paddingHorizontal: FONT_BASE,
  },
  left: {
    flexDirection: "row",
    gap: FONT_BASE * 0.75,
    alignItems: "center",
    width: FONT_BASE * 11.25,
  },
  right: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: FONT_BASE * 0.75,
    alignItems: "center",
  },
});
