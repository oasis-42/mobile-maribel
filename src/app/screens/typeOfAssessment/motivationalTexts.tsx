import React, { useState, useEffect } from 'react';
import { PaperProvider, Text, ActivityIndicator } from "react-native-paper";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { fetchMotivationalTexts } from '../../../mocks/apiMotivationalTexts';
import DefaultButton from "../../components/DefaultButton";
import { useRouter } from 'expo-router';



export default function MotivationalTexts() {
  const router = useRouter();
  const { year } = useLocalSearchParams();
  const [motivationalTexts, setMotivationalTexts] = useState<{ text?: string; image?: any }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMotivationalTexts = async () => {
      if (year) {
        const response = await fetchMotivationalTexts(year as string);
        if (response.success && response.data) {
          setMotivationalTexts(response.data.texts);
        }
        setIsLoading(false);
      }
    };

    loadMotivationalTexts();
  }, [year]);

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
                    {item.image && (
                      <View style={styles.imageContainer}>
                        <Image source={item.image} style={styles.image} resizeMode="contain" />
                      </View>
                    )}
                    {item.text && <Text style={styles.cardText}>{item.text}</Text>}
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
  imageContainer: {
    width: '100%',
    height: 200, 
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
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
