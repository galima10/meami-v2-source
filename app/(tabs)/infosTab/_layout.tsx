import { ROUTES } from "@constants/mappings/routes";
import TopButton from "@modules/shared/components/atoms/buttons/TopButton";
import AppTopBar from "@modules/shared/components/molecules/AppTopBar";
import { FocusGate } from "@modules/shared/components/screens/FocusGate";
import { Stack, usePathname } from "expo-router";

export default function InfosTabLayout() {
  const pathname = usePathname();
  const INFOS_TAB = ROUTES.infos;
  function infosAddRoute() {
    if (pathname === INFOS_TAB.cookingList) return INFOS_TAB.cookingForm;
    else if (pathname === INFOS_TAB.storageList) return INFOS_TAB.storageForm;
  }
  function topLeftButton() {
    if (
      pathname === INFOS_TAB.cookingList ||
      pathname === INFOS_TAB.storageList
    ) {
      return (
        <TopButton
          icon="addIcon"
          color="green"
          route={infosAddRoute()}
          routeAction="push"
        />
      );
    }
    if (
      pathname === INFOS_TAB.cookingForm ||
      pathname === INFOS_TAB.storageForm
    ) {
      return <TopButton icon="returnIcon" color="green" routeAction="back" />;
    }
  }
  return (
    <FocusGate>
      <Stack
        screenOptions={{
          header: () => (
            <AppTopBar
              left={
                <>
                  <TopButton icon="cookingIcon" route={INFOS_TAB.cookingList} />
                  <TopButton icon="closetIcon" route={INFOS_TAB.storageList} />
                </>
              }
              right={<>{topLeftButton()}</>}
            />
          ),
        }}
      />
    </FocusGate>
  );
}
