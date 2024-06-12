import * as React from 'react';
import { router } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import api from "../../../../sdk/api";
import { useContext, useState } from "react";
import AppContext from "../../../contexts/AppContext";

export default function ConfirmandoFoto() {
    const [loading, setLoading] = React.useState(false);
    const BASE_URL = "https://api-maribel-production.up.railway.app";

    const { base64Image, setText } = useContext<any>(AppContext);

    function getBaseHeaders() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }

    async function processOcr() {
        setLoading(true)
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
        setLoading(false)
    }

    async function handleOnPressContinuar() {
        await processOcr();
        router.push({ pathname: "screens/avaliacaoGuiada/confirmandoTexto/ConfirmandoTexto" });
    }

    function handleOnPressTakeAgain() {
        router.push({ pathname: "screens/camera/cameraScreen" });
    }

    return (
        <View style={styles.mainContainer}>
            {loading ? (
                <ActivityIndicator animating={true} />
            ) : (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: `data:image/png;base64,${base64Image}` }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
            )}

            <View style={styles.buttonContainer}>
                <Button style={styles.btn_again} onPress={handleOnPressTakeAgain}>
                    Tirar outra foto
                </Button>

                <Button style={styles.btn_next} onPress={handleOnPressContinuar}>
                    Continuar
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000', // optional
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 10,
        gap: 8,
        justifyContent: 'space-around',
        backgroundColor: '#fff', // optional, makes background white
    },
    btn_again: {
        backgroundColor: "#FFFFFF",
        width: "auto",
        height: 56,
        flex: 1,
        justifyContent: "center",
        padding: 8,
        borderRadius: 7,
        borderColor: "#044884",
        borderWidth: 1, // Added to make border visible
    },
    btn_next: {
        backgroundColor: "#044884",
        width: "auto",
        height: 56,
        flex: 1,
        justifyContent: "center",
        padding: 8,
        borderRadius: 7
    },
});