import { View, StyleSheet } from "react-native";
import theme from "@constants/themes";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FONT_BASE } from "@constants/general";

export default function AppTopBar({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, height: FONT_BASE * 4.5 + insets.top },
      ]}
    ></View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.properties.darkOrange,
    borderColor: theme.properties.orangeBorder,
    borderBottomWidth: 1,
    boxShadow: theme.properties.bigShadow,
  },
});
