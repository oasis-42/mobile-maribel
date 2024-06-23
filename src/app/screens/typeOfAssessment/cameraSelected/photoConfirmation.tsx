import * as React from 'react';
import { router } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import api from "../../../../sdk/api";
import { useContext, useState } from "react";
import AppContext from "../../../contexts/AppContext";

export default function PhotoConfirmation() {
    const [loading, setLoading] = React.useState(false);
    const BASE_URL = "https://api-maribel-production.up.railway.app";
    const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5MTk2NjEyLCJpYXQiOjE3MTkxMTAyMTIsImp0aSI6ImYwYTAwZWQ3ODJlMzQ2ZTQ4MTkxMmNiMDhkZjAyNmUxIiwidXNlcl9pZCI6M30.AScWS68f8x3zpYtaOwAl6S032vYucMN5lGIQDdV6Qd4';


    const { base64Image, setText } = useContext<any>(AppContext);

    function getBaseHeaders() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${AUTH_TOKEN}`);
        return headers;
    }

    async function processOcr() {
        setLoading(true)
        const jsonBody = JSON.stringify({
            "base64": base64Image
        })

        const response = await fetch(`${BASE_URL}/api/ocr/base64`, {
            method: "POST",
            headers: getBaseHeaders(),
            body: jsonBody,
            redirect: "follow"
        });

        const jsonResponse = await response.json();
        setText(jsonResponse.text);
        setLoading(false)
        return jsonResponse;
    }

    async function handleOnPressContinuar() {
        setLoading(true);
        const { text, confidence } = await processOcr();
        setLoading(false);
        router.push({ pathname: "screens/typeOfAssessment/textValidation",
                      params: {textOcr: text, confidenceOcr: confidence.toString()}
                    });
    }

    function handleOnPressTentarNovamente() {
        router.push({ pathname: "/screens/typeOfAssessment/cameraSelected/camera" });
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                {/* {loading ? (
                    <ActivityIndicator size="large" color="#044884" />
                ) : ( */}
                <Image
                    source={{ uri: `data:image/png;base64,${base64Image}` }}
                    style={styles.image}
                    resizeMode="contain"
                />
                {/* )} */}
            </View>
            <View style={styles.footer}>
                <Button style={styles.btn_again} onPress={handleOnPressTentarNovamente} disabled={loading} textColor='#044884'>
                    Tirar outra foto
                </Button>

                <Button style={styles.btn_next} onPress={handleOnPressContinuar} textColor='#fff'>
                    {loading ? <ActivityIndicator size="small" color="white" /> : "Continuar"}
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#000', 
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
    footer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#D7D7D7',
        },
    btn_again: {
        backgroundColor: "#FFFFFF",
        width: "auto",
        height: 56,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderRadius: 5,
        borderColor: "#044884",
        borderWidth: 1,
        marginBottom: 8, 
        marginTop: 8,
    },
    btn_next: {
        backgroundColor: "#044884",
        width: "auto",
        height: 56,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderRadius: 5,
        marginBottom: 8, 
        marginTop: 8,
    },
});