
import { View, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";
import AppContext from "../../../contexts/AppContext";
import { useContext, useState } from "react";
import { router } from "expo-router";

export default function ConfirmandoTexto() {
    const { text, setText, setFeedback } = useContext<any>(AppContext);

    // const textvar = "Com a R.I.P Privacidade evolução dos meios de comunicação, ninguém tem mais privacidade. Tipo é impossível \"dar perdido\" Sem que saibam onde você esteve e quando esteve. Fornecemos nossos dados a empresas poderosas sem termos noção do que será feito com isso. Hoje trocamos nossas informações em troca de entretenimento barato. Pior que isso, compartilhamos por vontade própria só para interagir com a galera, vejo isso como algo preocupante. Pois as grandes empresas do mal que Usam essas informações, nos veem como carteiras com pernas e tem poder para criar governos que as representem. Algo precisa ser feito a respeito disso. Se informação é poder, qual é o poder daqueles que tem toda a informação do mundo. É preciso que nossos melhores cientistas trabalhem nisso para pensar em soluções para nos proteger. Senão seremos escravizados por grandes corporações e terá um futuro punk.";

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
                style={{ padding: 10 }}
            />

            {/* BTNS */}
            <View style={{
                display: "flex",
                flexDirection: "row",
                padding: 10,
                gap: 8
            }}>

                <Button style={{
                    backgroundColor: "#FFFFFF",
                    width: "auto",
                    height: 56,
                    flex: 1,
                    justifyContent: "center",
                    padding: 8,
                    borderRadius: 7,
                    borderColor: "#044884"
                }}>
                    Tentar novamente
                </Button>

                <Button style={{
                    backgroundColor: "#044884",
                    width: "auto",
                    height: 56,
                    flex: 1,
                    justifyContent: "center",
                    padding: 8,
                    borderRadius: 7
                }} onPress={handleOnPressUsarTexto} >
                    Usar texto
                </Button>

            </View>
        </View>
    );
}
