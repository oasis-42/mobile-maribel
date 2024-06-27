import * as React from 'react';
import { router } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { useContext } from "react";
import AppContext from "../../../contexts/AppContext";
import apiClient from '../../../../sdk/api';

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

        const response = await apiClient.post('/api/ocr/base64', {
            base64: base64Image
        }) as any;

        setText(response.data.text);
        setLoading(false)
        return response.data;
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
                <Image
                    source={{ uri: `data:image/png;base64,${base64Image}` }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.footer}>
                <Button
                    mode="outlined"
                    onPress={handleOnPressTentarNovamente}
                    disabled={loading}
                    textColor='#044884'
                    style={styles.btn_again}
                    contentStyle={styles.buttonContent}
                >
                    Usar outra foto
                </Button>

                <Button
                    mode="contained"
                    onPress={handleOnPressContinuar}
                    textColor='#fff'
                    style={styles.btn_next}
                    contentStyle={styles.buttonContent}
                >
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
        flex: 1,
        marginBottom: 8,
        marginTop: 8,
        borderRadius: 5,
        borderColor: "#044884",
    },
    btn_next: {
        flex: 1,
        marginBottom: 8,
        marginTop: 8,
        borderRadius: 5,
        backgroundColor: "#044884"
    },
    buttonContent: {
        height: 56,
        justifyContent: 'center',
    },
});
