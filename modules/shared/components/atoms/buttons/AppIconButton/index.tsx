import {
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import AppIcon from "@modules/shared/components/primitives/AppIcon";
import { AppText } from "@modules/shared/components/primitives/AppText";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";
import type { IconName } from "@modules/shared/hooks/primitives/useAppIcon";
import { useState } from "react";

interface AppIconButtonProps {
  style?: StyleProp<ViewStyle> | object;
  icon?: IconName;
  type?: "green" | "red" | "outlineRed" | "outlineGreen" | "today";
  action?: () => void;
  size?: number;
}

export default function AppIconButton({
  style,
  icon,
  type,
  action,
  size,
}: AppIconButtonProps) {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  return (
    <Pressable
      onPress={() => action?.()}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.button,
        type &&
          (type === "green"
            ? styles.green
            : (type === "red" || type === "today") && styles.red),
        isPressed &&
          (type === "green"
            ? styles.greenActive
            : (type === "red" || type === "today") && styles.redActive),
        {
          width: !size ? FONT_BASE * 3 : size,
          height: !size ? FONT_BASE * 3 : size,
        },

        style,
      ]}
    >
      {type === "today" ? (
        <AppText style={styles.text}>Ajd</AppText>
      ) : (
        icon && (
          <AppIcon
            name={icon}
            color={
              type !== "outlineRed" && type !== "outlineGreen"
                ? theme.properties.beige
                : isPressed
                  ? type === "outlineRed"
                    ? theme.properties.lightRed
                    : theme.properties.lightGreen
                  : type === "outlineRed"
                    ? theme.properties.darkRed
                    : theme.properties.darkGreen
            }
            size={
              !size
                ? type === "outlineRed"
                  ? FONT_BASE * 2.75
                  : FONT_BASE * 1.75
                : size - FONT_BASE * 0.25
            }
          />
        )
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  red: {
    borderWidth: 1,
    borderColor: theme.properties.redBorder,
    backgroundColor: theme.properties.darkRed,
    boxShadow: theme.properties.littleShadow,
    borderRadius: FONT_BASE * 0.75,
  },
  green: {
    borderWidth: 1,
    borderColor: theme.properties.greenBorder,
    backgroundColor: theme.properties.darkGreen,
    boxShadow: theme.properties.littleShadow,
    borderRadius: FONT_BASE * 0.75,
  },
  redActive: {
    borderColor: theme.properties.lightRedBorder,
    backgroundColor: theme.properties.lightRed,
  },
  greenActive: {
    borderColor: theme.properties.lightGreenBorder,
    backgroundColor: theme.properties.lightGreen,
  },
  text: {
    fontWeight: theme.properties.bold,
    color: theme.properties.beige,
  },
});
