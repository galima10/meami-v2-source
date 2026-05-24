import { Pressable, StyleSheet, View } from "react-native";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";
import { momentIconsMap } from "@constants/mappings/icons/momentIconsMap";
import AppIcon from "@modules/shared/components/primitives/AppIcon";
import { enMoments } from "@constants/mappings/traductors/momentsTraductor";
import { momentsOrder } from "@constants/mappings/orders/momentsOrder";

interface MomentButtonProps {
  moment: 0 | 1 | 2;
  isActive: boolean;
  handleSelectMoment: (id: 0 | 1 | 2) => void;
}

export default function MomentButton({
  moment,
  isActive = false,
  handleSelectMoment,
}: MomentButtonProps) {
  const iconMoment = momentIconsMap[enMoments[momentsOrder[moment]]]
  return (
    <Pressable
      style={[styles.button, isActive && styles.active]}
      onPress={() => handleSelectMoment(moment)}
    >
      <View style={styles.icon}>
        <AppIcon name={iconMoment} size={FONT_BASE * 2.5} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: FONT_BASE * 3,
    height: FONT_BASE * 3,
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
    borderRadius: FONT_BASE * 0.5,
    width: FONT_BASE * 2.5,
    height: FONT_BASE * 2.5,
    overflow: "hidden",
  },
  active: {
    backgroundColor: theme.properties.vibrantOrange,
    borderColor: theme.properties.vibrantOrangeBorder,
    opacity: 1,
  },
});
