import { FONT_BASE } from "@constants/general";
import { momentIconsMap } from "@constants/mappings/icons/momentIconsMap";
import { frMoments } from "@constants/mappings/traductors/momentsTraductor";
import theme from "@constants/themes";
import AppIcon from "@modules/shared/components/primitives/AppIcon";
import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface MomentButtonProps {
  moment: "morning" | "noon" | "evening";
  isActive: boolean;
  setSelectedMoment: Dispatch<SetStateAction<"matin" | "midi" | "soir">>;
}

export default function MomentButton({
  moment,
  isActive = false,
  setSelectedMoment,
}: MomentButtonProps) {
  return (
    <Pressable
      style={[styles.button, isActive && styles.active]}
      onPress={() => setSelectedMoment(frMoments[moment])}
    >
      <View style={styles.icon}>
        <AppIcon name={momentIconsMap[moment]} size={FONT_BASE * 2.125} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: FONT_BASE * 2.5,
    height: FONT_BASE * 2.5,
    borderRadius: FONT_BASE * 0.75,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.properties.littleShadow,
    backgroundColor: theme.properties.white,
    borderColor: theme.properties.whiteBorder,
    opacity: 0.5,
  },
  icon: {
    backgroundColor: theme.properties.redBorder,
    borderRadius: FONT_BASE * 0.575,
    width: FONT_BASE * 2.125,
    height: FONT_BASE * 2.125,
    overflow: "hidden",
  },
  active: {
    backgroundColor: theme.properties.vibrantOrange,
    borderColor: theme.properties.vibrantOrangeBorder,
    opacity: 1,
  },
});
