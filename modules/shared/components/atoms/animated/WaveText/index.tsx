import { AnimatedAppText } from "../../appElements/AppText";
import { useWaveText } from "@modules/shared/hooks/atoms/animated/useWaveText";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
  View,
} from "react-native";
import { AppTextStyleType } from "@utils/appElements/AppTextStyleType";

type WaveTextProps = TextProps & {
  text: string;
  style?: AppTextStyleType;
};

export default function WaveText({ text, style, ...rest }: WaveTextProps) {
  const words = text.split(/(\s+)/);

  return (
    <View style={styles.container}>
      {words.map((word, wordIndex) => {
        return (
          <View key={wordIndex} style={styles.wordContainer}>
            {word.split("").map((char, charIndex) => {
              const animatedStyle = useWaveText(charIndex + wordIndex * 3);
              return (
                <AnimatedAppText
                  key={charIndex}
                  {...rest}
                  style={[style, animatedStyle]}
                >
                  {char}
                </AnimatedAppText>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  wordContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },
});
