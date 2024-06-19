import React from 'react';
import { PaperProvider, Text } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import DefaultButton from "../../components/DefaultButton";
import DefaultCard from "../../components/DefaultCard";
import { useRouter } from 'expo-router';

export default function FileChoice() {
  const router = useRouter();

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text variant="titleSmall" style={styles.headerText}>
            Escolha a forma que deseja analisar sua redação
          </Text>
        </View>
        <View style={styles.cardsContainer}>
          <DefaultCard style={styles.card} title="Adicionar arquivo">
            <Text variant="bodyMedium">
                Faça uso de PDF, docx, txt, jpeg e png
            </Text>
          </DefaultCard>
          <DefaultCard style={styles.card} title="Tirar foto">
            <Text variant="bodyMedium">
                Certifique-se de tirar uma foto legível da redação em uma folha A4
            </Text>
          </DefaultCard>
          <DefaultButton mode="contained" onPress={() => router.push('/')} style={styles.continueButton}>
            Continuar
          </DefaultButton>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
  },
  headerContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
  },
  headerText: {
    fontWeight: "600",
    color: "#2E3E4B",
    textAlign: "left",
    lineHeight: 24,
    marginBottom: 8,
  },
  cardsContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  card: {
    height: 136,
  },
  continueButton: {
    marginTop: 32,
  },
});
