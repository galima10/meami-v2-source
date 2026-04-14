import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export const useWaveText = (
  index: number,
  { amplitude = 10, speed = 2800 } = {},
) => {
  const progress = useSharedValue(0);
  const waveLength = 5;

  // 👉 direct assignment (important)
  progress.value = withRepeat(
    withTiming(2 * Math.PI, {
      duration: speed,
      easing: Easing.linear,
    }),
    -1,
    false,
  );

  return useAnimatedStyle(() => {
    const offset = index / waveLength;

    return {
      transform: [
        {
          translateY: Math.sin(progress.value + offset) * amplitude,
        },
      ],
    };
  });
};
