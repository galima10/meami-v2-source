import { typeScale } from "@utils/typeScale";
import { StyleSheet } from "react-native";
import theme from "@constants/themes";

// Échelle typographique
export const typography = {
  small: typeScale(-1),
  body: typeScale(0),
  h6: typeScale(1),
  h5: typeScale(2),
  h4: typeScale(3),
  h3: typeScale(4),
  h2: typeScale(5),
  h1: typeScale(6),
};
