import { weeklyMenuToUi } from "@mappers/dataToUi/weeklyMenuToUi";
import { useAppSelector } from "@modules/shared/hooks/redux";
import { useDate } from "@modules/shared/hooks/useDate";
import { getScreenWidth } from "@core/getScreenDimensions";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useDayMoment } from "../../useDayMoment";

export function useMenuCalendarScreen(getDate: boolean = true) {
  const { todayIndex, rawDateInfo, refreshDateInfo } = useDate();
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

    if (getDate) setSelectedMoment(actualDayMoment);
  }

  useFocusEffect(
    useCallback(() => {
      if (getDate) {
        if (todayIndex === -1) return;
        goToSlideDay(todayIndex);
        return () => {
          setIsOverlayOpen(false);
        };
      }
    }, [todayIndex]),
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
