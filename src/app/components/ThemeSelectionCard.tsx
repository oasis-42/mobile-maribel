import React, { FC, ReactNode } from 'react';
import { useWindowDimensions, View, StyleSheet, StyleProp, ViewStyle, TextStyle, Pressable } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface ThemeSelectionCardProps {
  children: ReactNode;
  year: string;
  isSelected: boolean;
  onPress: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

const ThemeSelectionCard: FC<ThemeSelectionCardProps> = ({
  children,
  year,
  isSelected,
  onPress,
  contentStyle = {},
  style = {},
  borderColor = "#D7D7D7",
  backgroundColor = "#fff",
  textColor = "#2E3E4B",
}) => {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.9272; // 92.72% of the screen width

  const selectedStyle = isSelected ? { backgroundColor: "#044884", borderColor: "#044884" } : {};
  const selectedTextColor = isSelected ? "#fff" : textColor;
  const yearTextColor = isSelected ? "#fff" : "#044884"; // Azul fraco quando não selecionado

  return (
    <Pressable onPress={onPress}>
      <Card mode="outlined" style={[styles.card, { width: cardWidth, borderColor, backgroundColor }, selectedStyle, style]}>
        <Card.Content style={[styles.content, contentStyle]}>
          <View style={styles.textContainer}>
            <Text style={{ color: selectedTextColor }}>
              {children}
            </Text>
          </View>
          <View style={styles.yearContainer}>
            <Text style={[styles.yearText, { color: yearTextColor }]}>
              {year}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    marginVertical: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 4, 
    paddingRight: 8,
  },
  yearContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  yearText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ThemeSelectionCard;
