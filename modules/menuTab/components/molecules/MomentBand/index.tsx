import { FONT_BASE } from "@constants/general";
import { momentBandsMap } from "@constants/mappings/images/momentBandsMap";
import { enDays } from "@constants/mappings/traductors/days";
import { enMoments } from "@constants/mappings/traductors/moments";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { Dispatch, SetStateAction } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import MomentButton from "../../atoms/MomentButton";

interface MomentBandProps {
  moment: string;
  day: string;
  setSelectedMoment: Dispatch<SetStateAction<"matin" | "midi" | "soir">>;
  selectedMoment: "matin" | "midi" | "soir";
}

export default function MomentBand({
  moment,
  day,
  selectedMoment,
  setSelectedMoment,
}: MomentBandProps) {
  const imgSrc = `${enDays[day]}_${enMoments[moment]}`;
  return (
    <ImageBackground
      resizeMode="cover"
      source={momentBandsMap[imgSrc]}
      style={styles.container}
    >
      <View style={styles.topSlot}>
        <AppText style={styles.dayMomentText}>{moment}</AppText>
      </View>
      <View style={styles.bottomSlot}>
        <View style={styles.buttons}>
          <MomentButton
            moment="morning"
            isActive={selectedMoment === "matin"}
            setSelectedMoment={setSelectedMoment}
          />
          <MomentButton
            moment="noon"
            isActive={selectedMoment === "midi"}
            setSelectedMoment={setSelectedMoment}
          />
          <MomentButton
            moment="evening"
            isActive={selectedMoment === "soir"}
            setSelectedMoment={setSelectedMoment}
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
