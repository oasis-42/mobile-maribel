import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";

import { PaperProvider, Card, Text, IconButton, Button, MD3Colors } from "react-native-paper";
import { View, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import {
  black,
  blue300,
} from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function textAnalyzer() {
  const [textData, setTextData] = React.useState([]);

  // useEffect(() => {
  //   fetch("https://api-maribel-production.up.railway.app/api/v1/ocr/")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setTextData(data);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with your fetch operation:", error);
  //     });
  // }, []);

  const textvar = "Com a R.I.P Privacidade evolução dos meios de comunicação, ninguém tem mais privacidade. Tipo é impossível \"dar perdido\" Sem que saibam onde você esteve e quando esteve. Fornecemos nossos dados a empresas poderosas sem termos noção do que será feito com isso. Hoje trocamos nossas informações em troca de entretenimento barato. Pior que isso, compartilhamos por vontade própria só para interagir com a galera, vejo isso como algo preocupante. Pois as grandes empresas do mal que Usam essas informações, nos veem como carteiras com pernas e tem poder para criar governos que as representem. Algo precisa ser feito a respeito disso. Se informação é poder, qual é o poder daqueles que tem toda a informação do mundo. É preciso que nossos melhores cientistas trabalhem nisso para pensar em soluções para nos proteger. Senão seremos escravizados por grandes corporações e terá um futuro punk.";



  function onMoreInformation() {
    return ''
  }


  return (
    <PaperProvider>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingVertical: 1,
          justifyContent: "space-between",
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#D7D7D7",
          backgroundColor: "white",
          width: 200
        }}
      >
        <Text variant="titleSmall">Nível de precisão</Text>
        <IconButton
          icon="information-outline"
          iconColor={MD3Colors.primary0}
          size={20}
          onPress={() => onMoreInformation()}
        />
      </View>

      <View
        style={{
          gap: 8,
          paddingVertical: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <ScrollView
          style={{
            flexDirection: "column",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#D7D7D7",
            paddingHorizontal: 8,
            paddingVertical: 14,
            backgroundColor: "white",
            gap: 10,
          }}
        >
          <TextInput
            editable
            multiline
            numberOfLines={30}
            maxLength={2000}
            value={textvar}
            style={{ padding: 10 }}
          />
        </ScrollView>


        {/* BTNS */}
        <View style={{
          display: "flex",
          flexDirection: "row",
          padding: 10,
          gap: 8
        }}>
          <Link href={"/screens/feedbackscreen/feedBackScreen"} asChild>
            <Pressable
              style={{
                backgroundColor: "#FFFFFF",
                width: "auto",
                height: 56,
                flex: 1,
                justifyContent: "center",
                padding: 8,
                borderRadius: 7,
                borderColor: "#044884"
              }}
            >
              <Text
                style={{
                  color: "#044884",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Tentar novamente
              </Text>
            </Pressable>
          </Link>
          <Link href={"/screens/feedbackscreen/feedBackScreen"} asChild>
            <Pressable
              style={{
                backgroundColor: "#044884",
                width: "auto",
                height: 56,
                flex: 1,
                justifyContent: "center",
                padding: 8,
                borderRadius: 7
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Usar texto
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>




    </PaperProvider>
  );
}
