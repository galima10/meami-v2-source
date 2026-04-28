import { FONT_BASE } from "@constants/general";
import { dayColors } from "@constants/mappings/colors/dayColors";
import { menuIconsMap } from "@constants/mappings/images/menuIconsMap";
import { enDays } from "@constants/mappings/traductors/daysTraductor";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { getScreenWidth } from "@core/getScreenDimensions";
import { getDayById } from "@helpers/getSeedById";
import AppLinearGradient from "@modules/shared/components/primitives/AppLinearGradient";
import type { MenuSchedule } from "@stores/features/weeklyMenu";
import React, { Dispatch, SetStateAction } from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";
import MenuCalendarContent from "../../molecules/MenuCalendarContent";
import MomentBand from "../../molecules/MomentBand";

interface DayCardCalendarReadProps {
  dayId: number;
  setSelectedMoment: Dispatch<SetStateAction<1 | 2 | 3>>;
  selectedMoment: 1 | 2 | 3;
  handleCloseOverlay: () => void;
  isOverlayOpen: boolean;
  actualDayMoment: 1 | 2 | 3;
  menuSchedule: MenuSchedule;
}

export default function DayCardCalendarRead({
  dayId,
  setSelectedMoment,
  selectedMoment,
  actualDayMoment,
  handleCloseOverlay,
  isOverlayOpen,
  menuSchedule,
}: DayCardCalendarReadProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={
          menuIconsMap[`${enDays[getDayById(dayId).name.toLowerCase()]}_icons`]
        }
        style={styles.menuContainer}
      >
        <AppLinearGradient
          colors={[
            "transparent",
            dayColors[enDays[getDayById(dayId).name.toLowerCase()]],
          ]}
          locations={[0.5, 1]}
          style={styles.gradient as ViewStyle}
        >
          <MenuCalendarContent
            menuSchedule={menuSchedule}
            selectedMoment={selectedMoment}
            actualDayMoment={actualDayMoment}
            dayId={dayId}
            handleCloseOverlay={handleCloseOverlay}
            isOverlayOpen={isOverlayOpen}
          />
        </AppLinearGradient>
      </ImageBackground>
      <MomentBand
        dayId={dayId}
        setSelectedMoment={setSelectedMoment}
        selectedMoment={selectedMoment}
      />
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
  gradient: {
    flex: 1,
  },
  dayTitle: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
  titleContainer: {
    flexDirection: "row",
    gap: FONT_BASE,
    borderBottomWidth: 1,
    borderColor: theme.properties.brown,
    padding: FONT_BASE,
    width: "100%",
    alignItems: "center",
  },
  menuContent: {
    alignItems: "center",
    paddingTop: FONT_BASE * 2,
    paddingHorizontal: FONT_BASE * 2.5,
  },
  checkbox: { paddingTop: FONT_BASE / 2 },
});
