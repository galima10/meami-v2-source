import { getFlexWidth } from "@helpers/getFlexWidth";
import { getScreenWidth } from "@helpers/getScreenDimensions";
import { FONT_BASE } from "@constants/general";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useMemo, useEffect } from "react";

export function useMenuCalendarOtherOverlay(
  handleCloseOverlay: (bool: boolean) => void,
  isOverlayOpen: boolean,
) {
  const SCREEN_WIDTH = useMemo(() => getScreenWidth(), []);
  const overlayWidth = useMemo(
    () => getFlexWidth(SCREEN_WIDTH, 3.5, 1 + 3.5),
    [SCREEN_WIDTH],
  );

  const hiddenX = useMemo(() => overlayWidth - FONT_BASE * 2, [overlayWidth]);

  const translateX = useSharedValue(hiddenX);
  function toggleOverlay() {
    const toValue = isOverlayOpen ? hiddenX : 0;

    translateX.value = withTiming(toValue, {
      duration: 250,
    });

    handleCloseOverlay(!isOverlayOpen);
  }

  useEffect(() => {
    if (!isOverlayOpen && translateX.value === 0) {
      translateX.value = withTiming(hiddenX, {
        duration: 250,
      });
    }
  }, [isOverlayOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return { toggleOverlay, animatedStyle };
}
