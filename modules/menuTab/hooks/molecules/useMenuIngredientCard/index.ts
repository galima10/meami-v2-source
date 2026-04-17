import { useState } from "react";
import type { IngredientMenu } from "@stores/features/weeklyMenu";
import { useAppDispatch } from "@modules/shared/hooks/redux";
import { setIngredientMenuQuantityThunk } from "@stores/thunks/weeklyMenu";

export function useMenuIngredientCard(
  ingredient: IngredientMenu,
  menuId: number,
) {
  const dispatch = useAppDispatch();

  const [isQuantifiable, setIsQuantifiable] = useState<boolean>(
    !!ingredient?.quantity,
  );

  const [quantity, setQuantityState] = useState<string>(
    ingredient?.quantity ? String(ingredient.quantity) : "",
  );

  const normalize = (v: string) => v.replace(",", ".");

  function handleOnChange(text: string) {
    const cleaned = text.replace(/[^0-9.,]/g, "");

    setQuantityState(cleaned);
  }

  function handleQuantifiable() {
    setIsQuantifiable((prev) => {
      const newValue = !prev;

      if (newValue) {
        setQuantityState("1");
        dispatch(
          setIngredientMenuQuantityThunk({
            itemId: ingredient.ingredientId,
            value: 1,
            operation: "set",
            menuId,
          }),
        );
      } else {
        setQuantityState("");
        dispatch(
          setIngredientMenuQuantityThunk({
            itemId: ingredient.ingredientId,
            value: null,
            operation: "set",
            menuId,
          }),
        );
      }

      return newValue;
    });
  }

  function updateQuantity(value: number) {
    const str = String(value);
    if (ingredient.quantity === value) return;
    setQuantityState(str);

    dispatch(
      setIngredientMenuQuantityThunk({
        itemId: ingredient.ingredientId,
        value,
        operation: "set",
        menuId,
      }),
    );
  }

  function handleIncrementDecrementQuantity(delta: number) {
    const operation = delta === 1 ? "increment" : "decrement";
    const newQuantity = Number(quantity) + delta;
    if (newQuantity < 1) return;
    setQuantityState(String(newQuantity));

    dispatch(
      setIngredientMenuQuantityThunk({
        itemId: ingredient.ingredientId,
        value: Math.abs(delta),
        operation: operation,
        menuId,
      }),
    );
  }

  return {
    isQuantifiable,
    handleQuantifiable,
    quantity,
    updateQuantity,
    handleOnChange,
    normalize,
    setQuantityState,
    handleIncrementDecrementQuantity,
  };
}
