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
    fetchMenus();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {/* <DayCardCalendar moment="matin" day="samedi" />
        <DayCardCalendar moment="matin" day="dimanche" /> */}
        {(Object.keys(weeklyMenuUi) as string[]).map((day) => {
          return (
            <DayCardCalendar key={day} moment="matin" day={day.toLowerCase()} />
          );
        })}
      </ScrollView>
    </View>
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
