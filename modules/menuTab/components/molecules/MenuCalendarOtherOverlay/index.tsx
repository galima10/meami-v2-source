import { View, Pressable, StyleSheet } from "react-native";
import { getScreenWidth, getScreenHeight } from "@helpers/getScreenDimensions";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import { getFlexWidth } from "@helpers/getFlexWidth";
import AnimatedAppView from "@modules/shared/components/primitives/AnimatedAppView";
import { useMenuCalendarOtherOverlay } from "@modules/menuTab/hooks/molecules/useMenuCalendarOtherOverlay";

interface MenuCalendarOtherOverlayProps {
  isOverlayOpen: boolean;
  handleCloseOverlay: (bool: boolean) => void;
}

export default function MenuCalendarOtherOverlay({
  isOverlayOpen,
  handleCloseOverlay,
}: MenuCalendarOtherOverlayProps) {
  const { toggleOverlay, animatedStyle } = useMenuCalendarOtherOverlay(
    handleCloseOverlay,
    isOverlayOpen,
  );
  return (
    <View style={styles.container}>
      {isOverlayOpen && (
        <Pressable style={styles.hitbox} onPress={toggleOverlay} />
      )}
      <AnimatedAppView style={[styles.overlay, animatedStyle]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonActive,
          ]}
          onPress={toggleOverlay}
        >
          <AppText style={styles.textButton}>Autres</AppText>
        </Pressable>
        <View style={styles.content}></View>
      </AnimatedAppView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: getScreenHeight(),
    width: getScreenWidth(),
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: "box-none",
  },
  hitbox: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    width: getFlexWidth(getScreenWidth(), 3.5, 1 + 3.5),
    height: FONT_BASE * 4,
    position: "absolute",
    bottom: FONT_BASE * 2,
    right: 0,
    flexDirection: "row",
    minHeight: FONT_BASE * 6.75,
    alignItems: "center",
  },
  overlayActive: {
    right: 0,
  },
  content: {
    backgroundColor: theme.properties.beige,
    borderColor: theme.properties.beigeBorder,
    borderWidth: 1,
    boxShadow: theme.properties.bigShadow,
    borderTopLeftRadius: FONT_BASE,
    borderBottomLeftRadius: FONT_BASE,
    padding: FONT_BASE * 1.5,
    flex: 1,
    height: "100%",
  },
  button: {
    width: FONT_BASE * 2,
    height: FONT_BASE * 5,
    borderWidth: 1,
    backgroundColor: theme.properties.darkGreen,
    borderColor: theme.properties.greenBorder,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: FONT_BASE * 0.75,
    borderBottomLeftRadius: FONT_BASE * 0.75,
    boxShadow: theme.properties.bigShadow,
  },
  textButton: {
    fontWeight: theme.properties.bold,
    color: theme.properties.beige,
    textAlign: "center",
    transform: [{ rotate: "-90deg" }],
    width: FONT_BASE * 3,
  },
  buttonActive: {
    backgroundColor: theme.properties.lightGreen,
    borderColor: theme.properties.lightGreenBorder,
  },
});
