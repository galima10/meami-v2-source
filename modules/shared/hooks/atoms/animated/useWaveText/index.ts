import { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";
import { useEffect } from "react";

export const useWaveText = (index:number, { amplitude = 10, speed = 2800 } = {}) => {
  const progress = useSharedValue(0);
  const waveLength = 5;

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: speed,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const offset = index / waveLength;
    return {
      transform: [
        {
          translateY: Math.sin(progress.value + offset) * amplitude,
        },
      ],
    };
  });

  return animatedStyle;
};
