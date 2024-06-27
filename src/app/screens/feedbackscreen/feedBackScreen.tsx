import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, PaperProvider, Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

const FeedBackCard = ({ competency, index }: { competency: any, index: number }) => (
    <View style={styles.card}>
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Text variant="titleLarge" style={styles.competencyLabel}>Competência</Text>
                <Avatar.Text 
                    size={30} 
                    label={String.fromCharCode(65 + index)} 
                    style={styles.avatar} 
                    color="#fff"
                    labelStyle={styles.avatarLabel}
                />
            </View>
            <Text style={styles.score}>{competency.grade} pontos</Text>
        </View>
        <Text variant="bodyMedium" style={styles.skillDescription}>{competency.skillDescription}</Text>
        <Text variant="titleLarge" style={styles.bodyTitle}>Crítica</Text>
        <Text variant="bodyMedium" style={styles.bodyText}>{competency.feedback}</Text>
        <Text variant="bodyMedium" style={styles.sectionTitle}>Acertos:</Text>
        {competency?.successes?.length > 0 ? (
            competency.successes.map((success: any, index: number) => (
                <View key={index} style={styles.detail}>
                    <Text variant="bodyMedium" style={styles.excerpt}>{success.excerpt}</Text>
                    <Text variant="bodyMedium" style={styles.bodyText}>{success.reason}</Text>
                </View>
            ))
        ) : (
            <Text variant="bodyMedium" style={styles.bodyText}>Não há acertos.</Text>
        )}
        <Text variant="bodyMedium" style={styles.sectionTitle}>Erros:</Text>
        {competency?.errors?.length > 0 ? (
            competency.errors.map((error: any, index: number) => (
                <View key={index} style={styles.detail}>
                    <Text variant="bodyMedium" style={styles.excerpt}>{error.excerpt}</Text>
                    <Text variant="bodyMedium" style={styles.bodyText}>{error.reason}</Text>
                    <Text variant="bodyMedium" style={styles.sectionTitle}>Como corrigir:</Text>
                    <Text variant="bodyMedium" style={styles.bodyText}>{error.howToCorrect}</Text>
                </View>
            ))
        ) : (
            <Text variant="bodyMedium" style={styles.bodyText}>Não há erros.</Text>
        )}
    </View>
);

const FeedBackScreen: React.FC = () => {
    const { feedbackData } = useLocalSearchParams();
    
    const feedbackString = Array.isArray(feedbackData) ? feedbackData[0] : feedbackData;
    
    const feedback = feedbackString ? JSON.parse(feedbackString) : [];

    const sortedCompetencies = feedback.essayAnalysis.sort((a: any, b: any) => 
        a.skillDescription.localeCompare(b.skillDescription)
    );

    return (
        <PaperProvider>
            <ScrollView style={styles.container}>
                {sortedCompetencies && sortedCompetencies.length > 0 ? (
                    sortedCompetencies.map((item: any, index: number) => (
                        <FeedBackCard key={index} competency={item} index={index} />
                    ))
                ) : (
                    <Text variant="bodyMedium" style={styles.bodyText}>Não há feedback disponível.</Text>
                )}
            </ScrollView>
        </PaperProvider>
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
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    competencyLabel: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    score: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#044884'
    },
    skillDescription: {
        fontSize: 16,
        textAlign: "justify",
        marginTop: 5,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    detail: {
        marginTop: 5,
    },
    excerpt: {
        fontStyle: 'italic',
    },

    bodyTitle: {
        fontWeight: 'bold',
        marginTop: 5,
      
    },

    bodyText: {
        fontSize: 16,
        color: '#2E3E4B',
    },
    avatar: {
        backgroundColor: '#2E3E4B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default FeedBackScreen;
