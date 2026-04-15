import { View, StyleSheet, ImageBackground, type ViewStyle } from "react-native";
import AppLinearGradient from "@modules/shared/components/primitives/AppLinearGradient";
import theme from "@constants/themes";
import { dayColors } from "@constants/mappings/colors/dayColors";
import { menuIconsMap } from "@constants/mappings/images/menuIconsMap";

export default function MenuContainer() {
  return (
    <ImageBackground
      resizeMode="contain"
      source={menuIconsMap.monday_icons}
      style={styles.container}
    >
      <AppLinearGradient
        colors={["transparent", dayColors.monday]}
        locations={[0.5, 1]}
        style={styles.gradient as ViewStyle}
      ></AppLinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: theme.properties.beige,
    borderLeftWidth: 1,
    borderColor: theme.properties.beigeBorder,
  },
  gradient: {
    flex: 1,
  },
});

