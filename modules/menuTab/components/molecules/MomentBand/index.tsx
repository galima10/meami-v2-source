import { ImageBackground, View, StyleSheet } from "react-native";
import theme from "@constants/themes";

export default function MomentBand() {
  return <ImageBackground style={styles.container}></ImageBackground>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    boxShadow: theme.properties.bigShadow,
  },
});
