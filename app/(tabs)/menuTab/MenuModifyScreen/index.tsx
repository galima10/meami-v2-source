import { FONT_BASE } from "@constants/general";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { getScreenWidth } from "@helpers/getScreenDimensions";
import DayNavigationDots from "@modules/menuTab/components/molecules/DayNavigationDots";
import DayCardCalendar from "@modules/menuTab/components/organisms/DayCardCalendar";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import { useMenuCalendarScreen } from "@modules/shared/hooks/screens/useMenuCalendarScreen";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";
import { ScrollView, StyleSheet, View } from "react-native";

export default function MenuModifyScreen() {
  const {
    weeklyMenuUi,
    selectedMoment,
    setSelectedMoment,
    goToSlideDay,
    todayIndex,
    setCurrentIndex,
    scrollRef,
    currentIndex,
    isOverlayOpen,
    handleCloseOverlay,
  } = useMenuCalendarScreen(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={scrollRef}
          directionalLockEnabled
          decelerationRate="fast"
          onMomentumScrollEnd={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x;
            const currentOffset = currentIndex * getScreenWidth();
            const diff = offsetX - currentOffset;

            const threshold = getScreenWidth() * 0.9;

            let newIndex = currentIndex;

            if (Math.abs(diff) > threshold) {
              newIndex = diff > 0 ? currentIndex + 1 : currentIndex - 1;
            }

            setCurrentIndex(newIndex !== todayIndex ? newIndex : todayIndex);
            setSelectedMoment("matin");

            scrollRef.current?.scrollTo({
              x: newIndex * getScreenWidth(),
              animated: true,
            });
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
                  modify
                />
              );
            },
          )}
        </ScrollView>
        <View style={styles.dotsContainer}>
          <DayNavigationDots
            days={Object.keys(weeklyMenuUi)}
            currentIndex={currentIndex}
            action={goToSlideDay}
            handleCloseOverlay={handleCloseOverlay}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: theme.properties.beige,
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
