import React, { useState, useEffect } from 'react';
import { PaperProvider, Text, ActivityIndicator } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import ThemeSelectionCard from "../../components/ThemeSelectionCard";
import { useRouter } from 'expo-router';
import apiClient from '../../../sdk/api';

const API_URL = 'https://www.maribel.cloud/api/themes';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5MTk2NjEyLCJpYXQiOjE3MTkxMTAyMTIsImp0aSI6ImYwYTAwZWQ3ODJlMzQ2ZTQ4MTkxMmNiMDhkZjAyNmUxIiwidXNlcl9pZCI6M30.AScWS68f8x3zpYtaOwAl6S032vYucMN5lGIQDdV6Qd4'; 

type ThemeData = {
  theme_id: number;
  title: string;
  year: number;
};

async function fetchData() {
  try {
    const response = await apiClient.get('/api/themes') as any;
    const data = response.data;
    return {
      success: true,
      data: data.results
    };
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return {
      success: false,
      data: []
    };
  }
}

export default function ThemeSelection() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadRealData = async () => {
      setIsLoading(true);
      const response = await fetchData();
      if (response.success) {
        setThemes(response.data);
      }
      setIsLoading(false);
    };

    loadRealData();
  }, []);

  const handleCardPress = (theme: number) => {
    setSelectedTheme(theme);
  };

  const handleContinuePress = async () => {
    if (selectedTheme !== null) {
      router.push({
        pathname: '/screens/typeOfAssessment/motivationalTexts',
        params: { theme_id: selectedTheme },
      });
    } else {
      alert('Por favor, selecione um tema.');
    }
  };

  const renderThemeCards = () => {
    return themes
      .sort((a, b) => b.year - a.year)
      .map(({ theme_id, year, title }) => (
        <ThemeSelectionCard
          key={theme_id}
          year={year.toString()} // Convertendo year para string
          isSelected={selectedTheme === theme_id} 
          onPress={() => handleCardPress(theme_id)}
        >
          {title}
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
                disabled={selectedTheme === null}
                labelStyle={selectedTheme === null ? { color: "#fff" } : undefined}
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
    padding: 14,
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
