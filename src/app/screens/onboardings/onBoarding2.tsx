import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Card, PaperProvider } from "react-native-paper";

export default function OnBoarding2() {
  return (
    <PaperProvider>
      <ScrollView style={{ flexDirection: "column" }}>
        <View style={{ marginTop: 12, gap: 14, padding: 10 }}>
          <Text style={{ fontWeight: "700", fontSize: 25 }}>
            Personalize sua evolução
          </Text>
          <Text style={{ fontWeight: "600" }}>
            Entenda quais formas de avaliação melhor se encaixam em seus estudos
          </Text>
          <Card style={{ borderColor: "#D7D7D7" }}>
            <Card.Title
              title="Avaliação guiada"
              titleStyle={{ fontWeight: "700", fontSize: 20 }}
            />
            <Card.Content>
              <Text style={{ fontWeight: "400", fontSize: 12 }}>
                Faça a sua avaliação com maior assertividade ao seguir nossos
                temas e instruções predefinidos.
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ borderColor: "#D7D7D7" }}>
            <Card.Title
              title="Avaliação adaptativa"
              titleStyle={{ fontWeight: "700", fontSize: 20 }}
            />
            <Card.Content>
              <Text style={{ fontWeight: "400", fontSize: 12 }}>
                Faça a sua avaliação com novas percepções ao deixar a
                inteligência artificial sem instruções.
              </Text>
            </Card.Content>
          </Card>
          <Link href={"./onBoarding3"} asChild>
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
        </View>
      </ScrollView>
    </PaperProvider>
  );
}