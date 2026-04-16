import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { StyleSheet, View, ScrollView } from "react-native";
import DayCardCalendar from "@modules/menuTab/components/organisms/DayCardCalendar";
import { FocusGate } from "@modules/shared/components/screens/FocusGate";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";
import { useMenuCalendarScreen } from "@modules/shared/hooks/screens/useMenuCalendarScreen";

export default function MenuCalendarScreen() {
  const { weeklyMenuUi, selectedMoment, setSelectedMoment } =
    useMenuCalendarScreen();

  return (
    <FocusGate>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        >
          {(Object.entries(weeklyMenuUi) as [string, MomentUi][]).map(
            ([day, moments]) => {
              return (
                <DayCardCalendar
                  key={day}
                  moment={selectedMoment}
                  day={day.toLowerCase()}
                  setSelectedMoment={setSelectedMoment}
                  selectedMoment={selectedMoment}
                  moments={moments}
                />
              );
            },
          )}
        </ScrollView>
      </View>
    </FocusGate>
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
