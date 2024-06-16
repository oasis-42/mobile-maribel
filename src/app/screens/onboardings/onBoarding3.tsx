import React, { useState } from 'react';
import { PaperProvider, Text } from 'react-native-paper';
import { Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import DefaultButton from '../../components/DefaultButton';
import DefaultCard from '../../components/DefaultCard';
import { useRouter } from 'expo-router';

export default function OnBoarding1() {
  const router = useRouter();

  // Estado para os Switches
  const [isSwitchOn1, setIsSwitchOn1] = useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = useState(false);
  const [isSwitchOn3, setIsSwitchOn3] = useState(false);

  return (
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
          <DefaultCard
            title="Gerar pontuação"
            showSwitch={true}
            switchValue={isSwitchOn1}
            onSwitchChange={() => setIsSwitchOn1(!isSwitchOn1)}
          >
            Permita que a inteligência artificial gere uma provável nota referente a redação
          </DefaultCard>
          <DefaultCard
            title="Correção expandida"
            style={{ height: 128 }}
            showSwitch={true}
            switchValue={isSwitchOn2}
            onSwitchChange={() => setIsSwitchOn2(!isSwitchOn2)}
          >
            Permita que a inteligência artificial tenha considerações extras, mas com uma taxa de assertividade menor
          </DefaultCard>
          <DefaultCard
            title="Permitir notificação"
            showSwitch={true}
            switchValue={isSwitchOn3}
            onSwitchChange={() => setIsSwitchOn3(!isSwitchOn3)}
          >
            Receba lembretes com base em sua rotina de estudos no app
          </DefaultCard>

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
  );
}
