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

  const essay = {
    introduction:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    development:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    conclusion:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
            borderRadius: 5,
            borderColor: "#D7D7D7",
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 16 }}>Nota total</Text>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>678 pontos</Text>
        </View>
        {compositionStage === "introduction" && (
          <Introduction
            essayData={essay.introduction}
            setCompositionStage={setCompositionStage}
          />
        )}
        {compositionStage === "development" && (
          <Development
            essayData={essay.development}
            setCompositionStage={setCompositionStage}
          />
        )}
        {compositionStage === "conclusion" && (
          <Conclusion
            essayData={essay.conclusion}
            setCompositionStage={setCompositionStage}
          />
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
              borderRadius: 8,
              padding: 8,
              height: 56,
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
