import { View, StyleSheet, ScrollView } from "react-native";
import theme from "@constants/themes";
import { typography } from "@constants/styles";
import DayCardCalendar from "@modules/menuTab/components/organisms/calendar/DayCardCalendar";
import { daysOrder } from "@constants/mappings/orders/daysOrder";
import { useMenuCalendarScreen } from "@modules/menuTab/hooks/screens/useMenuCalendarScreen";
import { getScreenWidth } from "@core/getScreenDimensions";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import { FONT_BASE } from "@constants/general";
import DayNavigationDots from "@modules/menuTab/components/molecules/DayNavigationDots";

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
    isOtherOverlayOpen,
    setIsOtherOverlayOpen,
    handleNavigateToDay,
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
          setIsOtherOverlayOpen(false);
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
              isOtherOverlayOpen={isOtherOverlayOpen}
              setIsOtherOverlayOpen={setIsOtherOverlayOpen}
            />
          );
        })}
      </ScrollView>
      <AppIconButton
        type="today"
        style={styles.todayButton}
        action={handleGoToday}
      />
      <View style={styles.dotsContainer}>
        <DayNavigationDots
          currentIndex={currentIndex}
          action={(index: number) => {
            handleNavigateToDay(index);
            setIsOtherOverlayOpen(false);
          }}
        />
      </View>
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
  dotsContainer: {
    position: "absolute",
    bottom: FONT_BASE,
    width: "100%",
    alignItems: "center",
  },
});
