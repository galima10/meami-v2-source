import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { StyleSheet, View, ScrollView } from "react-native";
import DayCardCalendar from "@modules/menuTab/components/organisms/DayCardCalendar";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";
import { useMenuCalendarScreen } from "@modules/shared/hooks/screens/useMenuCalendarScreen";
import { getScreenWidth } from "@helpers/getScreenDimensions";

export default function MenuCalendarScreen() {
  const {
    weeklyMenuUi,
    selectedMoment,
    setSelectedMoment,
    goToSlideDay,
    todayIndex,
    setCurrentIndex,
    scrollRef,
    actualDayMoment,
  } = useMenuCalendarScreen();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={scrollRef}
        onMomentumScrollEnd={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / getScreenWidth());
          setCurrentIndex(newIndex);
          if (newIndex === todayIndex) setSelectedMoment(actualDayMoment);
          else setSelectedMoment("matin");
        }}
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
