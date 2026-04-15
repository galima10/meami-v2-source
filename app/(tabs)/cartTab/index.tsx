import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { StyleSheet, View, Pressable } from "react-native";
import { useAppNavigation } from "@modules/shared/hooks/useAppNavigation";
import { ROUTES } from "@constants/general";

export default function CartDefaultScreen() {
  const { handleNavigate } = useAppNavigation();
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Cart Default Screen</AppText>
      <Pressable onPress={() => handleNavigate(ROUTES.cart.list)}>
        <AppText>Générer liste de courses</AppText>
      </Pressable>
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
