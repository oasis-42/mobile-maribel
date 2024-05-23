import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export function Development({
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
          Desenvolvimento
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
        <Pressable onPress={() => setCompositionStage("introduction")}>
          <Text style={{ fontWeight: "700", color: "#044884" }}>Voltar</Text>
        </Pressable>
        <Pressable onPress={() => setCompositionStage("conclusion")}>
          <Text style={{ fontWeight: "700", color: "#044884" }}>Avançar</Text>
        </Pressable>
      </View>
    </>
  );
}
 