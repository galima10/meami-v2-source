import { Stack } from "expo-router";
import AppTopBar from "@modules/shared/components/molecules/AppTopBar";
import TopButton from "@modules/shared/components/atoms/buttons/TopButton";
import { ROUTES } from "@constants/general";
import { usePathname } from "expo-router";

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
                  <TopButton
                    icon="binIcon"
                    route={MENU_ROUTES.modify}
                    color="red"
                  />
                )}
                <TopButton
                  icon={
                    pathname === MENU_ROUTES.modify
                      ? "validateIcon"
                      : "modifyIcon"
                  }
                  route={MENU_ROUTES.modify}
                  color="green"
                />
              </>
            }
          />
        ),
      }}
    />
  );
}
