import { Pressable, StyleSheet, type ViewStyle, StyleProp } from "react-native";
import { AppText } from "@modules/shared/components/primitives/AppText";
import theme from "@constants/themes";
import { typography } from "@constants/styles";
import { FONT_BASE } from "@constants/general";
import { useState } from "react";

interface AppButtonProps {
  style?: StyleProp<ViewStyle>;
  action?: () => void;
  label: string;
  type?: "primary" | "secondary" | "tertiary";
  color?: "green" | "orange";
  big?: boolean;
}

export default function AppButton({
  style,
  action,
  label,
  type = "primary",
  color,
  big,
}: AppButtonProps) {
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <Pressable
      onPress={() => action?.()}
      style={[
        styles.button,
        styles[type],
        color && styles[color],
        pressed &&
          (type === "primary"
            ? color && styles[`${color}Active`]
            : styles[`${type}Active`]),
        style as object,
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <AppText
        style={[
          styles.label,
          type !== "primary" && styles[`${type}Label`],
          type !== "primary" && pressed && styles[`${type}LabelActive`],
          big && styles.bigLabel,
        ]}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    borderRadius: FONT_BASE * 0.75,
    borderWidth: 1,
    boxShadow: theme.properties.littleShadow,
    paddingHorizontal: FONT_BASE * 0.75,
    paddingVertical: FONT_BASE * 0.25,
  },
  green: {
    backgroundColor: theme.properties.darkGreen,
    borderColor: theme.properties.greenBorder,
  },
  orange: {
    backgroundColor: theme.properties.darkOrange,
    borderColor: theme.properties.orangeBorder,
  },
  secondary: {
    borderRadius: FONT_BASE * 0.75,
    borderColor: theme.properties.darkOrange,
    padding: FONT_BASE,
    borderWidth: 2.25,
    paddingHorizontal: FONT_BASE * 0.75 - 1.25,
    paddingVertical: FONT_BASE * 0.25 - 1.25,
  },
  tertiary: {
    paddingHorizontal: FONT_BASE * 0.75,
    paddingVertical: FONT_BASE * 0.25,
  },
  label: {
    fontSize: typography.small,
    color: theme.properties.beige,
    fontWeight: theme.properties.bold,
  },
  bigLabel: {
    fontSize: typography.body,
  },
  secondaryLabel: {
    color: theme.properties.darkOrange,
  },
  tertiaryLabel: {
    color: theme.properties.darkRed,
    paddingBottom: FONT_BASE * 0.1,
    borderBottomWidth: 1.5,
    borderColor: theme.properties.darkRed,
  },
  greenActive: {
    backgroundColor: theme.properties.lightGreen,
    borderColor: theme.properties.lightGreenBorder,
  },
  orangeActive: {
    backgroundColor: theme.properties.lightOrange,
    borderColor: theme.properties.lightOrangeBorder,
  },
  secondaryActive: {
    borderColor: theme.properties.lightOrange,
  },
  tertiaryActive: {
    borderColor: theme.properties.lightRed,
  },
  secondaryLabelActive: {
    color: theme.properties.lightOrange,
  },
  tertiaryLabelActive: {
    color: theme.properties.lightRed,
  },
});
