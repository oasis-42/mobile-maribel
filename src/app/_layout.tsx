import { Stack, useRouter } from "expo-router";
import { PaperProvider, IconButton } from "react-native-paper";
import AppContext from "./contexts/AppContext";
import { useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RootLayout() {
  const [base64Image, setBase64Image] = useState();
  const [text, setText] = useState();
  const [feedback, setFeedback] = useState();
  const router = useRouter();

  return (
    <AppContext.Provider value={{ 
      base64Image, 
      setBase64Image, 
      text, 
      setText,
      feedback, 
      setFeedback
    }}>
      
      <PaperProvider>
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
              headerShadowVisible: false,
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
            name="screens/home/schedule"
            options={{
              title: "Maribel",
              headerTitleAlign: "center",
              headerTintColor: "#044884",
              headerTitleStyle: {
                fontSize: 30,
                fontWeight: "700",
              },
              headerLeft: () => null, 
              gestureEnabled: false, 
              headerBackVisible: false, 
              headerRight: () => (
                <IconButton 
                  icon={({ size, color }) => (
                    <MaterialCommunityIcons name="cog" size={size} color="#044884" />
                  )}
                  onPress={() => router.push('/screens/home/settings')}
                />
              ), 
            }}
          />
          <Stack.Screen
            name="screens/themeSelection/themeSelection"
            options={{ title: "Oi", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="screens/onboardings/evaluatedComposition"
            options={{ title: "Redação avaliada", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="screens/feedbackscreen/feedBackScreen"
            options={{ title: "Redação avaliada", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="screens/camera/cameraScreen"
            options={{ title: "Camera", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="screens/avaliacaoGuiada/confirmandoFoto/ConfirmandoFoto"
            options={{ title: "Confirmando Foto", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="screens/avaliacaoGuiada/confirmandoTexto/ConfirmandoTexto"
            options={{ title: "Confirmando Texto", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="screens/home/settings"
            options={{ title: "Configurações", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="screens/typeOfAssessment/themeSelection"
            options={{ title: "Criando avaliação", headerTitleAlign: "center" }}
          />
        </Stack>
      </PaperProvider>
      
    </AppContext.Provider>
  );
}