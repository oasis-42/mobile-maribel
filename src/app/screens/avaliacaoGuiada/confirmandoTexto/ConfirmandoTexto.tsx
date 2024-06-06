
import { View, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";
import AppContext from "../../../contexts/AppContext";
import { useContext, useState } from "react";
import { router } from "expo-router";

export default function ConfirmandoTexto() {
    const { text, setText, setFeedback } = useContext<any>(AppContext);

    function getBaseHeaders() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }

    async function handleFeedback() {
        const raw = JSON.stringify({
          "text": text
        });
        
        const response = await fetch("https://api-maribel-production.up.railway.app/api/v1/ocr/feedback", {
          method: "POST",
          headers: getBaseHeaders(),
          body: raw,
          redirect: "follow"
        });

        const jsonResponse = await response.json();
        setFeedback(jsonResponse);
    }

    async function handleOnPressUsarTexto() {
        await handleFeedback();
        router.push({ pathname: "screens/feedbackscreen/feedBackScreen" });
    }

    return (
        <View>
            <TextInput
                editable
                multiline
                numberOfLines={30}
                maxLength={2000}
                value={text}
                onChangeText={(t) => setText(t)}
                style={{padding: 10}}
            />

            <Button>
                Tentar novamente
            </Button>

            <Button onPress={handleOnPressUsarTexto}>
                Usar texto
            </Button>
        </View>
    );
}
