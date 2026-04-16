import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import {
  fetchAllMenusThunk,
  fetchWeeklyMenuThunk,
} from "@stores/thunks/weeklyMenu";
import { weeklyMenuToUi } from "@utils/dataToUi/weeklyMenuToUi";
import { fetchIngredientsThunk } from "@stores/thunks/ingredients";
import { ScrollView } from "react-native";
import { useDate } from "@modules/shared/hooks/useDate";
import { useFocusEffect } from "expo-router";
import { useDayMoment } from "../../useDayMoment";
import { getScreenWidth } from "@helpers/getScreenDimensions";

export function useMenuCalendarScreen() {
  const { todayIndex, dayOfWeek, rawDateInfo } = useDate();
  const { actualDayMoment } = useDayMoment(rawDateInfo.hour);
  const dispatch = useAppDispatch();
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { moments, days } = useAppSelector((state) => state.seed);
  const weeklyMenuUi = useMemo(
    () => weeklyMenuToUi(weeklyMenu, days, moments),
    [weeklyMenu, days, moments],
  );
  const [selectedMoment, setSelectedMoment] = useState<
    "matin" | "midi" | "soir"
  >("matin");
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(
    todayIndex !== -1 ? todayIndex : 0,
  );
  useEffect(() => {
    async function fetchMenus() {
      await dispatch(fetchAllMenusThunk());
      await dispatch(fetchWeeklyMenuThunk());
    }
    if (Object.keys(weeklyMenu).length === 0) {
      fetchMenus();
    }
    if (Object.keys(ingredients).length === 0) {
      dispatch(fetchIngredientsThunk());
    }
  }, []);

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
      goToSlideDay(todayIndex);
    }, [
      scrollRef,
      setCurrentIndex,
      setSelectedMoment,
      dayOfWeek,
      actualDayMoment,
    ]),
  );

  function handleGoToday() {
    if (currentIndex !== todayIndex || selectedMoment !== actualDayMoment) {
      setCurrentIndex(todayIndex);
      setSelectedMoment(actualDayMoment);
      goToSlideDay(todayIndex);
    }
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
  };
}
