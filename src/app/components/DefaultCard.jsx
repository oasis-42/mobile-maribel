import React from 'react';
import { useWindowDimensions, View, StyleSheet } from 'react-native';
import { Card, Text, Switch } from 'react-native-paper';

const DefaultCard = ({
  title,
  children,
  titleStyle = {},
  contentStyle = {},
  style = {},
  borderColor = "#D7D7D7",
  backgroundColor = "#fff",
  textColor = "#2E3E4B",
  showSwitch = false,
  switchValue = false,
  onSwitchChange = () => {},
}) => {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.9272; // 92.72% of the screen width

  return (
    <Card mode="outlined" style={[styles.card, { width: cardWidth, borderColor, backgroundColor }, style]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: textColor }, titleStyle]}>
          {title}
        </Text>
        {showSwitch && (
          <Switch 
            value={switchValue} 
            onValueChange={onSwitchChange} 
            color= "#044884"
            style={styles.switch}
          />
        )}
      </View>
      <Card.Content style={contentStyle}>
        <Text style={{ color: textColor }}>
          {children}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    marginTop: 20,
    height: 136,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  switch: {
    marginLeft: 'auto',
  },
});

export default DefaultCard;
