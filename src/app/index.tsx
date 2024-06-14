import React from "react";
import { useWindowDimensions, View, Image, ScrollView } from "react-native";
import { PaperProvider, Button, Text } from "react-native-paper";
import { useRouter } from 'expo-router';
import helloUser from "../../assets/userAuth/helloUser.png";

export default function App() {
  const { width } = useWindowDimensions();
  const buttonWidth = width * 0.9272; // 92.72% of the screen width
  const router = useRouter();

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "#fff" }}>
        <View style={{ alignItems: "center", justifyContent: "flex-start", flex: 1 }}>
          <Image source={helloUser} style={{ width: 250, height: 250, marginTop: 80, marginBottom: 16 }} />
          <Text variant="headlineLarge" style={{ color: "#2E3E4B", marginBottom: 4, fontWeight: "700" }}>Olá, estudante!</Text>
          <Text variant="titleMedium" style={{ color: "#2E3E4B", marginBottom: 36, fontWeight: "600" }}>Como deseja acessar?</Text>
          
          <Button 
            icon="google" 
            mode="contained" 
            style={{ marginBottom: 8, backgroundColor: "#044884", borderRadius: 5, height: 56, width: buttonWidth }}
            contentStyle={{ height: 56, justifyContent: 'center' }} // Ajuste aqui
            onPress={() => router.push('/screens/onboardings/onBoarding1')}
          >
            Acessar usando o Google
          </Button>
        
          <Button 
            mode="outlined" 
            style={{ borderColor: "#D7D7D7", borderRadius: 5, height: 56, width: buttonWidth, marginTop: 10 }}
            contentStyle={{ height: 56, justifyContent: 'center' }} // Ajuste aqui
            labelStyle={{ color: "#2E3E4B" }}
            onPress={() => router.push('/screens/camera/cameraScreen')}
          >
            Outras opções 
          </Button>
        
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
