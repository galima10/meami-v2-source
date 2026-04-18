import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import {
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  ImageBackground,
  type ImageSource,
} from "react-native";
import AppIcon from "../../primitives/AppIcon";
import AppIconButton from "../../atoms/buttons/AppIconButton";
import SorterSearchBar from "../../molecules/SorterSearchBar";
import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import { PropsWithChildren } from "react";
import { AppText } from "../../primitives/AppText";

interface ListContainerProps<T> {
  style?: StyleProp<ViewStyle> | object;
  backgroundSrc?: ImageSource;
  data: T[] | null;
  renderItem: ListRenderItem<T>;
}

export default function ListContainer<T>({
  style,
  backgroundSrc,
  data,
  renderItem,
}: ListContainerProps<T>) {
  return (
    <ImageBackground
      style={[styles.container, style]}
      resizeMode="cover"
      source={backgroundSrc}
    >
      <SorterSearchBar />
      {data ? (
        <FlashList data={data ?? []} renderItem={renderItem} />
      ) : (
        <AppText style={styles.emptyMessage}>
          Il n'y a aucun élément entré
        </AppText>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.properties.beige,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: FONT_BASE * 2,
    fontWeight: theme.properties.medium,
  },
});
