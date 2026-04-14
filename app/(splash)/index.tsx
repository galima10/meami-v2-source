import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/atoms/appElements/AppText";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";

export default function Splash() {
  const router = useRouter();
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.replace("/(tabs)/menuTab/MenuCalendarScreen");
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Splash Screen</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.properties.darkOrange,
    gap: 16,
  },
  text: {
    fontSize: typography.h3,
    fontWeight: theme.properties.bold,
    color: theme.properties.beige,
  },
  button: {
    fontSize: typography.h5,
    fontFamily: theme.properties.fontFamily,
    color: theme.properties.beige,
  },
});
