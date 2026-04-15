import { Stack } from "expo-router";
import { ROUTES } from "@constants/general";
import AppTopBar from "@modules/shared/components/molecules/AppTopBar";
import TopButton from "@modules/shared/components/atoms/buttons/TopButton";
import { usePathname } from "expo-router";

export default function InfosTabLayout() {
  const pathname = usePathname();
  const INFOS_TAB = ROUTES.infos;
  function infosAddRoute() {
    if (pathname === INFOS_TAB.cookingList) return INFOS_TAB.cookingForm;
    else if (pathname === INFOS_TAB.storageList) return INFOS_TAB.storageForm;
  }
  return (
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
            right={
              <>
                {pathname !== INFOS_TAB.default && (
                  <TopButton
                    icon="addIcon"
                    color="green"
                    route={infosAddRoute()}
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
