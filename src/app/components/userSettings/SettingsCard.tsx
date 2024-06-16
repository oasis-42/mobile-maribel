import React from 'react';
import { useWindowDimensions, View, StyleSheet } from 'react-native';
import { Card, Text, Switch } from 'react-native-paper';

interface SettingsCardProps {
  id: string;
  title: string;
  children: React.ReactNode;
  titleStyle?: object;
  contentStyle?: object;
  style?: object;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  id,
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

  const handleSwitchChange = (value: boolean) => {
    // Fazer a requisição com o ID do card e o estado do switch
    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        switchValue: value,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    // Chamar a função onSwitchChange passada como prop
    onSwitchChange(value);
  };

  return (
    <Card mode="outlined" style={[styles.card, { width: cardWidth, borderColor, backgroundColor }, style]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: textColor }, titleStyle]}>
          {title}
        </Text>
        {showSwitch && (
          <Switch 
            value={switchValue} 
            onValueChange={handleSwitchChange} 
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

export default SettingsCard;
