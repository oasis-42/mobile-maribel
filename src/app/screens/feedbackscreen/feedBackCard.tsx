// import { useEffect, useState } from "react"
// import { View } from "react-native";
// import { Text } from "react-native-paper";



// export default function FeedBackCard({ key, points, competencia, parecer }: { points: number, competencia: string, parecer: string, key: number }) {
//     return (
//         <View key={key}>
//             <Text >{points}</Text>
//             <Text>{competencia}</Text>
//             <Text>{parecer}</Text>
//         </View>
//     )
// }


import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';

interface Competency {
    id: string;
    title: string;
    score: number;
    excerpt: string;
    feedback: string;
    hits: string;
    errors: string;
  }
  
  interface FeedBackCardProps {
    competency: Competency;
  }

const FeedBackCard: React.FC<FeedBackCardProps> = ({ competency}) => {
    const [expanded, setExpanded] = React.useState(false);
  
    return (
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Card.Content>
            <View style={styles.header}>
              <Title>{competency.title}</Title>
              <IconButton
                icon={expanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                onPress={() => setExpanded(!expanded)}
              />
            </View>
            <Paragraph>Pontuação: {competency.score}</Paragraph>
          </Card.Content>
        </TouchableOpacity>
        {expanded && (
          <Card.Content style={styles.expandedContent}>
            <Paragraph>Trecho do Texto: {competency.excerpt}</Paragraph>
            <Paragraph>Feedback: {competency.feedback}</Paragraph>
            <Paragraph>Acertos: {competency.hits}</Paragraph>
            <Paragraph>Erros: {competency.errors}</Paragraph>
          </Card.Content>
        )}
      </Card>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5f5f5',
    },
    card: {
      marginBottom: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    expandedContent: {
      marginTop: 10,
    },
  });

  export default FeedBackCard;