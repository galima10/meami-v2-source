import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";

export const useBounceSpring = (
  scaleFactor = 1.01,
  durationFirst = 150,
  durationSecond = 150,
  delay = 200,
) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(scaleFactor, {
          duration: durationFirst,
          easing: Easing.bezier(0.5, 0, 0.5, 1),
        }),
        withTiming(0.95, {
          duration: durationSecond,
          easing: Easing.bezier(0.5, 0, 0.5, 1),
        }),
        withTiming(1, {
          duration: durationSecond,
          easing: Easing.out(Easing.exp),
        }),
        withDelay(delay, withTiming(1, { duration: 3000 })),
      ),
      -1,
      false,
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
};
