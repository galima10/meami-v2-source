import theme from "@constants/themes";
import { useAppSelector } from "@modules/shared/hooks/redux";

export function useDayCardList() {
  const { ingredients } = useAppSelector((state) => state.ingredient);
  function categoryColor(menuCategoryId: number) {
    switch (Number(menuCategoryId)) {
      case 1:
        return theme.properties.darkPurple;

      case 2:
        return theme.properties.yellowDarker;

      case 3:
        return theme.properties.darkGreen;

      case 4:
        return theme.properties.darkRed;
      case 5:
        return theme.properties.darkGreen;
      case 6:
        return theme.properties.yellowDarker;
      case 7:
        return theme.properties.darkPink;
      case 8:
        return theme.properties.transparentBrown;
    }
  }
  return { ingredients, categoryColor };
}
