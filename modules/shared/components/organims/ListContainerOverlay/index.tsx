import { StyleSheet } from "react-native";
import ListContainer from "../ListContainer";
import { FONT_BASE } from "@constants/general";
import AppIconButton from "../../atoms/buttons/AppIconButton";
import theme from "@constants/themes";
import { backgroundMap } from "@constants/mappings/images/backgroundMap";
import AnimatedAppView from "../../primitives/AnimatedAppView";
import { withTiming, useDerivedValue } from "react-native-reanimated";

interface ListContainerOverlayProps {
  closeAction?: () => void;
  visible?: boolean;
}

export default function ListContainerOverlay({
  closeAction,
  visible,
}: ListContainerOverlayProps) {
  const opacity = useDerivedValue(() => {
    return withTiming(visible ? 1 : 0, { duration: 250 });
  });
  return (
    <AnimatedAppView
      style={[
        styles.container,
        { opacity, pointerEvents: visible ? "auto" : "none" },
      ]}
    >
      <AppIconButton
        icon="closeIcon"
        type="red"
        style={styles.closeButton}
        action={closeAction}
      />
      <ListContainer
        style={styles.listContainer}
        backgroundSrc={backgroundMap.overlay}
      />
    </AnimatedAppView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "flex-end",
    gap: FONT_BASE,
    paddingTop: FONT_BASE * 4.5,
    backgroundColor: theme.properties.darkerBackground,
  },
  closeButton: {
    marginRight: FONT_BASE,
  },
  listContainer: {
    borderTopLeftRadius: FONT_BASE,
    borderTopRightRadius: FONT_BASE,
    boxShadow: theme.properties.bigShadow,
    borderWidth: 1,
    borderColor: theme.properties.beigeBorder,
    overflow: "hidden",
  },
});
