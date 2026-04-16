import { View, StyleSheet } from "react-native";
import MomentBand from "../../molecules/MomentBand";
import MenuContainer from "../../molecules/MenuContainer";
import { getScreenWidth } from "@helpers/getScreenDimensions";
import { Dispatch, SetStateAction } from "react";

interface DayCardCalendarProps {
  moment: "matin" | "midi" | "soir";
  day: string;
  setSelectedMoment: Dispatch<SetStateAction<"matin" | "midi" | "soir">>;
  selectedMoment: "matin" | "midi" | "soir"
}

export default function DayCardCalendar({
  moment,
  day,
  setSelectedMoment,
  selectedMoment
}: DayCardCalendarProps) {
  return (
    <View style={styles.container}>
      <MenuContainer day={day} />
      <MomentBand moment={moment} day={day} setSelectedMoment={setSelectedMoment} selectedMoment={selectedMoment} />
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
