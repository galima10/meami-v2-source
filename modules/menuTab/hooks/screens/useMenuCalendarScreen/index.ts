import { useState, useRef } from "react";
import { useDayMoment } from "@modules/shared/hooks/useDayMoment";
import { useDate } from "@modules/shared/hooks/useDate";
import { ScrollView } from "react-native";
import { getScreenWidth } from "@core/getScreenDimensions";

export function useMenuCalendarScreen() {
  const [selectedMomentId, setSelectedMomentId] = useState<number>(0);
  const { todayIndex, rawDateInfo, refreshDateInfo } = useDate();
  const { actualDayMoment } = useDayMoment(rawDateInfo.hour);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [isOtherOverlayOpen, setIsOtherOverlayOpen] = useState(false);

  function handleSelectMomentId(id: number) {
    setSelectedMomentId(id);
  }

  function navigateToDay(index: number) {
    scrollRef.current?.scrollTo({
      x: getScreenWidth() * index,
      animated: true,
    });
  }

  function handleGoToday() {
    if (currentIndex === todayIndex || selectedMomentId === actualDayMoment - 1)
      return;
    refreshDateInfo();
    setCurrentIndex(todayIndex);
    setSelectedMomentId(actualDayMoment - 1);
    navigateToDay(todayIndex);
  }

  function handleNavigateToDay(index: number) {
    if (currentIndex === index) return;
    setCurrentIndex(index);
    if (index === todayIndex)
      setSelectedMomentId(actualDayMoment - 1);
    else setSelectedMomentId(0);
    navigateToDay(index);
  }

  return {
    selectedMomentId,
    handleSelectMomentId,
    scrollRef,
    todayIndex,
    refreshDateInfo,
    actualDayMoment,
    currentIndex,
    setCurrentIndex,
    handleGoToday,
    isOtherOverlayOpen,
    setIsOtherOverlayOpen,
    handleNavigateToDay,
  };
}
