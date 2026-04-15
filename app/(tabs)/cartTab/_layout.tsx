import { Stack } from "expo-router";
import AppTopBar from "@modules/shared/components/molecules/AppTopBar";
import TopButton from "@modules/shared/components/atoms/buttons/TopButton";
import { ROUTES } from "@constants/general";
import { usePathname } from "expo-router";

export default function CartTabLayout() {
  const CART_ROUTES = ROUTES.cart;
  const pathname = usePathname();
  return (
    <Stack
      screenOptions={{
        header: () => (
          <AppTopBar
            left={
              <>
                {pathname === CART_ROUTES.list && (
                  <TopButton icon="addStockIcon" color="green" disabled />
                )}
                {pathname === CART_ROUTES.modify && (
                  <TopButton icon="addIcon" togglable={false} />
                )}
              </>
            }
            right={
              <>
                {pathname === CART_ROUTES.list && (
                  <>
                    <TopButton
                      icon="infosIcon"
                      color="info"
                    />
                    <TopButton
                      icon="modifyIcon"
                      color="green"
                      route={CART_ROUTES.modify}
                      routeAction="push"
                    />
                  </>
                )}
                {pathname === CART_ROUTES.modify && (
                  <TopButton
                    icon="validateIcon"
                    color="green"
                    routeAction="back"
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
