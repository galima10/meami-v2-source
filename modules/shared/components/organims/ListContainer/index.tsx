import { FlashList } from "@shopify/flash-list";
import {
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  ImageBackground,
  type ImageSource
} from "react-native";
import AppIcon from "../../primitives/AppIcon";
import AppIconButton from "../../atoms/buttons/AppIconButton";
import SorterSearchBar from "../../molecules/SorterSearchBar";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import { PropsWithChildren } from "react";

interface ListContainer extends PropsWithChildren {
  style?: StyleProp<ViewStyle> | object;
  backgroundSrc?: ImageSource;
}

export default function ListContainer({
  children,
  style,
  backgroundSrc,
}: ListContainer) {
  return (
    <ImageBackground
      style={[styles.container, style]}
      resizeMode="cover"
      source={backgroundSrc}
    >
      <SorterSearchBar />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.properties.beige,
  },
});
