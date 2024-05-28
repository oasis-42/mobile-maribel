import { Pressable, ScrollView, Text, TextInput, View } from "react-native"; 

export function Conclusion({
  essayData,
  setCompositionStage,
}: CompositionStageProps) {
  return (
    <>
      <ScrollView
        style={{
          flexDirection: "column",
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#D7D7D7",
          paddingHorizontal: 8,
          paddingVertical: 14,
          backgroundColor: "white",
          gap: 10,
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 12 }}>
          Conclusão
        </Text>
        <Text>{essayData}</Text>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#D7D7D7",
          paddingHorizontal: 8,
          paddingVertical: 14,
          backgroundColor: "white",
        }}
      >
        <Pressable onPress={() => setCompositionStage("development")}>
          <Text style={{ fontWeight: "700", color: "#044884" }}>Voltar</Text>
        </Pressable>
        <Pressable disabled style={{ opacity: 0.5 }}>
          <Text style={{ fontWeight: "700", color: "#044884" }}>Avançar</Text>
        </Pressable>
      </View>
    </>
  );
}
 