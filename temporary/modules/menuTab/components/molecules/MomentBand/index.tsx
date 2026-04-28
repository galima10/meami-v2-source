import { FONT_BASE } from "@constants/general";
import { momentBandsMap } from "@constants/mappings/images/momentBandsMap";
import { enDays } from "@constants/mappings/traductors/daysTraductor";
import { enMoments } from "@constants/mappings/traductors/momentsTraductor";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { Dispatch, SetStateAction } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import MomentButton from "../../atoms/MomentButton";
import { getDayById, getMomentById } from "@helpers/getSeedById";

interface MomentBandProps {
  dayId: number;
  setSelectedMoment: Dispatch<SetStateAction<1 | 2 | 3>>;
  selectedMoment: 1 | 2 | 3;
}

export default function MomentBand({
  dayId,
  selectedMoment,
  setSelectedMoment,
}: MomentBandProps) {
  const day = getDayById(dayId);
  const imgSrc = `${enDays[day?.name]}_${enMoments[getMomentById(selectedMoment).name]}`;
  function handleSelectMoment(moment: 1 | 2 | 3) {
    setSelectedMoment(moment);
    console.log(enDays[day?.name ?? 0])
  }
  return (
    <ImageBackground
      resizeMode="cover"
      source={momentBandsMap[imgSrc]}
      style={styles.container}
    >
      <View style={styles.topSlot}>
        <AppText style={styles.dayMomentText}>
          {getMomentById(selectedMoment).name}
        </AppText>
      </View>
      <View style={styles.bottomSlot}>
        <View style={styles.buttons}>
          <MomentButton
            moment={1}
            isActive={selectedMoment === 1}
            handleSelectMoment={handleSelectMoment}
          />
          <MomentButton
            moment={2}
            isActive={selectedMoment === 2}
            handleSelectMoment={handleSelectMoment}
          />
          <MomentButton
            moment={3}
            isActive={selectedMoment === 3}
            handleSelectMoment={handleSelectMoment}
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
