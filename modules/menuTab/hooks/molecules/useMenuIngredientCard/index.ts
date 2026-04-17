import { useState } from "react";
import type { IngredientMenu } from "@stores/features/weeklyMenu";

export function useMenuIngredientCard(ingredient: IngredientMenu) {
  const [isQuantifiable, setIsQuantifiable] = useState<boolean>(
    ingredient?.quantity ? true : false,
  );
  const [quantity, onChangeQuantity] = useState<string>(
    ingredient?.quantity ? ingredient?.quantity.toString() : "",
  );
  function handleQuantifiable() {
    const newQuantifiable = !isQuantifiable;
    setIsQuantifiable(newQuantifiable);
    if (newQuantifiable) {
      onChangeQuantity("0");
    } else {
      onChangeQuantity("");
    }
  }
  return {
    isQuantifiable,
    handleQuantifiable,
    quantity,
    onChangeQuantity,
  };
}
