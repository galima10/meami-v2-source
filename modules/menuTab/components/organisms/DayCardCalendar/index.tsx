import { View, StyleSheet } from "react-native";
import MomentBand from "../../molecules/MomentBand";
import MenuContainer from "../../molecules/MenuContainer";

interface DayCardCalendarProps {
  moment: string;
  day: string;
}

export default function DayCardCalendar({ moment, day }: DayCardCalendarProps) {
  return (
    <View style={styles.container}>
      <MenuContainer day={day} />
      <MomentBand moment={moment} day={day} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
  },
});
