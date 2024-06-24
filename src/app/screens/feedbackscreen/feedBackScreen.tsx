import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const FeedBackCard = ({ competency }: { competency: any }) => (
    <View style={styles.card}>
        <View style={styles.header}>
            <Text style={styles.title}>{competency.skillDescription}</Text>
            <Text style={styles.score}>Nota: {competency.grade}</Text>
        </View>
        <Text>{competency.feedback}</Text>
        <Text style={styles.sectionTitle}>Acertos:</Text>
        {competency?.successes?.length > 0 ? (
            competency.successes.map((success: any, index: number) => (
                <View key={index} style={styles.detail}>
                    <Text style={styles.excerpt}>{success.excerpt}</Text>
                    <Text>{success.reason}</Text>
                </View>
            ))
        ) : (
            <Text>Não há acertos.</Text>
        )}
        <Text style={styles.sectionTitle}>Erros:</Text>
        {competency?.errors?.length > 0 ? (
            competency.errors.map((error: any, index: number) => (
                <View key={index} style={styles.detail}>
                    <Text style={styles.excerpt}>{error.excerpt}</Text>
                    <Text>{error.reason}</Text>
                    <Text style={styles.sectionTitle}>Como corrigir:</Text>
                    <Text>{error.howToCorrect}</Text>
                </View>
            ))
        ) : (
            <Text>Não há erros.</Text>
        )}
    </View>
);

const FeedBackScreen: React.FC = () => {
    const { feedbackData } = useLocalSearchParams();
    
    // Verifica se feedbackData é um array, caso seja, pega o primeiro elemento
    const feedbackString = Array.isArray(feedbackData) ? feedbackData[0] : feedbackData;
    
    // Converte feedbackString para JSON, caso não seja undefined
    const feedback = feedbackString ? JSON.parse(feedbackString) : [];
    
    console.log("Dados de feedback:", feedback); // Adiciona um log para verificar os dados de feedback

    return (
        <ScrollView style={styles.container}>
            {feedback.essayAnalysis && feedback.essayAnalysis.length > 0 ? (
                feedback.essayAnalysis.map((item: any, index: number) => (
                    <FeedBackCard key={index} competency={item} />
                ))
            ) : (
                <Text>Não há feedback disponível.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    card: {
        borderColor: "#D7D7D7",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
        padding: 10,
        marginBottom: 10,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    score: {
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
    detail: {
        marginTop: 5,
    },
    excerpt: {
        fontStyle: 'italic',
    },
});

export default FeedBackScreen;
