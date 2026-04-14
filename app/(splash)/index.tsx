import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/atoms/appElements/AppText";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { Image } from "expo-image";
import WaveText from "@modules/shared/components/atoms/animated/WaveText";
import BounceSpring from "@modules/shared/components/atoms/animated/BounceSpring";

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
      <BounceSpring>
        <Image
          source={require("@assets/images/precharged/logos/logo.png")}
          style={styles.icon}
        />
      </BounceSpring>
      <View style={styles.titleContainer}>
        <WaveText text="Ton meilleur ami pour cooky !" style={styles.title} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.properties.darkOrange,
  },
  icon: {
    width: 300,
    height: 300,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    color: theme.properties.beige,
    fontWeight: theme.properties.bold,
  },
  titleContainer: {
    paddingHorizontal: 50,
    marginTop: 40,
  },
});
