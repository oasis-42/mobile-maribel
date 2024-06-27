
// ARRUMAR DE ACORDO COM API PARA ARQUIVOS QUE NÃO SAO IMAGENS
// Tratar com popup avisando o usario caso arquivo exceda tamanho aceito do arquivo

import React, { useState, useContext } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Button, Text, Card, ActivityIndicator } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useRouter } from "expo-router";
import AppContext from '../contexts/AppContext';
import apiClient from '../../sdk/api';

interface FileInfo {
  uri: string;
  name: string;
  size: number | undefined;
  mimeType: string | undefined;
  content: string;
}

const BASE_URL = "https://api-maribel-production.up.railway.app";

const FilePicker: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setText } = useContext<any>(AppContext);
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.9272; // 92.72% da largura da tela
  const router = useRouter();

  const processOcr = async (base64Image: string) => {
    setLoading(true);

    try {
      const response = await apiClient.post(`/api/ocr/base64`, {
        base64: base64Image
      }) as any;
      setText(response.data.text);
      router.push({ pathname: "/screens/typeOfAssessment/textValidation" });
    } catch (error) {
      console.error('Error processing OCR:', error);
    } finally {
      setLoading(false);
    }
  }

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      console.log('DocumentPicker result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri, size, mimeType, name } = result.assets[0];
        console.log('File info:', { uri, name, size, mimeType });

        const base64Image = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await processOcr(base64Image);
        setFileInfo({ uri, name, size, mimeType, content: base64Image });
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Card mode="outlined" style={[styles.card, { width: cardWidth }]}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Selecionar Arquivo
          </Text>
          <Text style={styles.cardSubtitle}>
            Faça uso de PDF, docx, txt, jpeg e png
          </Text>
          <Button mode="contained" onPress={pickDocument} style={styles.button} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="white" /> : "Selecionar Arquivo"}
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
  loading: {
    marginTop: 10,
  },
});

export default FilePicker;
