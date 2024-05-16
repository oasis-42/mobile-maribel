import { Link } from "expo-router";
import { ScrollView, View, Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import Onboarding from 'react-native-onboarding-swiper';


export default function App() {
  return (
    <PaperProvider>
      <ScrollView>
        <View>
          <Text>Tela de Login</Text>
        </View>
        <Link href={"./onBoarding1"}>Ir para onBoarding</Link>
      </ScrollView>
    </PaperProvider>
  );
}
