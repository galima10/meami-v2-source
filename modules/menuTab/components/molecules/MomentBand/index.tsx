import { ImageBackground, StyleSheet } from "react-native";
import { momentBandsMap } from "@constants/mappings/images/momentBandsMap";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { typography } from "@constants/styles";
import { enDays } from "@constants/mappings/traductors/enDays";
import { enMoments } from "@constants/mappings/traductors/enMoments";

interface MomentBandProps {
  moment: string;
  day: string;
}

export default function MomentBand({ moment, day }: MomentBandProps) {
  const imgSrc = `${enDays[day]}_${enMoments[moment]}`;
  return (
    <ImageBackground
      resizeMode="cover"
      source={momentBandsMap[imgSrc]}
      style={styles.container}
    >
      <AppText style={styles.dayMomentText}>{moment}</AppText>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    boxShadow: theme.properties.bigShadow,
    justifyContent: "center",
    alignItems: "center",
  },
  dayMomentText: {
    marginBottom: 300,
    transform: [{ rotate: "-90deg" }],
    textTransform: "uppercase",
    color: theme.properties.white,
    fontWeight: theme.properties.bold,
    fontSize: typography.h1,
    textAlign: "center",
    width: 200,
    lineHeight: 64,
  },
});
