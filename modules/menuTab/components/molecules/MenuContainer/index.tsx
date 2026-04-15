import { View, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@constants/themes";
import { dayColors } from "@constants/mappings/colors/dayColors";
import { menuIconsMap } from "@constants/mappings/images/menuIconsMap";

export default function MenuContainer() {
  return (
    <ImageBackground
      resizeMode="contain"
      source={menuIconsMap.monday_icons}
      style={styles.container}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: theme.properties.beige,
    borderLeftWidth: 1,
    borderColor: theme.properties.beigeBorder,
  },
});
