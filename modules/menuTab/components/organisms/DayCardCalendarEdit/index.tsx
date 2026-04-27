import { FONT_BASE } from "@constants/general";
import { dayColors } from "@constants/mappings/colors/dayColors";
import { menuIconsMap } from "@constants/mappings/images/menuIconsMap";
import { enDays } from "@constants/mappings/traductors/daysTraductor";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import type { MomentUi } from "@mappers/dataToUi/weeklyMenuToUi";
import { useDayCardCalendar } from "@modules/menuTab/hooks/organisms/useDayCardCalendar";
import AppIconButton from "@modules/shared/components/atoms/buttons/AppIconButton";
import AppCheckBox from "@modules/shared/components/primitives/AppCheckBox";
import AppLinearGradient from "@modules/shared/components/primitives/AppLinearGradient";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { toCapitalize } from "@utils/toCapitalize";
import { getScreenWidth } from "@core/getScreenDimensions";
import React, { Dispatch, SetStateAction } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import MenuCalendarContent from "../../molecules/MenuCalendarContent";
import MenuCalendarOtherOverlay from "../../molecules/MenuCalendarOtherOverlay";
import MomentBand from "../../molecules/MomentBand";
import MenuModifyContent from "../../molecules/MenuModifyContent";
import type { MomentSchedule } from "@stores/features/weeklyMenu";
import type { PropsWithChildren } from "react";
import { getDayById } from "@helpers/getSeedById";
import type { MenuSchedule } from "@stores/features/weeklyMenu";

interface DayCardCalendarEditProps {
  dayId: number;
  setSelectedMoment: Dispatch<SetStateAction<1 | 2 | 3>>;
  selectedMoment: 1 | 2 | 3;
  actualDayMoment: 1 | 2 | 3;
  setActualElements: Dispatch<
    SetStateAction<{
      type: "recipes" | "ingredients" | null;
      categoryId?: number;
    }>
  >;
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedIngredient: Dispatch<
    SetStateAction<{
      ingredientId: number | null;
      menuId: number | null;
    }>
  >;
  setIsUnitsPanelOpen: Dispatch<SetStateAction<boolean>>;
  menuSchedule: MenuSchedule;
}

export default function DayCardCalendarEdit({
  dayId,
  setSelectedMoment,
  selectedMoment,
  actualDayMoment,
  setActualElements,
  setIsPanelOpen,
  setSelectedIngredient,
  setIsUnitsPanelOpen,
  menuSchedule
}: DayCardCalendarEditProps) {
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
          <MenuModifyContent
            actualDayMoment={actualDayMoment}
            dayId={dayId}
            setActualElements={setActualElements}
            selectedMoment={selectedMoment}
            setIsPanelOpen={setIsPanelOpen}
            setSelectedIngredient={setSelectedIngredient}
            setIsUnitsPanelOpen={setIsUnitsPanelOpen}
            menuSchedule={menuSchedule}
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
