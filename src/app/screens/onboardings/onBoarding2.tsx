import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function OnBoarding2() {
  return (
    <PaperProvider>
      <ScrollView>
        <View
          style={{
            marginTop: 12,
            gap: 14,
            padding: 10,
          }
        }
        >
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
        </View>
      </ScrollView>
    </PaperProvider>
  );
}