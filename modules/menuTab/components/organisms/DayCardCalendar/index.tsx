import { View, StyleSheet } from "react-native";
import MomentBand from "../../molecules/MomentBand";
import MenuContainer from "../../molecules/MenuContainer";
import { getScreenWidth } from "@helpers/getScreenDimensions";

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
    width: getScreenWidth(),
    flex: 1,
    flexDirection: "row-reverse",
  },
});
