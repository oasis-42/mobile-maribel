import React, { useState, useEffect } from 'react';
import { PaperProvider, Text, ActivityIndicator } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import ThemeSelectionCard from "../../components/ThemeSelectionCard";
import { useRouter } from 'expo-router';
import { fetchMockedData, sendMockedYear, ThemeData } from '../../../mocks/apiThemeSelection';

export default function ThemeSelection() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadMockedData = async () => {
      setIsLoading(true);
      const response = await fetchMockedData();
      if (response.success) {
        setThemes(response.data);
      }
      setIsLoading(false);
    };

    loadMockedData();
  }, []);

  const handleCardPress = (year: string) => {
    setSelectedYear(year);
  };

  const handleContinuePress = async () => {
    if (selectedYear) {
      try {
        const response = await sendMockedYear(selectedYear);
        if (response.success) {
          console.log('Success:', response);
          router.push({
            pathname: '/screens/typeOfAssessment/motivationalTexts',
            params: { year: selectedYear },
          });
        } else {
          console.error('Error: Failed to send year');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Por favor, selecione um tema.');
    }
  };

  const renderThemeCards = () => {
    return themes
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))
      .map(({ year, theme }) => (
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
        {isLoading ? (
          <ActivityIndicator size="large" color="#044884" style={styles.loadingIndicator} />
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.headerContainer}>
                <Text variant="titleSmall" style={styles.headerText}>
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
          </>
        )}
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
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
