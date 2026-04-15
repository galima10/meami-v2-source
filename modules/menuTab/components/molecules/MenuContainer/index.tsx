import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@constants/themes";

export default function MenuContainer() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: theme.properties.beige,
    borderLeftWidth: 1,
    borderColor: theme.properties.beigeBorder,
  },
});
