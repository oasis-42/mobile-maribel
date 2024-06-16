import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import SettingsCard from '../../components/userSettings/SettingsCard';

export default function HomeScreen() {
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({
    1: false,
    2: false,
    3: false,
    // Adicione mais estados de switch conforme necessário
  });

  const handleSwitchChange = (id: string, value: boolean) => {
    setSwitchStates(prevState => ({
      ...prevState,
      [id]: value,
    }));
    // Aqui você pode adicionar lógica adicional, se necessário
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "flex-start", flex: 1 }}>
      <SettingsCard
        id="1"
        title="Gerar pontuação"
        showSwitch={true}
        switchValue={switchStates["1"]}
        onSwitchChange={(value) => handleSwitchChange("1", value)}
      >
        <Text>Permita que a inteligência artificial gere uma provável nota referente à redação.</Text>
      </SettingsCard>
      <SettingsCard
        id="2"
        title="Correção expandida"
        showSwitch={true}
        switchValue={switchStates["2"]}
        onSwitchChange={(value) => handleSwitchChange("2", value)}
      >
        <Text>Permita que a inteligência artificial tenha considerações extras, mas com uma taxa de assertividade menor.</Text>
      </SettingsCard>
      <SettingsCard
        id="3"
        title="Permitir notificação"
        showSwitch={true}
        switchValue={switchStates["3"]}
        onSwitchChange={(value) => handleSwitchChange("3", value)}
      >
        <Text>Receba lembretes com base em sua rotina de estudos no app.</Text>
      </SettingsCard>
    </ScrollView>
  );
}
