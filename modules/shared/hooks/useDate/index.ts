import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getDateInfo } from "@utils/getDateInfo";
import { daysOrder } from "@constants/mappings/orders/daysOrder";

export function useDate() {
  const [dateInfo, setDateInfo] = useState(getDateInfo());

  useFocusEffect(
    useCallback(() => {
      setDateInfo(getDateInfo());
    }, []),
  );
  useEffect(() => {
    console.log(dateInfo);
  }, [dateInfo]);

  const todayIndex = useMemo(() => {
    return daysOrder.findIndex((day) => day === dateInfo.dayOfWeek);
  }, [dateInfo.dayOfWeek, daysOrder]);

  const refreshDateInfo = useCallback(() => {
    setDateInfo(getDateInfo());
  }, []);

  return {
    ...dateInfo,
    todayIndex,
    refreshDateInfo,
    rawDateInfo: dateInfo,
  };
}
