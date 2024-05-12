import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function OnBoarding3() {
  return (
    <PaperProvider>
      <ScrollView style={{ flexDirection: "column" }}>
        <View style={{ gap: 14, padding: 10 }}>
          <Text>OnBoarding3</Text>
          <Link href={"./evaluatedComposition"} asChild>
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
