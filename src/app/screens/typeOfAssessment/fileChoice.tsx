import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FilePicker from '../../components/FilePicker'
import ImagePicker from '../../components/ImagePicker'
import { Text,} from "react-native-paper";

const SomeScreen: React.FC = () => {
  return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text variant="titleSmall" style={styles.headerText}>
            Escolha a forma que deseja analisar sua redação
          </Text>
        </View>
        <View style={styles.container}>
          <ImagePicker />
          <FilePicker />
        </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
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
  scrollContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 16,
    backgroundColor: "#F3F3F3"
  },
});

export default SomeScreen;
