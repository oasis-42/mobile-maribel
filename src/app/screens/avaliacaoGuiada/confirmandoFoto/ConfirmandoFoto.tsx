import { router } from "expo-router";
import { View, Image } from "react-native";
import { Button } from "react-native-paper";
import api from "../../../../sdk/api";
import { useContext, useState } from "react";
import AppContext from "../../../contexts/AppContext";

export default function ConfirmandoFoto() {
    const BASE_URL = "https://api-maribel-production.up.railway.app";

    const { base64Image, setText } = useContext<any>(AppContext);

    function getBaseHeaders() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }

    async function processOcr() {
        const jsonBody = JSON.stringify({
            "base64": base64Image
        })

        const response = await fetch(`${BASE_URL}/api/v1/ocr/base64`, {
            method: "POST",
            headers: getBaseHeaders(),
            body: jsonBody,
            redirect: "follow"
        });

        const jsonResponse = await response.json();
        setText(jsonResponse.text);
    }

    async function handleOnPressContinuar() {
        await processOcr();
        router.push({ pathname: "screens/avaliacaoGuiada/confirmandoTexto/ConfirmandoTexto" });
    }

    return (
        <View>
            <Image 
                source={{ uri: `data:image/png;base64,${base64Image}` }} 
                style={{ width: 200, height: 200 }}
            />

            <Button>
                Tirar outra foto
            </Button>

            <Button onPress={handleOnPressContinuar}>
                Continuar
            </Button>
        </View>
    );
}
