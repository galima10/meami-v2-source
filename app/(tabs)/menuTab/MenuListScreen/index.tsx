import { View, StyleSheet } from "react-native";
import theme from "@constants/themes";
import { typography } from "@constants/styles";
import { AppText } from "@modules/shared/components/primitives/AppText";

export default function ComponentName() {
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
