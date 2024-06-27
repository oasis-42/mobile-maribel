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


  const FeedBackCard: React.FC<FeedBackCardProps> = ({ competency }) => {
    const [expanded, setExpanded] = React.useState(false);
  
    return (
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Card.Content>
            <View style={styles.header}>
              <Text style={styles.title}>{competency.title}</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.score}>{competency.score} Pontos</Text>
                <IconButton
                  icon={expanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  onPress={() => setExpanded(!expanded)}
                />
              </View>
            </View>
            <Paragraph style={styles.description}>{competency.excerpt}</Paragraph>
          </Card.Content>
        </TouchableOpacity>
        {expanded && (
          <Card.Content style={styles.expandedContent}>
            <Text style={styles.parecerTitle}>Parecer:</Text>
            <Paragraph>{competency.feedback}</Paragraph>
          </Card.Content>
        )}
      </Card>
    );
  };
  
  const styles = StyleSheet.create({
    card: {
      display: 'flex',
      padding: 15,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4,
      backgroundColor: 'white',
      marginBottom: 10,
      borderRadius: 5
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    title: {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    scoreContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    score: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    description: {
      marginTop: 4,
      marginBottom: 4,
    },
    expandedContent: {
      marginTop: 4,
    },
    parecerTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 4,
      marginBottom: 4,
    },
  });
  
  export default FeedBackCard;