import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const FeedBackCard = ({ competency }: { competency: any }) => (
    <View style={styles.card}>
        <View style={styles.header}>
            <Text style={styles.title}>{competency.analyzedSkill}</Text>
            <Text style={styles.score}>Nota: {competency.grade}</Text>
        </View>
        <Text>{competency.feedback}</Text>
        <Text style={styles.sectionTitle}>Acertos:</Text>
        {competency.successes.map((success: any, index: number) => (
            <View key={index} style={styles.detail}>
                <Text style={styles.excerpt}>{success.excerpt}</Text>
                <Text>{success.reason}</Text>
            </View>
        ))}
        <Text style={styles.sectionTitle}>Erros:</Text>
        {competency.errors.map((error: any, index: number) => (
            <View key={index} style={styles.detail}>
                <Text style={styles.excerpt}>{error.excerpt}</Text>
                <Text>{error.reason}</Text>
                <Text>Como corrigir: {error.howToCorrect}</Text>
            </View>
        ))}
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
        <View style={styles.container}>
            <FlatList
                data={feedback.essayAnalysis}
                renderItem={({ item }) => <FeedBackCard competency={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    card: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: "white",
        padding: 10,
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
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
