import { PaperProvider, Text } from "react-native-paper";
import { Image, Pressable, ScrollView, View } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import { useRouter } from "expo-router";


export default function OnBoarding1() {
  const router = useRouter();

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "flex-start", flex: 1, backgroundColor: "#fff" }}>
        <View style={{ alignItems: "flex-start", justifyContent: "flex-start", width: "100%", padding: 16 }}>
          
          <Text variant="headlineSmall" style={{ color: "#2E3E4B", marginBottom: 4, fontWeight: "700" }}>
            Avalie suas redações
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
            Faça as correções de suas redações do ENEM através da Maribel e tenha orientações imediatas.
          </Text>
          
        </View>
        <View style={{ alignItems: "center", justifyContent: "flex-start", width: "100%", marginTop: 32}}>
          
          <Image style={{ width: 50, height: 300, marginBottom: 40 }} source={require("../../../../assets/processImg.png")} />
          
          <DefaultButton 
            mode="contained" 
            onPress={() => router.push('/screens/onboardings/onBoarding2')}
            style={{ marginBottom: 16 }}
          >
            Continuar
          </DefaultButton>
          
          <Pressable
            onPress={() => router.push('/screens/home/schedule')}
            style={{
              alignItems: "center",
              padding: 8,
            }}
          >
            <Text style={{ fontWeight: "600", textAlign: "center" }}>
              Pular
            </Text>
          </Pressable>
          
        </View>
      </ScrollView>
    </PaperProvider>
  );
}