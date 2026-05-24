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
import type { AppDispatch } from "@stores/index";

async function fetchMenus(dispatch: AppDispatch) {
  await dispatch(fetchAllMenusThunk());
  await dispatch(fetchWeeklyMenuThunk());
}

export default function MenuTabLayout() {
  const MENU_ROUTES = ROUTES.menu;
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const weeklyMenuLoaded = useAppSelector(
    (state) => state.weeklyMenu.hasLoaded,
  );
  const ingredientsLoaded = useAppSelector(
    (state) => state.ingredient.hasLoaded,
  );
  const unitsLoaded = useAppSelector((state) => state.unit.hasLoaded);

  useEffect(() => {
    if (!weeklyMenuLoaded) {
      fetchMenus(dispatch);
    }
    if (!ingredientsLoaded) {
      dispatch(fetchIngredientsThunk());
    }
    if (!unitsLoaded) {
      dispatch(fetchUnitsThunk());
    }
  }, [weeklyMenuLoaded, ingredientsLoaded, unitsLoaded]);
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
                      icon="returnIcon"
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
