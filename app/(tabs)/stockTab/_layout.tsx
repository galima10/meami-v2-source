import { Stack } from "expo-router";
import { ROUTES } from "@constants/general";
import { usePathname } from "expo-router";
import AppTopBar from "@modules/shared/components/molecules/AppTopBar";
import TopButton from "@modules/shared/components/atoms/buttons/TopButton";

export default function StockTabLayout() {
  const pathname = usePathname();
  const STOCK_TAB = ROUTES.stock;
  return (
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
                <TopButton icon="productIcon" route={STOCK_TAB.productsList} />
              </>
            }
            right={
              <>
                <TopButton icon="addIcon" color="green" />
              </>
            }
          />
        ),
      }}
    />
  );
}
