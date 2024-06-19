import React, { FC, ReactNode } from 'react';
import { useWindowDimensions, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';

interface DefaultButtonProps extends Omit<ButtonProps, 'mode' | 'icon'> {
  icon?: ReactNode;
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  onPress: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean; 
}

const DefaultButton: FC<DefaultButtonProps> = ({
  icon,
  mode,
  onPress,
  children,
  style = {},
  contentStyle = {},
  labelStyle = {},
  disabled = false, 
}) => {
  const { width } = useWindowDimensions();
  const buttonWidth = width * 0.9272; // 92.72% of the screen width

  const defaultStyle = mode === 'contained' 
    ? { 
        marginBottom: 8, 
        backgroundColor: disabled ? "#B1C6D9" : "#044884", 
        borderRadius: 5, 
        height: 56, 
        marginTop: 8, 
        width: buttonWidth 
      }
    : { 
        marginBottom: 8, 
        borderColor: "#D7D7D7", 
        borderRadius: 5, 
        height: 56, 
        marginTop: 8, 
        width: buttonWidth 
      };

  return (
    <Button 
      icon={icon} 
      mode={mode} 
      style={[defaultStyle, style]}
      contentStyle={[{ height: 56, justifyContent: 'center' }, contentStyle]}
      labelStyle={labelStyle}
      onPress={onPress}
      disabled={disabled} 
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
