import React from "react";
import { useWindowDimensions, View, Image, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import DefaultButton from "./components/DefaultButton";
import { PaperProvider, Text, TextInput,Button } from "react-native-paper";
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import helloUser from "../../assets/userAuth/helloUser.png";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function setAcessToken() {
    try {
      const res = await fetch("https://api.maribel.cloud/api/auth/jwt/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      const json = await res.json() as any;

      console.log(json);

      await AsyncStorage.setItem("auth", JSON.stringify({
        accessToken: json['access'] as string,
        refreshToken: json['refresh'] as string,
        updatedAt: new Date()
      }));
    } catch(err) {
      console.log(err);
    }
  }

  const handleLogin = () => {
    setAcessToken()
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
            { !username ? (
              <Image source={helloUser} style={styles.image} />
            ) : (
              <></>
            )
            }
            <Text variant="headlineLarge" style={styles.headline}>Olá, estudante!</Text>
            <Text variant="titleMedium" style={styles.subtitle}>Como deseja acessar?</Text>
            
            <TextInput
              label="Usuário"
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.input}
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
            onPress={() => { 
              setAcessToken();
              router.push('/screens/onboardings/onBoarding1') 
            }}
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

            {/* <Button 
              mode="text" 
              onPress={handleForgotPassword} 
              style={styles.link}
            >
              Esqueceu a senha?
            </Button> */}
          
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