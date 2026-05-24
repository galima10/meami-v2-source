import { useState } from "react";

export function useMenuCalendarScreen() {
  const [selectedMoment, setSelectedMoment] = useState<number>(1);
  return { selectedMoment, setSelectedMoment };
}
