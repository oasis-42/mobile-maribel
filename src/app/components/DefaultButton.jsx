import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Button } from 'react-native-paper';

const DefaultButton = ({
  icon = null,
  mode,
  onPress,
  children,
  style = {},
  contentStyle = {},
  labelStyle = {}
}) => {
  const { width } = useWindowDimensions();
  const buttonWidth = width * 0.9272; // 92.72% of the screen width

  const defaultStyle = mode === 'contained' 
    ? { marginBottom: 8, backgroundColor: "#044884", borderRadius: 5, height: 56, marginTop: 8, width: buttonWidth }
    : { marginBottom: 8, borderColor: "#D7D7D7", borderRadius: 5, height: 56, marginTop: 8, width: buttonWidth };

  return (
    <Button 
      icon={icon} 
      mode={mode} 
      style={[defaultStyle, style, ]}
      contentStyle={[{ height: 56, justifyContent: 'center', }, contentStyle]}
      labelStyle={labelStyle}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
