import { View, StyleSheet } from "react-native";
import { getScreenWidth } from "@core/getScreenDimensions";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";

export default function DayCardCalendar() {
  return <View style={styles.container}>
    <AppText>Test</AppText>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    width: getScreenWidth(),
    flex: 1,
    flexDirection: "row-reverse",
    overflow: "hidden",
    backgroundColor: theme.properties.beige
  },
});
