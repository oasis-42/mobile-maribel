import React from "react";
import { View, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { TextInput, Button, Text, PaperProvider, ActivityIndicator } from "react-native-paper";
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import helloUser from "../../assets/userAuth/helloUser.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DefaultButton from "./components/DefaultButton";

export default function App() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({ username: "", password: "" });

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

      if (!res.ok) {
        throw new Error('Nome de usuário ou senha inválidos');
      }

      const json = await res.json();

      console.log(json);

      await AsyncStorage.setItem("auth", JSON.stringify({
        accessToken: json['access'],
        refreshToken: json['refresh'],
        updatedAt: new Date()
      }));

      return true;
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        Alert.alert("Erro", err.message);
      } else {
        Alert.alert("Erro", "Ocorreu um erro desconhecido");
      }
      return false;
    }
  }

  const validateInputs = () => {
    let valid = true;
    let errors = { username: "", password: "" };

    if (!username) {
      errors.username = "Nome de usuário é obrigatório";
      valid = false;
    } else if (username.length < 3) {
      errors.username = "Nome de usuário deve ter pelo menos 3 caracteres";
      valid = false;
    }

    if (!password) {
      errors.password = "Senha é obrigatória";
      valid = false;
    } else if (password.length < 6) {
      errors.password = "Senha deve ter pelo menos 6 caracteres";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleLogin = async () => {
    if (validateInputs()) {
      setLoading(true);
      const success = await setAcessToken();
      setLoading(false);
      if (success) {
        router.push('/screens/onboardings/onBoarding1');
      }
    } else {
      Alert.alert("Erro", "Por favor, corrija os erros antes de prosseguir.");
    }
  };

  const handleRegister = () => {
    router.push('/screens/login/registerAccount');
  };

  const handleForgotPassword = () => {
    router.push('/screens/login/forgotPassword');
  };

  const inputTheme = {
    colors: {
      primary: '#044884',
      underlineColor: 'transparent',
      background: '#ffffff'
    }
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
              mode="outlined"
              label="Usuário"
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.input}
              autoCapitalize="none"
              theme={inputTheme}
              error={!!errors.username}
            />
            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

            <TextInput
              mode="outlined"
              label="Senha"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
              theme={inputTheme}
              error={!!errors.password}
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <DefaultButton 
              mode="contained" 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? <ActivityIndicator animating={true} color="white" /> : "Entrar"}
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
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 12,
    marginBottom: 8,
  }
});
