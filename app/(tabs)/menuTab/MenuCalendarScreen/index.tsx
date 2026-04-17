import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { StyleSheet, View, ScrollView } from "react-native";
import DayCardCalendar from "@modules/menuTab/components/organisms/DayCardCalendar";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";
import { useMenuCalendarScreen } from "@modules/shared/hooks/screens/useMenuCalendarScreen";
import { getScreenWidth } from "@helpers/getScreenDimensions";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import { FONT_BASE } from "@constants/general";
import DayNavigationDots from "@modules/menuTab/components/molecules/MomentBand/DayNavigationDots";

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
    handleGoToday,
    currentIndex,
    isOverlayOpen,
    handleCloseOverlay,
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
          handleCloseOverlay();
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
                isOverlayOpen={isOverlayOpen}
                handleCloseOverlay={handleCloseOverlay}
              />
            );
          },
        )}
      </ScrollView>
      <AppIconButton
        type="today"
        style={styles.todayButton}
        action={handleGoToday}
      />
      <View style={styles.dotsContainer}>
        <DayNavigationDots
          days={Object.keys(weeklyMenuUi)}
          currentIndex={currentIndex}
          action={goToSlideDay}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  text: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
  todayButton: {
    position: "absolute",
    bottom: FONT_BASE * 3,
    left: FONT_BASE * 1.15,
  },
  dotsContainer: {
    position: "absolute",
    bottom: FONT_BASE,
    width: "100%",
    alignItems: "center",
  },
});
