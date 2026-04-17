import { useState, useMemo, useRef, useCallback } from "react";
import { useAppSelector } from "@modules/shared/hooks/redux";
import { weeklyMenuToUi } from "@utils/dataToUi/weeklyMenuToUi";
import { ScrollView } from "react-native";
import { useDate } from "@modules/shared/hooks/useDate";
import { useFocusEffect } from "expo-router";
import { useDayMoment } from "../../useDayMoment";
import { getScreenWidth } from "@helpers/getScreenDimensions";

export function useMenuCalendarScreen() {
  const { todayIndex, dayOfWeek, rawDateInfo, refreshDateInfo } = useDate();
  const { actualDayMoment } = useDayMoment(rawDateInfo.hour);
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { moments, days } = useAppSelector((state) => state.seed);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const weeklyMenuUi = useMemo(
    () => weeklyMenuToUi(weeklyMenu, days, moments),
    [weeklyMenu, days, moments],
  );
  const [selectedMoment, setSelectedMoment] = useState<
    "matin" | "midi" | "soir"
  >("matin");
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function goToSlideDay(index: number) {
    setCurrentIndex(index);

    scrollRef.current?.scrollTo({
      x: getScreenWidth() * index,
      animated: true,
    });

    setSelectedMoment(actualDayMoment);
  }

  useFocusEffect(
    useCallback(() => {
      if (todayIndex === -1) return;
      goToSlideDay(todayIndex);
    }, [
      scrollRef,
      setCurrentIndex,
      setSelectedMoment,
      dayOfWeek,
      actualDayMoment,
      todayIndex,
    ]),
  );

  function handleGoToday() {
    refreshDateInfo();
    setIsOverlayOpen(false);
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
    weeklyMenuUi,
    selectedMoment,
    setSelectedMoment,
    scrollRef,
    currentIndex,
    setCurrentIndex,
    todayIndex,
    actualDayMoment,
    goToSlideDay,
    handleGoToday,
    isOverlayOpen,
    handleCloseOverlay,
  };
}
