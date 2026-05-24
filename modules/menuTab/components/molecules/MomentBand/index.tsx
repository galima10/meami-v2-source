import { ImageBackground, View, StyleSheet } from "react-native";
import theme from "@constants/themes";
import { momentsOrder } from "@constants/mappings/orders/momentsOrder";
import { enMoments } from "@constants/mappings/traductors/momentsTraductor";
import { momentBandsMap } from "@constants/mappings/images/momentBandsMap";
import { FONT_BASE } from "@constants/general";
import { typography } from "@constants/styles";
import { AppText } from "@modules/shared/components/primitives/AppText";
import MomentButton from "../../atoms/MomentButton";

interface MomentBandProps {
  momentId: number;
  dayName: string;
  handleSelectMomentId: (id: number) => void;
}

export default function MomentBand({
  momentId,
  dayName,
  handleSelectMomentId,
}: MomentBandProps) {
  const imgSrc =
    momentBandsMap[`${dayName}_${enMoments[momentsOrder[momentId]]}`];
  return (
    <ImageBackground
      resizeMode="cover"
      source={imgSrc}
      style={styles.container}
    >
      <View style={styles.topSlot}>
        <AppText style={styles.dayMomentText}>{momentsOrder[momentId]}</AppText>
      </View>
      <View style={styles.bottomSlot}>
        <View style={styles.buttons}>
          <MomentButton
            moment={0}
            isActive={momentId === 0}
            handleSelectMoment={handleSelectMomentId}
          />
          <MomentButton
            moment={1}
            isActive={momentId === 1}
            handleSelectMoment={handleSelectMomentId}
          />
          <MomentButton
            moment={2}
            isActive={momentId === 2}
            handleSelectMoment={handleSelectMomentId}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    boxShadow: theme.properties.bigShadow,
  },
  topSlot: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSlot: {
    height: "50%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: FONT_BASE * 4,
  },
  dayMomentText: {
    transform: [{ rotate: "-90deg" }],
    textTransform: "uppercase",
    color: theme.properties.white,
    fontWeight: theme.properties.bold,
    fontSize: typography.h1,
    textAlign: "center",
    width: 200,
    lineHeight: typography.h1,
  },
  buttons: {
    gap: FONT_BASE,
  },
});
