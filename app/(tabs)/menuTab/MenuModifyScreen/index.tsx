import { FONT_BASE } from "@constants/general";
import { DAYS } from "@constants/mappings/orders/daysOrder";
import { typography } from "@constants/styles";
import theme from "@constants/themes";
import { getScreenWidth } from "@core/getScreenDimensions";
import DayNavigationDots from "@modules/menuTab/components/molecules/DayNavigationDots";
import MenuModifyContent from "@modules/menuTab/components/molecules/MenuModifyContent";
import DayCardCalendarEdit from "@modules/menuTab/components/organisms/DayCardCalendarEdit";
import MenuUnitsPanel from "@modules/menuTab/components/organisms/MenuUnitsPanel";
import ListContainerOverlay from "@modules/shared/components/organims/ListContainerOverlay";
import { AppText } from "@modules/shared/components/primitives/AppText";
import { useMenuModifyScreen } from "@modules/shared/hooks/screens/menuTab/useMenuModifyScreen";
import type { Ingredient } from "@stores/features/ingredients";
import type { Recipe } from "@stores/features/recipes";
import { ScrollView, StyleSheet, View } from "react-native";

type ListItem =
  | { id: string; type: "ingredient"; ingredient: Ingredient }
  | { id: string; type: "recipe"; recipe: Recipe };

export default function MenuModifyScreen() {
  const {
    setIsPanelOpen,
    isPanelOpen,
    setActualElements,
    filteredElements,
    setIsUnitsPanelOpen,
    isUnitsPanelOpen,
    setSelectedIngredient,
    selectedIngredient,
    selectedMoment,
    setSelectedMoment,
    scrollRef,
    currentIndex,
    todayIndex,
    setCurrentIndex,
    menuSchedule,
    getActualMenu,
    goToSlideDay,
    actualDayMoment,
  } = useMenuModifyScreen();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={scrollRef}
        directionalLockEnabled
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const currentOffset = currentIndex * getScreenWidth();
          const diff = offsetX - currentOffset;

          const threshold = getScreenWidth() * 0.9;

          let newIndex = currentIndex;

          if (Math.abs(diff) > threshold) {
            newIndex = diff > 0 ? currentIndex + 1 : currentIndex - 1;
          }

          if (newIndex === currentIndex) return;

          setCurrentIndex(newIndex !== todayIndex ? newIndex : todayIndex);
          setSelectedMoment(1);

          scrollRef.current?.scrollTo({
            x: newIndex * getScreenWidth(),
            animated: true,
          });
        }}
      >
        {DAYS.map((dayId) => {
          return (
            <DayCardCalendarEdit
              key={dayId}
              dayId={dayId}
              setSelectedMoment={setSelectedMoment}
              selectedMoment={selectedMoment}
              actualDayMoment={actualDayMoment}
              setActualElements={setActualElements}
              setIsPanelOpen={setIsPanelOpen}
              setIsUnitsPanelOpen={setIsUnitsPanelOpen}
              setSelectedIngredient={setSelectedIngredient}
              menuSchedule={menuSchedule}
            />
          );
        })}
      </ScrollView>
      <View style={styles.dotsContainer}>
        <DayNavigationDots currentIndex={currentIndex} action={goToSlideDay} />
      </View>
      <ListContainerOverlay
        visible={isPanelOpen}
        closeAction={() => {
          setIsPanelOpen(false);
        }}
        data={filteredElements}
        renderItem={({ item }: { item: ListItem }) => {
          if (item.type === "ingredient")
            return <AppText>{item.ingredient.name}</AppText>;
          else return <AppText>{item.recipe.name}</AppText>;
        }}
      />
      <MenuUnitsPanel
        visible={isUnitsPanelOpen}
        setVisible={setIsUnitsPanelOpen}
        selectedIngredient={selectedIngredient}
        setSelectedIngredient={setSelectedIngredient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: theme.properties.beige,
  },
  text: {
    fontSize: typography.h4,
    fontWeight: theme.properties.bold,
  },
  todayButton: {
    position: "absolute",
    bottom: FONT_BASE * 3,
    left: FONT_BASE * 1.15,
  },
  dotsContainer: {
    position: "absolute",
    bottom: FONT_BASE,
    width: "100%",
    alignItems: "center",
  },
});
