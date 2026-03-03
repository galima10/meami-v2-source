import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash Screen</Text>
      <Pressable onPress={() => router.replace("/(tabs)/menuTab/MenuCalendarScreen")}>
        <Text>Test</Text>
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
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

// dans la console, pour supprimer node_modules et package-lock.json dans un terminal windows : rmdir /s /q node_modules && del package-lock.json
