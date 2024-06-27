import React, { useContext, useEffect, useState } from 'react';
import { useWindowDimensions, View, StyleSheet } from 'react-native';
import { Card, Text, Switch } from 'react-native-paper';
import { SwitchContext } from '../../contexts/SwitchContext'; 

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
}) => {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.9272; // 92.72% of the screen width
  const context = useContext(SwitchContext);

  if (!context) {
    throw new Error('SwitchContext must be used within a SwitchProvider');
  }

  const { switchStates, updateSwitchState } = context;
  const [isSwitchEnabled, setIsSwitchEnabled] = useState<boolean>(switchStates[id] || false);

  useEffect(() => {
    if (switchStates[id] !== undefined) {
      setIsSwitchEnabled(switchStates[id]);
    }
  }, [switchStates, id]);

  const handleSwitchChange = (value: boolean) => {
    setIsSwitchEnabled(value); // Atualiza o estado local primeiro para garantir resposta rápida ao clique
    updateSwitchState(id, value);
  };

  return (
    <Card mode="outlined" style={[styles.card, { width: cardWidth, borderColor, backgroundColor }, style]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: textColor }, titleStyle]}>
          {title}
        </Text>
        {showSwitch && (
          <Switch 
            value={isSwitchEnabled} 
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
