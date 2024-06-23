import React, { useContext, useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, ActivityIndicator, IconButton, Text } from "react-native-paper";
import AppContext from "../../contexts/AppContext";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function TextValidation() {
    const [loading, setLoading] = useState(false);
    const { setFeedback } = useContext<any>(AppContext);
    const [text, setText] = useState<any>('');
    const [confidence, setConfidence] = useState<any>(0);
    const { textOcr, confidenceOcr } = useLocalSearchParams();
    const router = useRouter();
    const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5MTk2NjEyLCJpYXQiOjE3MTkxMTAyMTIsImp0aSI6ImYwYTAwZWQ3ODJlMzQ2ZTQ4MTkxMmNiMDhkZjAyNmUxIiwidXNlcl9pZCI6M30.AScWS68f8x3zpYtaOwAl6S032vYucMN5lGIQDdV6Qd4';

    useEffect(() => {
        if (textOcr && confidenceOcr) {
            setText(textOcr);
            setConfidence(confidenceOcr);
        }

        console.log(textOcr);
        console.log(confidenceOcr);
    }, [textOcr, confidenceOcr]);

    const getBaseHeaders = () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${AUTH_TOKEN}`);
        return headers;
    };

    async function handleFeedback() {
        const raw = JSON.stringify({
            "text": text,
            "confidence": confidence
        });

        const response = await fetch("https://api-maribel-production.up.railway.app/api/feedbacks", {
            method: "POST",
            headers: getBaseHeaders(),
            body: raw,
            redirect: "follow"
        });

        const jsonResponse = await response.json();
        console.log("Feedback recebido:", jsonResponse); // Adiciona um log para verificar o feedback recebido
        setFeedback(jsonResponse);
        return jsonResponse;
    }

    async function handleOnPressUsarTexto() {
        console.log("Valor de accuracy:", confidence);
        setLoading(true);
        const feedbackData = await handleFeedback();
        setLoading(false);
        router.push({ pathname: "screens/feedbackscreen/feedBackScreen", params: { feedbackData: JSON.stringify(feedbackData) } });
    }

    function handleOnPressTentarNovamente() {
        router.push({ pathname: "/screens/typeOfAssessment/cameraSelected/camera" });
    }

    const getColor = (index: number, totalDots: number, accuracy: number) => {
        const percentage = (index + 1) / totalDots;

        if (percentage <= accuracy) {
            if (accuracy > 0.75) return 'green';
            if (accuracy > 0.5) return 'yellow';
            return 'red';
        }

        return '#e0e0e0';
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingStart: 8,
                    paddingEnd: 8,
                    paddingTop: 4,
                    paddingBottom: 4,
                    justifyContent: "center",
                    gap: 8,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#D7D7D7",
                    backgroundColor: "white",
                    width: 180,
                    height: 40
                }}
            >
                <Text style={{ fontWeight: "600", fontSize: 16, lineHeight: 24, paddingLeft: 16 }}>Nível de precisão</Text>
                <IconButton icon="information" size={20} onPress={() => {}} />
            </View>

            <View style={styles.progressBarContainer}>
                {[...Array(10)].map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: getColor(index, 10, confidence) },
                        ]}
                    />
                ))}
            </View>

            <TextInput
                editable={!loading}
                multiline
                numberOfLines={30}
                maxLength={2000}
                value={text}
                onChangeText={(t) => setText(t)}
                style={styles.textInput}
            />

            <View style={styles.buttonContainer}>
                <Button style={styles.btn_again} onPress={handleOnPressTentarNovamente} disabled={loading} textColor='#044884'>
                    Tentar novamente
                </Button>

                <Button style={styles.btn_next} onPress={handleOnPressUsarTexto} textColor='#fff'>
                    {loading ? <ActivityIndicator animating={true} color="white" /> : "Usar texto"}
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: "#F3F3F3",
        rowGap: 4,
        
    },
    progressBarContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        columnGap: 1,
        justifyContent: 'center',
        paddingStart: 15,
        paddingEnd: 15
    },
    dot: {
        width: 31,
        height: 8,
        borderRadius: 5,
        marginHorizontal: 2,
    },
    textInput: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 10,
        gap: 8,
        justifyContent: 'space-between',
    },
    btn_again: {
        backgroundColor: "#FFFFFF",
        width: "auto",
        height: 56,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderRadius: 7,
        borderColor: "#044884",
        borderWidth: 1,
    },
    btn_next: {
        backgroundColor: "#044884",
        width: "auto",
        height: 56,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderRadius: 7,
    },
});
