import {
  View,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { AppText } from "../../primitives/AppText";
import theme from "@constants/themes";
import { FONT_BASE } from "@constants/general";
import { Dispatch, SetStateAction } from "react";
import { typography } from "@constants/styles";
import AppInput from "../../primitives/AppInput";

interface QuantifierModuleProps {
  addAction?: () => void;
  removeAction?: () => void;
  value: string;
  style?: StyleProp<ViewStyle>;
  onValidateEntry?: (value: number) => void;
  setQuantityState: Dispatch<SetStateAction<string>>;
  handleOnChange: (value: string) => void;
  normalize: (v: string) => string;
}

export default function QuantifierModule({
  addAction,
  removeAction,
  value,
  style,
  onValidateEntry,
  handleOnChange,
  setQuantityState,
  normalize,
}: QuantifierModuleProps) {
  function validateValue(raw: string) {
    const normalized = normalize(raw);
    const num = Number(normalized);

    const safe = raw === "" || isNaN(num) || num < 1 ? "1" : raw;

    setQuantityState(safe);
    onValidateEntry?.(Number(normalize(safe)));
  }
  return (
    <View style={[styles.container, style as object]}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonActive]}
        onPress={() => removeAction?.()}
      >
        <AppText>-</AppText>
      </Pressable>
      <AppInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleOnChange}
        value={value}
        maxLength={value.includes(".") ? 3 : 2}
        selection={{ start: value.length, end: value.length }}
        onBlur={() => validateValue(value)}
        onSubmitEditing={() => validateValue(value)}
      />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonActive]}
        onPress={() => addAction?.()}
      >
        <AppText>+</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: FONT_BASE * 0.5,
    height: FONT_BASE * 2.5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: FONT_BASE * 1.5,
    borderWidth: 1,
    boxShadow: theme.properties.littleShadow,
    backgroundColor: theme.properties.vibrantBeige,
    borderColor: theme.properties.vibrantBeigeBorder,
    borderRadius: FONT_BASE * 0.5,
  },
  labelButton: {
    fontWeight: theme.properties.bold,
  },
  buttonActive: {
    backgroundColor: theme.properties.beige,
    borderColor: theme.properties.beigeBorder,
  },
  input: {
    width: FONT_BASE * 2,
    height: "100%",
    textAlign: "center",
  },
});
