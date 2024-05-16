import { Card, PaperProvider } from "react-native-paper";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";

export default function OnBoarding1() {
  return (
    <PaperProvider>
      <ScrollView style={{ flexDirection: "column" }}>
        <Card
          style={{
            padding: 4,
            backgroundColor: "transparent",
            margin: 12,
            shadowColor: "transparent",
          }}
        >
          <Card.Content>
            <Text style={{ fontSize: 25, fontWeight: "700", color: "#2E3E4B" }}>
              Avalie suas redações
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#2E3E4B",
                textAlign: "justify",
                lineHeight: 24,
              }}
            >
              Faça as correções de suas redações do ENEM através da Maribel e
              tenha orientações imediatas.
            </Text>
          </Card.Content>
        </Card>
        <View style={{ alignItems: "center" }}>
          <Image source={require("../../../../assets/processImg.png")} />
        </View>
        <View
          style={{
            marginTop: 12,
            gap: 14,
            padding: 10,
          }}
        >
          <Link href={"./onBoarding2"} asChild>
            <Pressable
              style={{
                backgroundColor: "#044884",
                width: "auto",
                height: 56,
                flex: 1,
                justifyContent: "center",
                padding: 8,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Continuar
              </Text>
            </Pressable>
          </Link>
<<<<<<< HEAD:src/app/onBoarding1.tsx
          <Pressable
            onPress={() => alert("Ola!")}
            style={{
              flex: 1,
              alignItems: "center",
              padding: 8,
            }}
          >
            <Text style={{ fontWeight: "600", textAlign: "center" }}>
              Pular
            </Text>
          </Pressable>
=======
>>>>>>> e6a83eb37b98e8b6f950c41f559065dd76e15963:src/app/screens/onboardings/onBoarding1.tsx
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
