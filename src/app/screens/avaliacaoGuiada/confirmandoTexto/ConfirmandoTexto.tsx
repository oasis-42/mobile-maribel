
import React, { View, Image, Text, TextInput, StyleSheet } from "react-native";
import { Button, ActivityIndicator, IconButton, Card } from "react-native-paper";
import AppContext from "../../../contexts/AppContext";
import { useContext, useState } from "react";
import { router } from "expo-router";

export default function ConfirmandoTexto() {
    const [loading, setLoading] = useState(false);
    const [accuracy, setAccuracy] = useState(0);
    const { text, setText, setFeedback } = useContext<any>(AppContext);

    // const textvar = "Com a R.I.P Privacidade evolução dos meios de comunicação, ninguém tem mais privacidade. Tipo é impossível \"dar perdido\" Sem que saibam onde você esteve e quando esteve. Fornecemos nossos dados a empresas poderosas sem termos noção do que será feito com isso. Hoje trocamos nossas informações em troca de entretenimento barato. Pior que isso, compartilhamos por vontade própria só para interagir com a galera, vejo isso como algo preocupante. Pois as grandes empresas do mal que Usam essas informações, nos veem como carteiras com pernas e tem poder para criar governos que as representem. Algo precisa ser feito a respeito disso. Se informação é poder, qual é o poder daqueles que tem toda a informação do mundo. É preciso que nossos melhores cientistas trabalhem nisso para pensar em soluções para nos proteger. Senão seremos escravizados por grandes corporações e terá um futuro punk.";

    function getBaseHeaders() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }

    async function handleFeedback() {
        const raw = JSON.stringify({
            "text": text,
            "confidence": accuracy 
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
        setLoading(true);
        await handleFeedback();
        setLoading(false);
        router.push({ pathname: "screens/feedbackscreen/feedBackScreen" });
    }

    function handleOnPressTentarNovamente() {
        router.push({ pathname: "screens/camera/cameraScreen" });
    }

    const getColor = (index: number, totalDots: number, accuracy: number) => {
        const percentage = (index + 1) / totalDots;

        if (percentage <= accuracy) {
            if (accuracy <= 0.5) return 'red';
            if (percentage <= 0.75) return 'yellow';
            return 'green';
        }

        return '#e0e0e0';
    };

    return (
        <View style={styles.container}>
            {/* <Card style={styles.card}>
                <View style={styles.cardContent}>
                <Text>Nível de precisão</Text>
                <IconButton icon="information" size={20} onPress={() => {}} />
                </View>
            </Card> */}

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingStart: 8,
                    paddingEnd: 8,
                    paddingTop: 4,
                    paddingBottom: 4,
                    // justifyContent: "space-between",
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
                <Text style={{ fontWeight: "600", fontSize: 16, lineHeight: 24}}>Nível de precisão</Text>
                <IconButton icon="information" size={20} onPress={() => {}} />
            </View>


            <View style={styles.progressBarContainer}>
                {[...Array(10)].map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: getColor(index, 10, accuracy) },
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
                <Button style={styles.btn_again} onPress={handleOnPressTentarNovamente} disabled={loading}>
                    Tentar novamente
                </Button>

                <Button style={styles.btn_next} onPress={handleOnPressUsarTexto}>
                    {loading ? <ActivityIndicator animating={true} color="white" /> : "Usar texto"}
                </Button>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8', // cor de fundo opcional
        rowGap: 4
    },
    card: {
        marginBottom: 10,
        paddingTop: 4,
        paddingBottom: 4,
        paddingEnd: 8,
        paddingStart: 8,
        width: 160
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBarContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        columnGap: 1,
        justifyContent: 'center',
        paddingStart: 15,
        paddingEnd: 15
    },
    progressBar: {
        height: '100%',
        width: '100%', // This should reflect the accuracy percentage
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
