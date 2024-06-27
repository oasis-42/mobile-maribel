import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';


const FilePicker: React.FC = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.9272; // 92.72% da largura da tela



  return (
    <View style={styles.container}>
      <Card mode="outlined" style={[styles.card, { width: cardWidth }]}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Tirar foto
          </Text>
          <Text style={styles.cardSubtitle}>
            Certifique-se de tirar uma foto legível da redação em uma folha A4
          </Text>
          <Button mode="contained" onPress={() => router.push('/screens/typeOfAssessment/cameraSelected/camera')} style={styles.button}>
            Tirar foto
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 16,
  },
  card: {
    borderColor: '#D7D7D7', 
    borderRadius: 5,
  },
  cardTitle: {
    marginBottom: 4,
  },
  cardSubtitle: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#044884"
  },
  fileInfo: {
    marginTop: 20,
  },
  fileInfoText: {
    fontWeight: 'bold',
  },
});

export default FilePicker;
