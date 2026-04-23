import {
  TextInput,
  StyleSheet,
  type KeyboardTypeOptions,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import { typography } from "@constants/styles";

interface AppInputProps {
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string) => void;
  value?: string;
  maxLength?: number;
  selection?: {
    start: number;
    end?: number | undefined;
  };
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle> | object;
  rounded?: boolean;
}

export default function AppInput({
  keyboardType = "default",
  onChangeText,
  value,
  maxLength,
  selection,
  onBlur,
  onSubmitEditing,
  placeholder,
  style,
  rounded,
}: AppInputProps) {
  return (
    <TextInput
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
      maxLength={maxLength}
      selection={selection}
      onBlur={onBlur}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      placeholderTextColor={theme.properties.transparentBrown}
      style={[
        styles.input,
        rounded
          ? { borderRadius: FONT_BASE }
          : { borderRadius: FONT_BASE * 0.5 },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: typography.body,
    color: theme.properties.brown,
    lineHeight: typography.body,
    borderColor: theme.properties.whiteBorder,
    backgroundColor: theme.properties.white,
    borderWidth: 0.5,
    textAlignVertical: "center",
    boxShadow: theme.properties.littleShadow,
    paddingVertical: 0,
    fontFamily: "SN",
  },
});
