import { ImageBackground, View, StyleSheet } from "react-native";
import theme from "@constants/themes";
import { momentsOrder } from "@constants/mappings/orders/momentsOrder";
import { enMoments } from "@constants/mappings/traductors/momentsTraductor";
import { momentBandsMap } from "@constants/mappings/images/momentBandsMap";

interface MomentBandProps {
  momentId: number;
  dayName: string;
}

export default function MomentBand({ momentId, dayName }: MomentBandProps) {
  const imgSrc =
    momentBandsMap[`${dayName}_${enMoments[momentsOrder[momentId]]}`];
  return (
    <ImageBackground
      resizeMode="cover"
      source={imgSrc}
      style={styles.container}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    boxShadow: theme.properties.bigShadow,
  },
});
