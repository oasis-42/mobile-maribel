import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";
import { Pressable } from "react-native"

export default function ThemeSelect() {
    return(
        <PaperProvider>
            <ScrollView>
                <View style={{
        marginTop: 12,
        gap: 14,
        padding: 10,
      }}>
        <Link href={"/screens/feedbackscreen/feedBackScreen"} asChild>
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
    )
}