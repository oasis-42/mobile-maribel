import React, { useContext, useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { Modal, Portal, Text, IconButton, Button, ActivityIndicator } from 'react-native-paper';
import AppContext from "../../contexts/AppContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import apiClient from "../../../sdk/api";

const { width } = Dimensions.get("window");

export default function TextValidation() {
    const [visible, setVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [loading, setLoading] = useState(false);
    const { setFeedback } = useContext<any>(AppContext);
    const [text, setText] = useState<any>('');
    const [confidence, setConfidence] = useState<any>(0);
    const { textOcr, confidenceOcr } = useLocalSearchParams();
    const router = useRouter();
    const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5MTk2NjEyLCJpYXQiOjE3MTkxMTAyMTIsImp0aSI6ImYwYTAwZWQ3ODJlMzQ2ZTQ4MTkxMmNiMDhkZjAyNmUxIiwidXNlcl9pZCI6M30.AScWS68f8x3zpYtaOwAl6S032vYucMN5lGIQDdV6Qd4';

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => setVisible(false);

    useEffect(() => {
        if (textOcr && confidenceOcr) {
            setText(textOcr);
            setConfidence(confidenceOcr);
        }

        console.log(textOcr);
        console.log(confidenceOcr);
    }, [textOcr, confidenceOcr]);

    async function handleFeedback() {
        const response = await apiClient.post('/api/feedbacks', {
            "text": text,
            "theme_id": 1
        });

        const jsonResponse = response.data;
        console.log("Feedback recebido:", jsonResponse);
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

    const getAccuracyMessage = (accuracy: number) => {
        if (accuracy > 0.75) return 'ótimo';
        if (accuracy > 0.5) return 'médio';
        return 'ruim';
    };

    const getModalMessage = (accuracy: number) => {
        if (accuracy > 0.75) return 'O nível de qualidade do seu texto fornece uma precisão ótima para a avaliação';
        if (accuracy > 0.5) return 'O nível de qualidade do seu texto fornece uma precisão mínima para a avaliação';
        return 'O nível de qualidade do seu texto não fornece uma precisão mínima para a avaliação, recomendamos que tente novamente';
    };

    return (
        <View style={styles.container}>
            <View style={styles.precisionLevelContainer}>
                <Text style={styles.precisionLevelText}>Nível de precisão</Text>
                <IconButton icon="information" size={20} onPress={showModal} />
            </View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <Text variant="titleMedium">Nível de precisão {getAccuracyMessage(confidence)}</Text>
                    <Text>{getModalMessage(confidence)}</Text>
                </Modal>
            </Portal>

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
                maxLength={2100}
                value={text}
                onChangeText={(t) => setText(t)}
                style={styles.textInput}
            />

            <View style={styles.buttonContainer}>
                <Button
                    mode="outlined"
                    onPress={handleOnPressTentarNovamente}
                    disabled={loading}
                    textColor='#044884'
                    style={styles.btn_again}
                    contentStyle={styles.buttonContent}
                >
                    Tentar novamente
                </Button>

                <Button
                    mode="contained"
                    onPress={handleOnPressUsarTexto}
                    textColor='#fff'
                    style={styles.btn_next}
                    contentStyle={styles.buttonContent}
                >
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
    precisionLevelContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 4,
        paddingBottom: 4,
        justifyContent: "center",
        gap: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#D7D7D7",
        backgroundColor: "white",
        width: 200,
        height: 40,
        marginBottom: 8,
    },
    precisionLevelText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 24,
        paddingLeft: 16,
    },
    progressBarContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        columnGap: 1,
        justifyContent: 'center',
        paddingStart: 16,
        paddingEnd: 16,
    },
    dot: {
        width: 30,
        height: 8,
        borderRadius: 5,
        marginHorizontal: 2,
    },
    textInput: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: "#D7D7D7",
        borderWidth: 1,
        textAlignVertical: 'top',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-around',
        bottom: 0,
        width: '100%',
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
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        width: 250,
        borderRadius: 5,
        alignSelf: 'center', // Centraliza horizontalmente
        justifyContent: 'center', // Centraliza verticalmente
    },
});
