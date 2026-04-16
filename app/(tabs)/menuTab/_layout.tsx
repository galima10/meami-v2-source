import { ROUTES } from "@constants/mappings/routes";
import TopButton from "@modules/shared/components/atoms/buttons/TopButton";
import AppTopBar from "@modules/shared/components/molecules/AppTopBar";
import { Stack, usePathname } from "expo-router";

export default function MenuTabLayout() {
  const MENU_ROUTES = ROUTES.menu;
  const pathname = usePathname();
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
