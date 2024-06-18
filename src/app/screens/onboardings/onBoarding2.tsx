import { PaperProvider, Text } from "react-native-paper";
import { ScrollView, View, useWindowDimensions } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import DefaultCard from "../../components/DefaultCard";
import { useRouter } from 'expo-router';

export default function OnBoarding2() {
  const router = useRouter();
 
 

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
            style= {{ height: 136 }}
            title="Avaliação guiada"
          >
            <Text variant="bodyMedium">Faça a sua avaliação com maior assertividade ao seguir nossos temas e instruções predefinidos</Text>
          </DefaultCard>
          <DefaultCard
            style= {{ height: 136 }}
            title="Avaliação adaptativa"
          >
            <Text variant="bodyMedium">Faça a sua avaliação com novas percepções ao deixar a inteligência artificial sem instruções</Text>
          </DefaultCard>
          
          <DefaultButton 
          
            mode="contained" 
            onPress={() => router.push('/screens/onboardings/onBoarding3')}
            style={{ marginTop: 32}}
          >
            Continuar
          </DefaultButton>
          
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
