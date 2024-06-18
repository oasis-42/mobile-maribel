import React from 'react';
import { ScrollView, View } from 'react-native';
import SettingsCard from '../../components/userSettings/SettingsCard';
import DefaultButton from "../../components/DefaultButton";
import { PaperProvider, Text } from "react-native-paper";
import { SwitchProvider } from '../../contexts/SwitchContext';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();

  return (
    <SwitchProvider>
      <PaperProvider>
        <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "flex-start", flex: 1 }}>
          <View>
            <SettingsCard
              id="1"
              title="Gerar pontuação"
              showSwitch={true}
            >
              <Text>Permita que a inteligência artificial gere uma provável nota referente à redação.</Text>
            </SettingsCard>
            <SettingsCard
              id="2"
              title="Correção expandida"
              showSwitch={true}
            >
              <Text>Permita que a inteligência artificial tenha considerações extras, mas com uma taxa de assertividade menor.</Text>
            </SettingsCard>
            <SettingsCard
              id="3"
              title="Permitir notificação"
              showSwitch={true}
            >
              <Text>Receba lembretes com base em sua rotina de estudos no app.</Text>
            </SettingsCard>
            <DefaultButton 
              mode="outlined" 
              style={{ borderColor: "#D7D7D7", backgroundColor: "#fff", marginTop: 20 }}
              labelStyle={{ color: "#E75858" }}
              onPress={() => router.push('/')}
            >
              Sair
            </DefaultButton>
          </View>
        </ScrollView>
      </PaperProvider>
    </SwitchProvider>
  );
}
