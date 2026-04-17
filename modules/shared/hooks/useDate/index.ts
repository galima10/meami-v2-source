import { daysOrder } from "@constants/mappings/orders/daysOrder";
import { useFocusEffect } from "@react-navigation/native";
import { getDateInfo } from "@core/getDateInfo";
import { useCallback, useMemo, useState } from "react";

export function useDate() {
  const [dateInfo, setDateInfo] = useState(getDateInfo());

  useFocusEffect(
    useCallback(() => {
      setDateInfo(getDateInfo());
    }, []),
  );

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
