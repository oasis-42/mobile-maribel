import { Stack } from "expo-router";

// const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Maribel",
        headerTintColor: "#044884",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: "700",
        },
      }}
    />
  );
}
