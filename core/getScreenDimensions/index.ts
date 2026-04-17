import { Dimensions } from "react-native";

export function getScreenWidth(): number {
  return Dimensions.get("window").width;
}

export function getScreenHeight(): number {
  return Dimensions.get("window").height;
}
