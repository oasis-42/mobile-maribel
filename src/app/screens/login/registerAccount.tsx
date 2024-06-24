import React, { useState } from "react";
import { View, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { TextInput, Button, Text, PaperProvider } from "react-native-paper";
import { useRouter } from 'expo-router';
import helloUser from "../../../../assets/userAuth/helloUser.png";
import DefaultButton from "../../components/DefaultButton";

export default function RegistroScreen() {
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({ email: "", username: "", password: "", confirmPassword: "" });
  
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validateUsername = (username: string) => {
      return username.length >= 3;
    };
  
    const validatePassword = (password: string) => {
      return password.length >= 6;
    };
  
    const getBaseHeaders = () => {
      return {
        "Content-Type": "application/json",
      };
    };
  
    const handleRegister = async () => {
      const { email, username, password, confirmPassword } = formData;
      const emailError = !validateEmail(email) ? "Email inválido" : "";
      const usernameError = !validateUsername(username) ? "O username deve ter pelo menos 3 caracteres" : "";
      const passwordError = !validatePassword(password) ? "A senha deve ter pelo menos 6 caracteres" : "";
      const confirmPasswordError = password !== confirmPassword ? "As senhas não coincidem" : "";
  
      if (emailError || usernameError || passwordError || confirmPasswordError) {
        setErrors({ email: emailError, username: usernameError, password: passwordError, confirmPassword: confirmPasswordError });
        return;
      }

    const raw = JSON.stringify({
        "email": email,
        "username": username,
        "password": password
    });

    try {
        const response = await fetch("https://api.maribel.cloud/api/auth/users", {
          method: "POST",
          headers: getBaseHeaders(),
          body: raw,
          redirect: "follow"
        });
  
        const jsonResponse = await response.json();
        console.log("Registro:", jsonResponse);
  
        if (response.ok) {
          Alert.alert("Sucesso", "Cadastro realizado com sucesso", [
            { text: "OK", onPress: () => router.back() }
          ]);
        } else {
          Alert.alert("Erro", jsonResponse?.detail || "Falha ao realizar cadastro");
        }
      } catch (error) {
        console.error("Erro:", error);
        Alert.alert("Erro", "Ocorreu um erro ao tentar realizar o cadastro");
      }
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            {/* <Image source={helloUser} style={styles.image} /> */}
            <Text variant="headlineLarge" style={styles.headline}>Cadastre-se</Text>
            
            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TextInput
              label="Username"
              value={formData.username}
              onChangeText={(text) => setFormData({ ...formData, username: text })}
              style={styles.input}
              autoCapitalize="none"
              error={!!errors.username}
            />
            {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

            <TextInput
              label="Senha"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              style={styles.input}
              secureTextEntry={!passwordVisible}
              error={!!errors.password}
              right={
                <TextInput.Icon 
                  icon={passwordVisible ? "eye-off" : "eye"} 
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <TextInput
              label="Confirmação de Senha"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              style={styles.input}
              secureTextEntry={!confirmPasswordVisible}
              error={!!errors.confirmPassword}
              right={
                <TextInput.Icon 
                  icon={confirmPasswordVisible ? "eye-off" : "eye"} 
                  onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                />
              }
            />
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

            <DefaultButton 
                mode="contained" 
                onPress={handleRegister}
             >
                Cadastrar
            </DefaultButton>
          </View>
        </View>
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
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 16
  },
  headline: {
    color: "#2E3E4B",
    marginBottom: 26,
    fontWeight: "700"
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 12,
    marginBottom: 8,
  }
});
