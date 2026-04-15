import { SvgProps } from "react-native-svg";

import SvgAccompaniementIcon from "@modules/shared/components/svg/filled/SvgAccompaniementIcon";
import SvgBreakfastIcon from "@modules/shared/components/svg/filled/SvgBreakfastIcon";
import SvgDessertIcon from "@modules/shared/components/svg/filled/SvgDessertIcon";
import SvgEveningIcon from "@modules/shared/components/svg/filled/SvgEveningIcon";
import SvgMealIcon from "@modules/shared/components/svg/filled/SvgMealIcon";
import SvgMorningIcon from "@modules/shared/components/svg/filled/SvgMorningIcon";
import SvgNoonIcon from "@modules/shared/components/svg/filled/SvgNoonIcon";
import SvgVegetablesIcon from "@modules/shared/components/svg/filled/SvgVegetablesIcon";

import SvgAddIcon from "@modules/shared/components/svg/outline/SvgAddIcon";
import SvgAddStockIcon from "@modules/shared/components/svg/outline/SvgAddStockIcon";
import SvgBinIcon from "@modules/shared/components/svg/outline/SvgBinIcon";
import SvgCalendarIcon from "@modules/shared/components/svg/outline/SvgCalendarIcon";
import SvgCartIcon from "@modules/shared/components/svg/outline/SvgCartIcon";
import SvgChangeIcon from "@modules/shared/components/svg/outline/SvgChangeIcon";
import SvgClockIcon from "@modules/shared/components/svg/outline/SvgClockIcon";
import SvgCloseIcon from "@modules/shared/components/svg/outline/SvgCloseIcon";
import SvgClosetIcon from "@modules/shared/components/svg/outline/SvgClosetIcon";
import SvgColdIcon from "@modules/shared/components/svg/outline/SvgColdIcon";
import SvgCookingIcon from "@modules/shared/components/svg/outline/SvgCookingIcon";
import SvgFridgeIcon from "@modules/shared/components/svg/outline/SvgFridgeIcon";
import SvgInfosIcon from "@modules/shared/components/svg/outline/SvgInfosIcon";
import SvgIngredientIcon from "@modules/shared/components/svg/outline/SvgIngredientIcon";
import SvgListIcon from "@modules/shared/components/svg/outline/SvgListIcon";
import SvgMenuIcon from "@modules/shared/components/svg/outline/SvgMenuIcon";
import SvgModifyIcon from "@modules/shared/components/svg/outline/SvgModifyIcon";
import SvgProductIcon from "@modules/shared/components/svg/outline/SvgProductIcon";
import SvgRecipeIcon from "@modules/shared/components/svg/outline/SvgRecipeIcon";
import SvgReturnIcon from "@modules/shared/components/svg/outline/SvgReturnIcon";
import SvgSearchIcon from "@modules/shared/components/svg/outline/SvgSearchIcon";
import SvgSortIcon from "@modules/shared/components/svg/outline/SvgSortIcon";
import SvgStockIcon from "@modules/shared/components/svg/outline/SvgStockIcon";
import SvgValidateIcon from "@modules/shared/components/svg/outline/SvgValidateIcon";
import SvgWarmIcon from "@modules/shared/components/svg/outline/SvgWarmIcon";

export type IconName =
  | "accompaniementIcon"
  | "breakfastIcon"
  | "dessertIcon"
  | "eveningIcon"
  | "mealIcon"
  | "morningIcon"
  | "noonIcon"
  | "vegetablesIcon"
  | "addIcon"
  | "addStockIcon"
  | "binIcon"
  | "calendarIcon"
  | "cartIcon"
  | "changeIcon"
  | "clockIcon"
  | "closeIcon"
  | "closetIcon"
  | "coldIcon"
  | "cookingIcon"
  | "fridgeIcon"
  | "infosIcon"
  | "ingredientIcon"
  | "listIcon"
  | "menuIcon"
  | "modifyIcon"
  | "productIcon"
  | "recipeIcon"
  | "returnIcon"
  | "searchIcon"
  | "sortIcon"
  | "stockIcon"
  | "validateIcon"
  | "warmIcon"
  | string;

const ICONS: Record<IconName, React.FC<SvgProps & { withStroke?: boolean }>> = {
  accompaniementIcon: SvgAccompaniementIcon,
  breakfastIcon: SvgBreakfastIcon,
  dessertIcon: SvgDessertIcon,
  eveningIcon: SvgEveningIcon,
  mealIcon: SvgMealIcon,
  morningIcon: SvgMorningIcon,
  noonIcon: SvgNoonIcon,
  vegetablesIcon: SvgVegetablesIcon,
  addIcon: SvgAddIcon,
  addStockIcon: SvgAddStockIcon,
  binIcon: SvgBinIcon,
  calendarIcon: SvgCalendarIcon,
  cartIcon: SvgCartIcon,
  changeIcon: SvgChangeIcon,
  clockIcon: SvgClockIcon,
  closeIcon: SvgCloseIcon,
  closetIcon: SvgClosetIcon,
  coldIcon: SvgColdIcon,
  cookingIcon: SvgCookingIcon,
  fridgeIcon: SvgFridgeIcon,
  infosIcon: SvgInfosIcon,
  ingredientIcon: SvgIngredientIcon,
  listIcon: SvgListIcon,
  menuIcon: SvgMenuIcon,
  modifyIcon: SvgModifyIcon,
  productIcon: SvgProductIcon,
  recipeIcon: SvgRecipeIcon,
  returnIcon: SvgReturnIcon,
  searchIcon: SvgSearchIcon,
  sortIcon: SvgSortIcon,
  stockIcon: SvgStockIcon,
  validateIcon: SvgValidateIcon,
  warmIcon: SvgWarmIcon,
};

export function useAppIcon(name: IconName) {
  return ICONS[name];
}
