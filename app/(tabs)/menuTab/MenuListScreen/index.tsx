import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { StyleSheet, View, ScrollView } from "react-native";
import DayCardList from "@modules/menuTab/components/atoms/DayCardList";
import { FONT_BASE } from "@constants/general";
import { useMemo } from "react";
import { weeklyMenuToUi } from "@utils/dataToUi/weeklyMenuToUi";
import { useAppSelector } from "@modules/shared/hooks/redux";
import type { MomentUi } from "@utils/dataToUi/weeklyMenuToUi";

export default function MenuListScreen() {
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { moments, days } = useAppSelector((state) => state.seed);
  const weeklyMenuUi = useMemo(
    () => weeklyMenuToUi(weeklyMenu, days, moments),
    [weeklyMenu, days, moments],
  );
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.days}>
        {(Object.entries(weeklyMenuUi) as [string, MomentUi][]).map(
          ([day, moments]) => {
            return <DayCardList key={day} day={day} />;
          },
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  days: {
    padding: FONT_BASE,
  },
});
