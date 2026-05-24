import { useState } from "react";

export function useMenuCalendarScreen() {
  const [selectedMomentId, setSelectedMomentId] = useState<number>(1);
  return { selectedMomentId, setSelectedMomentId };
}
