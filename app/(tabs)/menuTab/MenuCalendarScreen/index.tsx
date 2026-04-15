import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { StyleSheet, View } from "react-native";
import DayCardCalendar from "@modules/menuTab/components/organisms/DayCardCalendar";

export default function MenuCalendarScreen() {
  return (
    <View style={styles.container}>
      <DayCardCalendar moment="soir" day="dimanche" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
});
