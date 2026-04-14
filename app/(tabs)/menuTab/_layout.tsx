import { Stack } from "expo-router";
import AppTopBar from "@modules/shared/components/molecules/AppTopBar";
import TopButton from "@modules/shared/components/atoms/buttons/TopButton";
import { ROUTES } from "@constants/general";

export default function MenuTabLayout() {
  const MENU_ROUTES = ROUTES.menu;
  return (
    <Stack
      screenOptions={{
        header: (props) => (
          <AppTopBar
            left={
              <>
                <TopButton icon="calendarIcon" route={MENU_ROUTES.calendar} />
                <TopButton icon="listIcon" route={MENU_ROUTES.list} />
              </>
            }
            right={
              <>
                <TopButton icon="calendarIcon" route={MENU_ROUTES.modify} />
              </>
            }
            {...props}
          />
        ),
      }}
    />
  );
}
