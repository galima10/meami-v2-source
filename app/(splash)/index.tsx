import { View, StyleSheet, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash Screen</Text>
      <Pressable
        onPress={() => router.replace("/(tabs)/menuTab/MenuCalendarScreen")}
      >
        <Text style={styles.button}>Sortir du splash screen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    fontSize: 24,
  },
});
