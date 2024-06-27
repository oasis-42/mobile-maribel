import { PaperProvider, Text } from "react-native-paper";
import { ScrollView, View, useWindowDimensions } from "react-native";
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
            title="Agenda"
          >
            <Text variant="bodyMedium">Agenda vazia</Text>
          </DefaultCard>
          <DefaultCard
            title="Histórico"
          >
            <Text variant="bodyMedium">Histórico vazio</Text>
          </DefaultCard>
          
          <DefaultButton 
            mode="contained" 
            onPress={() => router.push('/screens/typeOfAssessment/themeSelection')}
            style={{ marginTop: 32 }}
          >
            Avaliar redação
          </DefaultButton>
          
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
