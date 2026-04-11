import { View, StyleSheet } from "react-native";
import { AppText } from "@modules/shared/components/atoms/AppText";
import { typography } from "@constants/styles";
import theme from "@constants/themes";

export default function StockDefaultScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Stock Default Screen</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
});
