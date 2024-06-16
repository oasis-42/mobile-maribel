import { PaperProvider, Text } from "react-native-paper";
import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import DefaultCard from "../../components/DefaultCard";
import { useRouter } from 'expo-router';

export default function Schedule() {
  const router = useRouter();
  const { width } = useWindowDimensions();


  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "flex-start", flex: 1, }}>
        
        <View style={{ alignItems: "center", justifyContent: "flex-start", width: "100%"}}>
          
          <DefaultCard
            title="João SIlva"
          >
            <Text variant="bodyMedium">Você é dedicado</Text>
          </DefaultCard>
          <DefaultCard
            title="AGENDA"
          >
            <Text variant="bodyMedium">AGENDA</Text>
          </DefaultCard>
          
          <DefaultButton 
            mode="contained" 
            onPress={() => router.push('/screens/onboardings/onBoarding1')}
            style={{ marginTop: 32 }}
          >
            Avaliar redação
          </DefaultButton>
          
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
