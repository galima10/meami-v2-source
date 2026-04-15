import { ImageBackground, StyleSheet } from "react-native";
import { momentBandsMap } from "@constants/mappings/images/momentBandsMap";
import theme from "@constants/themes";

export default function MomentBand() {
  return (
    <ImageBackground
      resizeMode="cover"
      source={momentBandsMap.monday_morning}
      style={styles.container}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    boxShadow: theme.properties.bigShadow,
  },
});
