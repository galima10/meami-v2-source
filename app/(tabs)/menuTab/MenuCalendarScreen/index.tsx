import { View, StyleSheet, ScrollView } from "react-native";
import theme from "@constants/themes";
import { typography } from "@constants/styles";
import DayCardCalendar from "@modules/menuTab/components/organisms/calendar/DayCardCalendar";
import { DAYS } from "@constants/mappings/orders/daysOrder";

export default function MenuCalendarScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {DAYS.map((dayId) => {
          return <DayCardCalendar key={dayId} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
});
