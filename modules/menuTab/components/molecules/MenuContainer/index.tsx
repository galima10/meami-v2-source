import {
  StyleSheet,
  ImageBackground,
  type ViewStyle,
  View,
} from "react-native";
import AppLinearGradient from "@modules/shared/components/primitives/AppLinearGradient";
import theme from "@constants/themes";
import { dayColors } from "@constants/mappings/colors/dayColors";
import { menuIconsMap } from "@constants/mappings/images/menuIconsMap";
import { enDays } from "@constants/mappings/traductors/enDays";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { toCapitalize } from "@utils/toCapitalize";
import { typography } from "@constants/styles";
import { FONT_BASE } from "@constants/general";

interface MenuContainerProps {
  day: string;
}

export default function MenuContainer({ day }: MenuContainerProps) {
  return (
    <ImageBackground
      resizeMode="contain"
      source={menuIconsMap[`${enDays[day]}_icons`]}
      style={styles.container}
    >
      <AppLinearGradient
        colors={["transparent", dayColors[enDays[day]]]}
        locations={[0.5, 1]}
        style={styles.gradient as ViewStyle}
      >
        <View style={styles.titleContainer}>
          <AppText style={styles.dayTitle}>{toCapitalize(day)}</AppText>
        </View>
      </AppLinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3.5,
    backgroundColor: theme.properties.beige,
    borderLeftWidth: 1,
    borderColor: theme.properties.beigeBorder,
  },
  gradient: {
    flex: 1,
  },
  dayTitle: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: theme.properties.brown,
    padding: FONT_BASE,
    width: "100%",
  },
});
