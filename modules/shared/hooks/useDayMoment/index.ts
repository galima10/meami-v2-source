import { getDayMoment } from "@utils/getDateInfo";
import { useDate } from "../useDate";

export function useDayMoment(hour?: number) {
  const { hour: dateHour } = useDate();

  const currentHour = hour ?? dateHour;
  const actualDayMoment = getDayMoment(currentHour);
  return { actualDayMoment };
}
