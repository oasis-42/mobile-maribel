import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Maribel",
          headerTitleAlign: "center",
          headerTintColor: "#044884",
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "700",
          },
        }}
      />
      <Stack.Screen
        name="screens/onboardings/onBoarding1"
        options={{ title: "Etapa 1 de 3", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="screens/onboardings/onBoarding2"
        options={{ title: "Etapa 2 de 3", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="screens/onboardings/onBoarding3"
        options={{ title: "Etapa 3 de 3", headerTitleAlign: "center" }}
      />
      <Stack.Screen
<<<<<<< HEAD
        name="screens/thmScreen/thmSelect"
        options={{ title: "Oi", headerTitleAlign: "center" }}
=======
        name="screens/onboardings/evaluatedComposition"
        options={{ title: "Redação avaliada", headerTitleAlign: "center" }}
>>>>>>> e6a83eb37b98e8b6f950c41f559065dd76e15963
      />
    </Stack>
  );
}
