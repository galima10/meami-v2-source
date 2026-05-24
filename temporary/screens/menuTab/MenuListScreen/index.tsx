import { FONT_BASE } from "@constants/general";
import { backgroundMap } from "@constants/mappings/images/backgroundMap";
import type { MomentUi } from "@mappers/dataToUi/weeklyMenuToUi";
import DayCardList from "@temporary/modules/menuTab/components/atoms/DayCardList";
import { useMenuListScreen } from "@temporary/modules/shared/hooks/screens/menuTab/useMenuListScreen";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";

export default function MenuListScreen() {
  const { weeklyMenuUi, today } = useMenuListScreen();
  return (
    <ImageBackground
      resizeMode="cover"
      source={backgroundMap.menu}
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
