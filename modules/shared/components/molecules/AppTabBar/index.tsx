import { FONT_BASE } from "@constants/general";
import theme from "@constants/themes";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import TabButton from "../../atoms/buttons/TabButton";
import type { IconName } from "@modules/shared/hooks/primitives/useAppIcon";
import { useRouter, usePathname, type Href } from "expo-router";
import { TAB_ROUTES } from "@constants/mappings/routes";
import type { TabKey } from "@app-types/TabKey";

export default function AppTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          height: FONT_BASE * 5.5 + insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const routeName = route.name as TabKey;
        const isFocused = pathname.startsWith(TAB_ROUTES[routeName]);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            router.replace(TAB_ROUTES[routeName] as Href);
          }
        };

        const label = descriptors[route.key].options.title ?? route.name;

        return (
          <TabButton
            key={`buttonTab-${index}`}
            isFocused={isFocused}
            text={label}
            onPress={onPress}
            icon={route.name as IconName}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.properties.beige,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: FONT_BASE,
    boxShadow: theme.properties.bigShadow,
    borderTopWidth: 1,
    borderColor: theme.properties.beigeBorder,
  },
});
