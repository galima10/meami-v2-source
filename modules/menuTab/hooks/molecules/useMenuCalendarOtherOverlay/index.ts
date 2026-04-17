import { FONT_BASE } from "@constants/general";
import { useAppSelector } from "@modules/shared/hooks/redux";
import { getFlexWidth } from "@utils/getFlexWidth";
import { getScreenWidth } from "@core/getScreenDimensions";
import { useEffect, useMemo } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function useMenuCalendarOtherOverlay(
  isOverlayOpen: boolean,
  handleCloseOverlay?: (bool: boolean) => void,
) {
  const { units } = useAppSelector((state) => state.unit);
  const { ingredients } = useAppSelector((state) => state.ingredient);
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

    handleCloseOverlay?.(!isOverlayOpen);
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
  return { toggleOverlay, animatedStyle, units, ingredients };
}
