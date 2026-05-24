import { View, StyleSheet, ScrollView } from "react-native";
import theme from "@constants/themes";
import { typography } from "@constants/styles";
import DayCardCalendar from "@modules/menuTab/components/organisms/calendar/DayCardCalendar";
import { daysOrder } from "@constants/mappings/orders/daysOrder";
import { useMenuCalendarScreen } from "@modules/menuTab/hooks/screens/useMenuCalendarScreen";
import { getScreenWidth } from "@core/getScreenDimensions";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import { FONT_BASE } from "@constants/general";

export default function MenuCalendarScreen() {
  const {
    selectedMomentId,
    handleSelectMomentId,
    currentIndex,
    setCurrentIndex,
    todayIndex,
    actualDayMoment,
    handleGoToday,
    scrollRef,
  } = useMenuCalendarScreen();
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const newIndex = Math.round(offsetX / getScreenWidth());
          if (newIndex === currentIndex) return;
          setCurrentIndex(newIndex !== todayIndex ? newIndex : todayIndex);
          // handleCloseOverlay();
          if (newIndex === todayIndex)
            handleSelectMomentId(actualDayMoment - 1);
          else handleSelectMomentId(0);
        }}
      >
        {daysOrder.map((_, index) => {
          return (
            <DayCardCalendar
              key={index}
              dayId={index}
              momentId={selectedMomentId}
              handleSelectMomentId={handleSelectMomentId}
            />
          );
        })}
      </ScrollView>
      <AppIconButton
        type="today"
        style={styles.todayButton}
        action={handleGoToday}
      />
      {/* <View style={styles.dotsContainer}>
        <DayNavigationDots
          currentIndex={currentIndex}
          action={goToSlideDay}
          handleCloseOverlay={handleCloseOverlay}
        />
      </View> */}
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
  todayButton: {
    position: "absolute",
    bottom: FONT_BASE * 3,
    left: FONT_BASE * 1.15,
  },
});
