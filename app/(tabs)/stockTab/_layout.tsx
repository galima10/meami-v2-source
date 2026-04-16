import { Stack } from "expo-router";
import { ROUTES } from "@constants/general";
import { usePathname } from "expo-router";
import AppTopBar from "@modules/shared/components/molecules/AppTopBar";
import TopButton from "@modules/shared/components/atoms/buttons/TopButton";
import { FocusGate } from "@modules/shared/components/screens/FocusGate";

export default function StockTabLayout() {
  const pathname = usePathname();
  const STOCK_TAB = ROUTES.stock;

  function stockAddRoute() {
    if (pathname === STOCK_TAB.recipesList) return STOCK_TAB.recipeForm;
    else if (pathname === STOCK_TAB.ingredientsList)
      return STOCK_TAB.ingredientForm;
    else if (pathname === STOCK_TAB.productsList) return STOCK_TAB.productForm;
  }

  function topLeftButton() {
    if (
      pathname === STOCK_TAB.recipesList ||
      pathname === STOCK_TAB.ingredientsList ||
      pathname === STOCK_TAB.productsList
    ) {
      return (
        <TopButton
          icon="addIcon"
          color="green"
          route={stockAddRoute()}
          routeAction="push"
        />
      );
    }
    if (
      pathname === STOCK_TAB.recipeForm ||
      pathname === STOCK_TAB.ingredientForm ||
      pathname === STOCK_TAB.productForm
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
                  <TopButton icon="recipeIcon" route={STOCK_TAB.recipesList} />
                  <TopButton
                    icon="ingredientIcon"
                    route={STOCK_TAB.ingredientsList}
                  />
                  <TopButton
                    icon="productIcon"
                    route={STOCK_TAB.productsList}
                  />
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
