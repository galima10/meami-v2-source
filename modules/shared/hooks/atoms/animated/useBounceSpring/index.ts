import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

export const useBounceSpring = (
  scaleFactor = 1.01, // amplitude du 1er rebond
  durationFirst = 150, // durée du 1er rebond
  durationSecond = 150, // durée du 2ème rebond
  delay = 200, // pause entre chaque double rebond
) => {
  const scale = useSharedValue(1);
  const delayDuration = 3000;

  scale.value = withRepeat(
    withSequence(
      withTiming(scaleFactor, {
        duration: durationFirst,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      }), // 1er rebond
      withTiming(0.95, {
        duration: durationSecond,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      }), // 2ème rebond plus petit
      withTiming(1, {
        duration: durationSecond,
        easing: Easing.out(Easing.exp),
      }), // retour final
      withDelay(delay, withTiming(1, { duration: delayDuration })), // pause
    ),
    -1, // boucle infinie
    false,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return animatedStyle;
};
