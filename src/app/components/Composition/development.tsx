import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export function Development({ setCompositionStage }: CompositionStageProps) {
  return (
    <>
      <ScrollView
        style={{
          flexDirection: "column",
          borderWidth: 1,
          paddingHorizontal: 8,
          paddingVertical: 14,
          backgroundColor: "white",
          gap: 10,
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 12 }}>
          Desenvolvimento
        </Text>
        <Text>
          Figma ipsum component variant main layer. Strikethrough align content
          line figjam shadow comment create move. Thumbnail flatten polygon
          bullet edit outline vector object clip asset. Layout union underline
          pencil link flatten list. Comment selection frame italic arrange main
          text. Ipsum export auto flatten share. Team figma invite ipsum
          horizontal. Figma rectangle subtract pencil ipsum layout ipsum editor
          component horizontal. Align inspect edit bold ipsum draft boolean.
          Opacity draft team duplicate slice device. Underline image boolean
          ellipse library. Mask outline group stroke thumbnail community
          subtract strikethrough line. Frame ellipse pixel thumbnail font. Flows
          pencil duplicate thumbnail.
        </Text>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          paddingHorizontal: 8,
          paddingVertical: 14,
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
