import { getScreenWidth } from "@core/getScreenDimensions";
import { useAppSelector } from "@modules/shared/hooks/redux";
import { useDate } from "@modules/shared/hooks/useDate";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useDayMoment } from "../../../useDayMoment";
import { useMenuScreen } from "../useMenuScreen";

export function useMenuCalendarScreen(isModify: boolean = false) {
  const {
    currentIndex,
    setCurrentIndex,
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
