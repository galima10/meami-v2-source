import { FONT_BASE } from "@constants/general";
import { DAYS } from "@constants/mappings/orders/daysOrder";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { getScreenWidth } from "@core/getScreenDimensions";
import DayNavigationDots from "@modules/menuTab/components/molecules/DayNavigationDots";
import MenuCalendarContent from "@modules/menuTab/components/molecules/MenuCalendarContent";
import DayCardCalendarRead from "@modules/menuTab/components/organisms/DayCardCalendarRead";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import { useMenuCalendarScreen } from "@modules/shared/hooks/screens/menuTab/useMenuCalendarScreen";
import { ScrollView, StyleSheet, View } from "react-native";

export default function MenuCalendarScreen() {
  const {
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
    menuSchedule,
    getActualMenu,
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
          if (newIndex === currentIndex) return;
          setCurrentIndex(newIndex !== todayIndex ? newIndex : todayIndex);
          handleCloseOverlay();
          if (newIndex === todayIndex) setSelectedMoment(actualDayMoment);
          else setSelectedMoment(1);
        }}
      >
        {DAYS.map((dayId) => {
          return (
            <DayCardCalendarRead
              key={dayId}
              dayId={dayId}
              setSelectedMoment={setSelectedMoment}
              selectedMoment={selectedMoment}
              actualDayMoment={actualDayMoment}
              handleCloseOverlay={handleCloseOverlay}
              isOverlayOpen={isOverlayOpen}
              menuSchedule={menuSchedule}
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
          action={goToSlideDay}
          handleCloseOverlay={handleCloseOverlay}
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
