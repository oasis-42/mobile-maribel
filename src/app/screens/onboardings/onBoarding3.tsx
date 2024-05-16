import { Link } from "expo-router";
<<<<<<< HEAD
import {  View, Pressable, Text, ScrollView} from "react-native";
import { PaperProvider }  from "react-native-paper";
=======
import { Pressable, ScrollView, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
>>>>>>> e6a83eb37b98e8b6f950c41f559065dd76e15963

export default function OnBoarding3() {
  return (
    <PaperProvider>
<<<<<<< HEAD
      <ScrollView>
      <View
      style={{
        marginTop: 12,
        gap: 14,
        padding: 10,
      }
    }>

        <Link href={"/screens/thmscreen/thmSelect"} asChild>
=======
      <ScrollView style={{ flexDirection: "column" }}>
        <View style={{ gap: 14, padding: 10 }}>
          <Text>OnBoarding3</Text>
          <Link href={"./evaluatedComposition"} asChild>
>>>>>>> e6a83eb37b98e8b6f950c41f559065dd76e15963
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
<<<<<<< HEAD
               Continuar 
              </Text>
            </Pressable>
          </Link>
      </View>
=======
                Continuar
              </Text>
            </Pressable>
          </Link>
        </View>
>>>>>>> e6a83eb37b98e8b6f950c41f559065dd76e15963
      </ScrollView>
    </PaperProvider>
  );
}
