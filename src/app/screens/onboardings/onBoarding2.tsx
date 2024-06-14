import { PaperProvider, Text } from "react-native-paper";
import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import DefaultCard from "../../components/DefaultCard";
import { useRouter } from 'expo-router';

export default function OnBoarding1() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.9272; // 92.72% of the screen width

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "flex-start", flex: 1, backgroundColor: "#fff" }}>
        <View style={{ alignItems: "flex-start", justifyContent: "flex-start", width: "100%", padding: 16 }}>
          
          <Text variant="headlineSmall" style={{ color: "#2E3E4B", marginBottom: 4, fontWeight: "700" }}>
            Personalize sua evolução
          </Text>
          <Text
            variant="titleSmall"
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#2E3E4B",
              textAlign: "left",
              lineHeight: 24,
              marginBottom: 16,
            }}
          >
            Entenda quais formas de avaliação melhor se encaixam em seus estudos
          </Text>
          
        </View>
        <View style={{ alignItems: "center", justifyContent: "flex-start", width: "100%"}}>
          
          <DefaultCard
            title="Avaliação guiada"
          >
            <Text variant="bodyMedium">Faça a sua avaliação com maior assertividade ao seguir nossos temas e instruções predefinidos</Text>
          </DefaultCard>
          <DefaultCard
            title="Avaliação adaptativa"
          >
            <Text variant="bodyMedium">Faça a sua avaliação com novas percepções ao deixar a inteligência artificial sem instruções</Text>
          </DefaultCard>
          
          <DefaultButton 
            mode="contained" 
            onPress={() => router.push('/screens/onboardings/onBoarding3')}
            style={{ marginTop: 32 }}
          >
            Continuar
          </DefaultButton>
          
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
