import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Introduction } from "../../components/Composition/introduction";
import { Development } from "../../components/Composition/development";
import { Conclusion } from "../../components/Composition/conclusion";

export default function EvaluatedComposition() {
  const [compositionStage, setCompositionStage] = useState<
    "introduction" | "development" | "conclusion"
  >("introduction");

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
          <Introduction
            onCompositionStage={() => setCompositionStage("development")}
          />
        )}
        {compositionStage === "development" && (
          <Development
            onCompositionStage={() => setCompositionStage("conclusion")}
          />
        )}
        {compositionStage === "conclusion" && (
          <Conclusion
            onCompositionStage={() => setCompositionStage("development")}
          />
        )}
        <View style={{ flexDirection: "column", gap: 14 }}>
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
