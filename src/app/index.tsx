import React from "react";
import { useWindowDimensions, View, Image, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import DefaultButton from "./components/DefaultButton";
import { PaperProvider, Text, TextInput,Button } from "react-native-paper";
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import helloUser from "../../assets/userAuth/helloUser.png";

export default function App() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  const handleLogin = () => {
    
    //FAZER COMUNICAÇÃO COM API PARA LOGIN E VALIDAÇÕES
    
    
    
    
    
    
    // Adicionar lógica de autenticação aqui
    console.log("Email:", email);
    console.log("Senha:", password);
    // Navegar para a próxima tela após login bem-sucedido
    router.push('/screens/home');
  };

  const handleRegister = () => {
    // Navegar para a tela de registro
    router.push('/screens/login/registerAccount');
  };

  const handleForgotPassword = () => {
    // Navegar para a tela de recuperação de senha
    router.push('/screens/login/forgotPassword');
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === "ios" ? 20 : 30}
        >
          <View style={styles.innerContainer}>
            <Image source={helloUser} style={styles.image} />
            <Text variant="headlineLarge" style={styles.headline}>Olá, estudante!</Text>
            <Text variant="titleMedium" style={styles.subtitle}>Como deseja acessar?</Text>
            
            <TextInput
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Senha"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />

          <DefaultButton 
            mode="contained" 
            onPress={() => router.push('/screens/onboardings/onBoarding1')}
          >
            Entrar
          </DefaultButton>

            <Button 
              mode="text" 
              onPress={handleRegister} 
              style={styles.link}
            >
              Não tem uma conta? Registre-se
            </Button>

            <Button 
              mode="text" 
              onPress={handleForgotPassword} 
              style={styles.link}
            >
              Esqueceu a senha?
            </Button>
          
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: '100%'
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 40,
    marginBottom: 16
  },
  headline: {
    color: "#2E3E4B",
    marginBottom: 4,
    fontWeight: "700"
  },
  subtitle: {
    color: "#2E3E4B",
    marginBottom: 26,
    fontWeight: "600"
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  link: {
    color: "#2E3E4B",
    marginTop: 8,
  }
});