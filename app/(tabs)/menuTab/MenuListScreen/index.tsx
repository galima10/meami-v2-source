import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import DayCardList from "@modules/menuTab/components/atoms/DayCardList";
import { FONT_BASE } from "@constants/general";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";
import { useMenuListScreen } from "@modules/shared/hooks/screens/useMenuListScreen";

export default function MenuListScreen() {
  const { weeklyMenuUi, today } = useMenuListScreen();
  return (
    <ImageBackground
      resizeMode="cover"
      source={require("@assets/images/precharged/background/background_menu_3x.jpg")}
      style={styles.container}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.days}>
        {(Object.entries(weeklyMenuUi) as [string, MomentUi][]).map(
          ([day, _]) => {
            return (
              <DayCardList
                key={day}
                day={day}
                today={today}
                moments={weeklyMenuUi[day]}
              />
            );
          },
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  days: {
    padding: FONT_BASE * 1.5,
    gap: FONT_BASE * 1.5,
    // paddingBottom: FONT_BASE * 5,
  },
});
