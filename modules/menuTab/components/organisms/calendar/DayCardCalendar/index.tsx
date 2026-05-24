import {
  View,
  StyleSheet,
  ImageBackground,
  type ViewStyle,
} from "react-native";
import { getScreenWidth } from "@core/getScreenDimensions";
import { AppText } from "@modules/shared/components/primitives/AppText";
import AppLinearGradient from "@modules/shared/components/primitives/AppLinearGradient";
import { menuIconsMap } from "@constants/mappings/images/menuIconsMap";
import { dayColors } from "@constants/mappings/colors/dayColors";
import MomentBand from "@modules/menuTab/components/molecules/MomentBand";
import theme from "@constants/themes";
import { enDays } from "@constants/mappings/traductors/daysTraductor";
import MenuCalendarContent from "@modules/menuTab/components/molecules/calendar/MenuCalendarContent";
import { daysOrder } from "@constants/mappings/orders/daysOrder";

interface DayCardCalendarProps {
  dayId: number;
  momentId: number;
  handleSelectMomentId: (id: number) => void;
}

export default function DayCardCalendar({
  dayId,
  momentId,
  handleSelectMomentId,
}: DayCardCalendarProps) {
  const enDayName = enDays[daysOrder[dayId]];
  const backgroundIcons = menuIconsMap[`${enDayName}_icons`];
  const backgroundColor = dayColors[enDayName];
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={backgroundIcons}
        style={styles.menuContainer}
      >
        <AppLinearGradient
          colors={["transparent", backgroundColor]}
          locations={[0.5, 1]}
          style={{ flex: 1 } as ViewStyle}
        >
          <MenuCalendarContent dayId={dayId} momentId={momentId} />
        </AppLinearGradient>
      </ImageBackground>
      <MomentBand momentId={momentId} dayName={enDayName} handleSelectMomentId={handleSelectMomentId} />
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
