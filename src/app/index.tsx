import React from "react";
import { useWindowDimensions, View, Image, ScrollView } from "react-native";
import DefaultButton from "./components/DefaultButton";
import { PaperProvider, Text } from "react-native-paper";
import { useRouter } from 'expo-router';
import helloUser from "../../assets/userAuth/helloUser.png";

export default function App() {
  const router = useRouter();

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "#fff" }}>
        <View style={{ alignItems: "center", justifyContent: "flex-start", flex: 1 }}>
          <Image source={helloUser} style={{ width: 250, height: 250, marginTop: 80, marginBottom: 16 }} />
          <Text variant="headlineLarge" style={{ color: "#2E3E4B", marginBottom: 4, fontWeight: "700" }}>Olá, estudante!</Text>
          <Text variant="titleMedium" style={{ color: "#2E3E4B", marginBottom: 26, fontWeight: "600" }}>Como deseja acessar?</Text>
          
          <DefaultButton 
            icon="google" 
            mode="contained" 
            onPress={() => router.push('/screens/onboardings/onBoarding1')}
          >
            Acessar usando o Google
          </DefaultButton>
        
          <DefaultButton 
            mode="outlined" 
            style={{ borderColor: "#D7D7D7"}}
            labelStyle={{ color: "#2E3E4B" }}
            onPress={() => router.push('/screens/camera/cameraScreen')}
          >
            Outras opções 
          </DefaultButton>
        
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
