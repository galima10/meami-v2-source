import { View, StyleSheet, ScrollView } from "react-native";
import theme from "@constants/themes";
import { typography } from "@constants/styles";
import DayCardCalendar from "@modules/menuTab/components/organisms/calendar/DayCardCalendar";
import { daysOrder } from "@constants/mappings/orders/daysOrder";
import { useMenuCalendarScreen } from "@modules/menuTab/hooks/screens/useMenuCalendarScreen";

export default function MenuCalendarScreen() {
  const { selectedMomentId, setSelectedMomentId } = useMenuCalendarScreen();
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {daysOrder.map((_, index) => {
          return <DayCardCalendar key={index} dayId={index} momentId={selectedMomentId} />;
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
