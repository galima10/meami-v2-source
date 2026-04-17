import { FONT_BASE } from "@constants/general";
import { dayColors } from "@constants/mappings/colors/dayColors";
import { menuIconsMap } from "@constants/mappings/images/menuIconsMap";
import { enDays } from "@constants/mappings/traductors/daysTraductor";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { getScreenWidth } from "@helpers/getScreenDimensions";
import AppLinearGradient from "@modules/shared/components/primitives/AppLinearGradient";
import { AppText } from "@modules/shared/components/primitives/AppText";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";
import { toCapitalize } from "@utils/toCapitalize";
import React, { Dispatch, SetStateAction } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import MomentBand from "../../molecules/MomentBand";
import AppCheckBox from "@modules/shared/components/primitives/AppCheckBox";
import { useDayCardCalendar } from "@modules/menuTab/hooks/organisms/useDayCardCalendar";
import MenuCalendarOtherOverlay from "../../molecules/MenuCalendarOtherOverlay";
import MenuCalendarContent from "../../molecules/MenuCalendarContent";

interface DayCardCalendarProps {
  moment: "matin" | "midi" | "soir";
  day: string;
  setSelectedMoment: Dispatch<SetStateAction<"matin" | "midi" | "soir">>;
  selectedMoment: "matin" | "midi" | "soir";
  moments: MomentUi;
  isOverlayOpen: boolean;
  handleCloseOverlay?: (bool: boolean) => void;
  modify?: boolean;
}

export default function DayCardCalendar({
  moment,
  day,
  setSelectedMoment,
  selectedMoment,
  moments,
  isOverlayOpen,
  handleCloseOverlay,
  modify = false,
}: DayCardCalendarProps) {
  const { ingredients, menu, handleCheckMenu, checked, setChecked } =
    useDayCardCalendar(selectedMoment, moments);
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={menuIconsMap[`${enDays[day]}_icons`]}
        style={styles.menuContainer}
      >
        <AppLinearGradient
          colors={["transparent", dayColors[enDays[day]]]}
          locations={[0.5, 1]}
          style={styles.gradient as ViewStyle}
        >
          <View style={styles.titleContainer}>
            <AppText style={styles.dayTitle}>{toCapitalize(day)}</AppText>
            {!modify && (
              <AppCheckBox
                style={styles.checkbox}
                checked={checked}
                action={handleCheckMenu}
              />
            )}
          </View>
          <View style={[styles.menuContent, checked && { opacity: 0.25 }]}>
            {!modify ? (
              <MenuCalendarContent
                menu={menu}
                setChecked={setChecked}
                ingredients={ingredients}
              />
            ) : null}
          </View>
          {!modify && moment !== "matin" && (
            <MenuCalendarOtherOverlay
              isOverlayOpen={isOverlayOpen}
              handleCloseOverlay={handleCloseOverlay}
              othersIngredients={menu?.ingredients?.[8]}
              checked={checked}
            />
          )}
        </AppLinearGradient>
      </ImageBackground>
      <MomentBand
        moment={moment}
        day={day}
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
    paddingTop: FONT_BASE * 3.5,
    alignItems: "center",
    paddingHorizontal: FONT_BASE * 2.5,
    position: "relative",
  },
  checkbox: { paddingTop: FONT_BASE / 2 },
});
