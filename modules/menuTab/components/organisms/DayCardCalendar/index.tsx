import { View, StyleSheet } from "react-native";
import MomentBand from "../../molecules/MomentBand";
import MenuContainer from "../../molecules/MenuContainer";

export default function DayCardCalendar() {
  return (
    <View style={styles.container}>
      <MenuContainer />
      <MomentBand />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
  },
});
