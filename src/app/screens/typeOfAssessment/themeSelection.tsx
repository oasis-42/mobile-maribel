import React, { useState } from 'react';
import { PaperProvider, Text } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import ThemeSelectionCard from "../../components/ThemeSelectionCard";
import { useRouter } from 'expo-router';

export default function ThemeSelection() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const themes = {
    "2022": "Impactos da pandemia na educação",
    "2021": "Desafios da saúde pública no Brasil",
    "2020": "O estigma associado às doenças mentais na sociedade brasileira",
    "2019": "Manipulação do comportamento do usuário pelo controle de dados na internet",
    "2018": "Formação educacional de surdos no Brasil",
    "2017": "Desafios para a formação educacional de surdos no Brasil",
    "2016": "Caminhos para combater a intolerância religiosa no Brasil",
    "2015": "A persistência da violência contra a mulher na sociedade brasileira",
    "2014": "Publicidade infantil em questão no Brasil",
    "2013": "Efeitos da implantação da Lei Seca no Brasil",
    "2012": "Movimento imigratório para o Brasil no século XXI",
    "2011": "Viver em rede no século XXI: os limites entre o público e o privado",
    "2010": "O trabalho na construção da dignidade humana",
    "2009": "O indivíduo frente à ética nacional",
    "2008": "Como preservar a floresta Amazônica",
    "2007": "O desafio de se conviver com as diferenças",
    "2006": "O poder de transformação da leitura"
  };

  const handleCardPress = (year: string) => {
    setSelectedYear(year);
  };

  const handleContinuePress = async () => {
    if (selectedYear) {
      try {
        const response = await fetch('YOUR_API_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedYear }),
        });
        const data = await response.json();
        console.log('Success:', data);
        router.push('/screens/onboardings/onBoarding3');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Por favor, selecione um tema.');
    }
  };

  const renderThemeCards = () => {
    return Object.entries(themes)
      .sort(([year1], [year2]) => parseInt(year2) - parseInt(year1))
      .map(([year, theme]) => (
        <ThemeSelectionCard
          key={year}
          year={year}
          isSelected={selectedYear === year}
          onPress={() => handleCardPress(year)}
        >
          {theme}
        </ThemeSelectionCard>
      ));
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text
              variant="titleSmall"
              style={styles.headerText}
            >
              Selecione o tema da redação
            </Text>
          </View>
          <View style={styles.cardsContainer}>
            {renderThemeCards()}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <DefaultButton 
            mode="contained"
            onPress={handleContinuePress}
            style={styles.continueButton}
            disabled={!selectedYear}
            labelStyle={!selectedYear ? { color: "#fff" } : undefined}
          >
            Continuar
          </DefaultButton>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 16,
    backgroundColor: "#F3F3F3"
  },
  headerContainer: {
    width: "100%",
    paddingLeft: 16,
    paddingBottom: 8,
    paddingTop: 8,
    
  },
  headerText: {
    fontWeight: "600",
    color: "#2E3E4B",
    textAlign: "left",
    lineHeight: 24,
  },
  cardsContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 80, 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#D7D7D7',
  },
  continueButton: {
    marginTop: 0,
  }
});
