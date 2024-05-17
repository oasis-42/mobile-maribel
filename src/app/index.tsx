import { Link } from "expo-router";
import { ScrollView, View, Text } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <ScrollView>
        <View>
          <Text>Tela de Login</Text>
        </View>
        <Link href={"/screens/onboardings/onBoarding1"}>
          Ir para onBoarding
        </Link>
      </ScrollView>
    </PaperProvider>
  );
}
