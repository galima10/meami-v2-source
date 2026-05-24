import { useState } from "react";

export function useMenuCalendarScreen() {
  const [selectedMomentId, setSelectedMomentId] = useState<number>(0);
  function handleSelectMomentId(id: number) {
    setSelectedMomentId(id);
  }
  return { selectedMomentId, handleSelectMomentId };
}
