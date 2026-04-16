import { View, StyleSheet } from "react-native";
import { typography } from "@constants/styles";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";

interface DayCardListProps {
  day: string;
}

export default function DayCardList({ day }: DayCardListProps) {
  return (
    <View style={styles.container}>
      <AppText>{day}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
