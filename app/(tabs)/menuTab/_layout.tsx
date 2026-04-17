import { ROUTES } from "@constants/mappings/routes";
import TopButton from "@modules/shared/components/atoms/buttons/TopButton";
import AppTopBar from "@modules/shared/components/molecules/AppTopBar";
import { Stack, usePathname } from "expo-router";
import {
  fetchAllMenusThunk,
  fetchWeeklyMenuThunk,
} from "@stores/thunks/weeklyMenu";
import { fetchIngredientsThunk } from "@stores/thunks/ingredients";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import { useEffect } from "react";
import { fetchUnitsThunk } from "@stores/thunks/units";

export default function MenuTabLayout() {
  const MENU_ROUTES = ROUTES.menu;
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { weeklyMenu } = useAppSelector((state) => state.weeklyMenu);
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { units } = useAppSelector((state) => state.unit);
  useEffect(() => {
    async function fetchMenus() {
      await dispatch(fetchAllMenusThunk());
      await dispatch(fetchWeeklyMenuThunk());
    }
    if (Object.keys(weeklyMenu).length === 0) {
      fetchMenus();
    }
    if (Object.keys(ingredients).length === 0) {
      dispatch(fetchIngredientsThunk());
    }
    if (Object.keys(units).length === 0) {
      dispatch(fetchUnitsThunk());
    }
  }, []);
  return (
    <Stack
      screenOptions={{
        header: () => (
          <AppTopBar
            left={
              <>
                <TopButton icon="calendarIcon" route={MENU_ROUTES.calendar} />
                <TopButton icon="listIcon" route={MENU_ROUTES.list} />
              </>
            }
            right={
              <>
                {pathname === MENU_ROUTES.modify && (
                  <>
                    <TopButton icon="binIcon" color="red" />
                    <TopButton
                      icon="validateIcon"
                      color="green"
                      routeAction="back"
                    />
                  </>
                )}
                {pathname !== MENU_ROUTES.modify && (
                  <TopButton
                    icon="modifyIcon"
                    color="green"
                    routeAction="push"
                    route={MENU_ROUTES.modify}
                  />
                )}
              </>
            }
          />
        ),
      }}
    />
  );
}
