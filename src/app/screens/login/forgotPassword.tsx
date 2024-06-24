import React, { useState } from "react";
import { View, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { TextInput, Button, Text, PaperProvider } from "react-native-paper";
import helloUser from "../../../../assets/userAuth/helloUser.png";
import { useRouter } from 'expo-router';
import DefaultButton from "../../components/DefaultButton";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    if (!validateEmail(email)) {
      setError("Por favor, insira um email válido");
      return;
    }

    // Simular o envio de email para redefinição de senha
    try {
      // Aqui você pode adicionar a lógica para enviar o email de redefinição de senha
      Alert.alert("Email enviado", "Verifique seu email para redefinir sua senha", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar enviar o email de redefinição de senha");
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
            <Image source={helloUser} style={styles.image} />
            <Text variant="headlineLarge" style={styles.headline}>Não se Preocupe!</Text>
            <Text variant="titleMedium" style={styles.subtitle}>Informe seu email</Text>
            
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!error}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <DefaultButton 
                mode="contained" 
                onPress={handleSendEmail}
             >
                Enviar
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
  sendButton: {
    width: '100%',
    paddingVertical: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 12,
    marginBottom: 8,
  }
});
