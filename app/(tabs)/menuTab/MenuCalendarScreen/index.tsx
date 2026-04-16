import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { StyleSheet, View, ScrollView } from "react-native";
import DayCardCalendar from "@modules/menuTab/components/organisms/DayCardCalendar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import {
  fetchAllMenusThunk,
  fetchWeeklyMenuThunk,
} from "@stores/thunks/weeklyMenu";
import {
  weeklyMenuToUi,
  MenuUi,
  MomentUi,
} from "@utils/dataToUi/weeklyMenuToUi";
import { FocusGate } from "@modules/shared/components/screens/FocusGate";

export default function MenuCalendarScreen() {
  const dispatch = useAppDispatch();
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { moments, days, menuCategories } = useAppSelector(
    (state) => state.seed,
  );
  const weeklyMenuUi = weeklyMenuToUi(weeklyMenu, days, moments);
  useEffect(() => {
    async function fetchMenus() {
      await dispatch(fetchAllMenusThunk());
      await dispatch(fetchWeeklyMenuThunk());
    }
    if (Object.keys(weeklyMenu).length === 0) {
      fetchMenus();
    }
  }, []);
  return (
    <FocusGate>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        >
          {(Object.keys(weeklyMenuUi) as string[]).map((day) => {
            return (
              <DayCardCalendar
                key={day}
                moment="matin"
                day={day.toLowerCase()}
              />
            );
          })}
        </ScrollView>
      </View>
    </FocusGate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
});
