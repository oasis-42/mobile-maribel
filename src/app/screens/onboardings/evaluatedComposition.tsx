import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Introduction } from "../../components/Composition/Introduction";
import { Development } from "../../components/Composition/Development";
import { Conclusion } from "../../components/Composition/Conclusion";
import { Link } from "expo-router";

export default function EvaluatedComposition() {
  const [compositionStage, setCompositionStage] = useState<
    "introduction" | "development" | "conclusion"
  >("introduction");

  const fechtData = () => {
    fetch(
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    ).then((response) => {
      return response.json();
    });
  };

  return (
    <PaperProvider>
      <View
        style={{ flexDirection: "column", gap: 14, padding: 10, marginTop: 12 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 14,
            justifyContent: "space-between",
            borderWidth: 1,
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 16 }}>Nota total</Text>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>678 pontos</Text>
        </View>
        {compositionStage === "introduction" && (
          <Introduction setCompositionStage={setCompositionStage} />
        )}
        {compositionStage === "development" && (
          <Development setCompositionStage={setCompositionStage} />
        )}
        {compositionStage === "conclusion" && (
          <Conclusion setCompositionStage={setCompositionStage} />
        )}
        <View style={{ flexDirection: "column", gap: 14 }}>
          <Link href={"../feedbackscreen/feedBackScreen"} asChild>
            <Pressable
              style={{
                backgroundColor: "#044884",
                justifyContent: "center",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Competências avaliadas
              </Text>
            </Pressable>
          </Link>
          <Pressable
            style={{
              backgroundColor: "#044884",
              justifyContent: "center",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Salvar avaliação
            </Text>
          </Pressable>
        </View>
      </View>
    </PaperProvider>
  );
}
