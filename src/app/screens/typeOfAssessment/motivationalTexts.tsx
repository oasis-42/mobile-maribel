import React, { useState, useEffect } from 'react';
import { PaperProvider, Text, ActivityIndicator } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import DefaultButton from "../../components/DefaultButton";

const API_URL = 'https://www.maribel.cloud/api/motivational-texts/theme';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5MTk2NjEyLCJpYXQiOjE3MTkxMTAyMTIsImp0aSI6ImYwYTAwZWQ3ODJlMzQ2ZTQ4MTkxMmNiMDhkZjAyNmUxIiwidXNlcl9pZCI6M30.AScWS68f8x3zpYtaOwAl6S032vYucMN5lGIQDdV6Qd4';

type MotivationalTextData = {
  motivational_text_id: number;
  theme_id: number;
  title: string;
  text: string;
};

async function fetchMotivationalTexts(theme_id: number) {
  try {
    const response = await fetch(`${API_URL}/${theme_id}/`, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (response.ok) {
      return {
        success: true,
        data: data.results
      };
    } else {
      console.error('Erro ao buscar dados:', data);
      return {
        success: false,
        data: []
      };
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return {
      success: false,
      data: []
    };
  }
}

export default function MotivationalTexts() {
  const router = useRouter();
  const { theme_id } = useLocalSearchParams();
  const [motivationalTexts, setMotivationalTexts] = useState<MotivationalTextData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMotivationalTexts = async () => {
      if (theme_id) {
        const response = await fetchMotivationalTexts(Number(theme_id));
        if (response.success && response.data) {
          setMotivationalTexts(response.data);
        }
        setIsLoading(false);
      }
    };

    loadMotivationalTexts();
  }, [theme_id]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#044884" style={styles.loadingIndicator} />
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.headerContainer}>
                <Text variant="titleLarge" style={styles.headerText}>
                  Textos motivadores
                </Text>
                <Text variant="titleSmall" style={styles.bodyText}>
                  Desempenham papel fundamental no processo de avaliação da redação
                </Text>
              </View>
              <View style={styles.cardsContainer}>
                {motivationalTexts.map((item, index) => (
                  <View key={index} style={styles.card}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardText}>{item.text}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <DefaultButton 
                mode="contained"
                onPress={() => router.push('/screens/typeOfAssessment/fileChoice')}
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
    backgroundColor: "#F3F3F3",
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
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
  },
  headerText: {
    fontWeight: "700",
    color: "#2E3E4B",
    textAlign: "left",
    lineHeight: 24,
  },
  bodyText: {
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
    marginBottom: 8
  },
  card: {
    width: '90%',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#D7D7D7',
    borderWidth: 1,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#2E3E4B",
    marginBottom: 8,
  },
  cardText: {
    color: "#2E3E4B",
  
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
