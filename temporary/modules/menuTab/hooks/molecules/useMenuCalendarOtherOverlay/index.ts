import { FONT_BASE } from "@constants/general";
import { useAppSelector } from "@modules/shared/hooks/redux";
import { getFlexWidth } from "@utils/getFlexWidth";
import { getScreenWidth } from "@core/getScreenDimensions";
import { useMemo } from "react";
import {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

export function useMenuCalendarOtherOverlay(isOverlayOpen: boolean) {
  const { units } = useAppSelector((state) => state.unit);
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const SCREEN_WIDTH = useMemo(() => getScreenWidth(), []);
  const overlayWidth = useMemo(
    () => getFlexWidth(SCREEN_WIDTH, 3.5, 1 + 3.5),
    [SCREEN_WIDTH],
  );

  const hiddenX = useMemo(() => overlayWidth - FONT_BASE * 2, [overlayWidth]);

  const translateX = useDerivedValue(() => {
    return withTiming(isOverlayOpen ? 0 : hiddenX, {
      duration: 250,
    });
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return { animatedStyle, units, ingredients };
}
