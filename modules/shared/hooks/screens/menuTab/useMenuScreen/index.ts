import { useRef, useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { useDate } from "@modules/shared/hooks/useDate";
import { getScreenWidth } from "@core/getScreenDimensions";
import { useDayMoment } from "@modules/shared/hooks/useDayMoment";
import { useAppSelector } from "@modules/shared/hooks/redux";

export function useMenuScreen() {
  const { menuSchedule } = useAppSelector((state) => state.weeklyMenu);
  const { todayIndex, rawDateInfo, refreshDateInfo } = useDate();
  const [selectedMoment, setSelectedMoment] = useState<1 | 2 | 3>(1);
  const { actualDayMoment } = useDayMoment(rawDateInfo.hour);
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function goToSlideDay(index: number) {
    if (currentIndex === index) return;
    setCurrentIndex(index);

    scrollRef.current?.scrollTo({
      x: getScreenWidth() * index,
      animated: true,
    });

    if (index === todayIndex) setSelectedMoment(actualDayMoment);
    else setSelectedMoment(1);
  }

  function getActualMenu(index: number) {
    const actualMenuId = menuSchedule?.[index]?.[actualDayMoment];
    return actualMenuId
  }

  return {
    scrollRef,
    currentIndex,
    setCurrentIndex,
    goToSlideDay,
    selectedMoment,
    setSelectedMoment,
    refreshDateInfo,
    actualDayMoment,
    todayIndex,
    menuSchedule,
    getActualMenu
  };
}
