
import { PaperProvider, Text } from 'react-native-paper';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import DefaultButton from '../../components/DefaultButton';
import SettingsCard from '../../components/userSettings/SettingsCard';
import { SwitchProvider } from '../../contexts/SwitchContext';
import { useRouter } from 'expo-router';

export default function OnBoarding3() {
  const router = useRouter();



  return (
    <SwitchProvider>
      <PaperProvider>
        <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, backgroundColor: '#fff' }}>
          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%', padding: 16 }}>
            <Text variant="headlineSmall" style={{ color: '#2E3E4B', marginBottom: 4, fontWeight: '700' }}>
              Acompanhe sua evolução
            </Text>
            <Text
              variant="titleSmall"
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#2E3E4B',
                textAlign: 'left',
                lineHeight: 24,
                marginBottom: 16,
              }}
            >
              Defina as informações que deseja receber conforme sua evolução é registrada.
            </Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
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
              mode="contained"
              onPress={() => router.push('/screens/home/schedule')}
              style={{ marginTop: 32 }}
            >
              Continuar
            </DefaultButton>

          </View>
        </ScrollView>
      </PaperProvider>
    </SwitchProvider>
  );
}
