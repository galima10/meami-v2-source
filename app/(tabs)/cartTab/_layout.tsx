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
                {pathname !== "/cartTab" && (
                  <TopButton icon="addStockIcon" color="green" disabled />
                )}
              </>
            }
            right={
              <>
                {pathname !== "/cartTab" && (
                  <TopButton icon="modifyIcon" color="green" />
                )}
              </>
            }
          />
        ),
      }}
    />
  );
}
