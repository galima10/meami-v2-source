import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { StyleSheet, View } from "react-native";

export default function MenuListScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Menu List Screen</AppText>
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
