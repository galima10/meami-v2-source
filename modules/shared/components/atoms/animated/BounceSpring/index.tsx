import React, { PropsWithChildren } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import type { StyleProp } from "react-native";
import { useBounceSpring } from "@modules/shared/hooks/atoms/animated/useBounceSpring";
import AnimatedAppView from "../../../primitives/AnimatedAppView";

type Props = PropsWithChildren<{}>;

export default function BounceSpring({ children }: Props) {
  const animatedStyle = useBounceSpring() as StyleProp<ViewStyle>;

  return (
    <AnimatedAppView style={[styles.container, animatedStyle]}>
      {children}
    </AnimatedAppView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden" as const,
  },
});
