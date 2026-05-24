import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useMenuScreen } from "../../../../../../../modules/shared/hooks/screens/menuTab/useMenuScreen";

export function useMenuCalendarScreen(isModify: boolean = false) {
  const {
    currentIndex,
    setCurrentIndex,../useMenuScreen
    scrollRef,
    goToSlideDay,
    actualDayMoment,
    todayIndex,
    refreshDateInfo,
    selectedMoment,
    setSelectedMoment,
    menuSchedule,
    getActualMenu,
  } = useMenuScreen();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!isModify) {
        if (todayIndex === -1) return;
        goToSlideDay(todayIndex);
      }
    }, [todayIndex]),
  );

  function handleGoToday() {
    setIsOverlayOpen(false);
    refreshDateInfo();
    if (currentIndex !== todayIndex || selectedMoment !== actualDayMoment) {
      setCurrentIndex(todayIndex);
      setSelectedMoment(actualDayMoment);
      goToSlideDay(todayIndex);
    }
  }

  function handleCloseOverlay(bool: boolean = false) {
    setIsOverlayOpen(bool);
  }

  return {
    menuSchedule,
    selectedMoment,
    setSelectedMoment,
    todayIndex,
    actualDayMoment,
    goToSlideDay,
    handleGoToday,
    isOverlayOpen,
    handleCloseOverlay,
    getActualMenu,
    currentIndex,
    setCurrentIndex,
    scrollRef,
  };
}
