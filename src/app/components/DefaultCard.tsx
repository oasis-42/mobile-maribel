import React, { FC, ReactNode } from 'react';
import { useWindowDimensions, View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Card, Text, Switch } from 'react-native-paper';

interface DefaultCardProps {
  title: string;
  children: ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

const DefaultCard: FC<DefaultCardProps> = ({
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
            color="#044884"
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
