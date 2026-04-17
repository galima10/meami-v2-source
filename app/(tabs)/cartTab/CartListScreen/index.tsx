import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { StyleSheet, View } from "react-native";
import ListContainer from "@modules/shared/components/organims/ListContainer";

export default function CartListScreen() {
  return (
    <View style={styles.container}>
      <ListContainer />
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
