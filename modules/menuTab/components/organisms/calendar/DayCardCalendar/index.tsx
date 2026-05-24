import { View, StyleSheet, ImageBackground } from "react-native";
import { getScreenWidth } from "@core/getScreenDimensions";
import { AppText } from "@modules/shared/components/primitives/AppText";
import AppLinearGradient from "@modules/shared/components/primitives/AppLinearGradient";
import { menuIconsMap } from "@constants/mappings/images/menuIconsMap";
import { dayColors } from "@constants/mappings/colors/dayColors";
import MomentBand from "@modules/menuTab/components/molecules/MomentBand";
import theme from "@constants/themes";

interface DayCardCalendarProps {
  dayId: number;
  dayName: string
}

export default function DayCardCalendar({ dayId, dayName }: DayCardCalendarProps) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.menuContainer}>
        {/* <AppLinearGradient></AppLinearGradient> */}
        <AppText>{dayName}</AppText>
      </ImageBackground>
      <MomentBand />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: getScreenWidth(),
    flex: 1,
    flexDirection: "row-reverse",
    overflow: "hidden",
  },
  menuContainer: {
    flex: 3.5,
    backgroundColor: theme.properties.beige,
  },
});
