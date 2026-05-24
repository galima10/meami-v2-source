import { View, Pressable, StyleSheet } from "react-native";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import { Dispatch, SetStateAction } from "react";
import { daysOrder } from "@constants/mappings/orders/daysOrder";

interface DayNavigationDotsProps {
  currentIndex: number;
  action: (index: number) => void;
}

export default function DayNavigationDots({
  currentIndex,
  action,
}: DayNavigationDotsProps) {
  return (
    <View style={styles.container}>
      {daysOrder.map((_, dayId) => (
        <Pressable
          style={[styles.dotButton]}
          key={dayId}
          onPress={() => action(dayId)}
        >
          <View style={[styles.dot, currentIndex === dayId && styles.active]} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  dotButton: {
    width: FONT_BASE * 2.1,
    height: FONT_BASE * 2.1,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: FONT_BASE * 0.75,
    height: FONT_BASE * 0.75,
    backgroundColor: theme.properties.brown,
    opacity: 0.25,
    borderRadius: "50%",
  },
  active: {
    opacity: 1,
  },
});
