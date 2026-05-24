import { getScreenWidth } from "@core/getScreenDimensions";
import { ScrollView } from "react-native";
import { useRef } from "react";

export function useDayNavigation(index: number) {
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  scrollRef.current?.scrollTo({
    x: getScreenWidth() * index,
    animated: true,
  });
}
