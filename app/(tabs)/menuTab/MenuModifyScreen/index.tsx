import { FONT_BASE } from "@constants/general";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import type { MomentUi } from "@mappers/dataToUi/weeklyMenuToUi";
import DayNavigationDots from "@modules/menuTab/components/molecules/DayNavigationDots";
import DayCardCalendar from "@modules/menuTab/components/organisms/DayCardCalendar";
import { useMenuCalendarScreen } from "@modules/shared/hooks/screens/useMenuCalendarScreen";
import { getScreenWidth } from "@core/getScreenDimensions";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
import ListContainerOverlay from "@modules/shared/components/organims/ListContainerOverlay";
import { useAppSelector } from "@modules/shared/hooks/redux";

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
    ingredients,
  } = useMenuCalendarScreen(true);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  return (
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

          if (newIndex === currentIndex) return;

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
                openPanel={() => setIsPanelOpen(true)}
                ingredients={ingredients}
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
      <ListContainerOverlay
        visible={isPanelOpen}
        closeAction={() => setIsPanelOpen(false)}
      />
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
