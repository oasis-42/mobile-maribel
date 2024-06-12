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
        <View>
            {loading ? (
                <ActivityIndicator animating={true} />
            ) : (
                <View style={styles.container}>
                    <Image
                        source={{ uri: `data:image/png;base64,${base64Image}` }}
                        style={{ width: 400, height: 600 }}
                        resizeMode="stretch"
                    />
                </View>
            )}

            <View style={{
                display: "flex",
                flexDirection: "row",
                padding: 10,
                gap: 8
            }}>

                <Button style={styles.btn_again} onPress={handleOnPressTakeAgain}>
                    Tirar outra foto
                </Button>

                <Button style={styles.btn_next} onPress={handleOnPressContinuar} >
                    Continuar
                </Button>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row'
    }, btn_again: {
        backgroundColor: "#FFFFFF",
        width: "auto",
        height: 56,
        flex: 1,
        justifyContent: "center",
        padding: 8,
        borderRadius: 7,
        borderColor: "#044884"
    }, btn_next: {
        backgroundColor: "#044884",
        width: "auto",
        height: 56,
        flex: 1,
        justifyContent: "center",
        padding: 8,
        borderRadius: 7
    }
});