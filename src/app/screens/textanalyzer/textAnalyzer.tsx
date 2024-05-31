import React, { useEffect, useState } from "react";
import { PaperProvider, Card, Text, IconButton, Button, MD3Colors } from "react-native-paper";
import { View, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import {
  black,
  blue300,
} from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function textAnalyzer() {
  const [textData, setTextData] = React.useState([]);

  useEffect(() => {
    fetch("https://api-maribel-production.up.railway.app/api/v1/ocr/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTextData(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, []);

  function onMoreInformation() {
    return ''
  }


  return (
    <PaperProvider>
      <View>
        <Card style={{ display: "flex", alignContent: 'center', width: 200, height: 37, borderRadius: 5, }}>
          <View  style={{ display: "flex", flexDirection:'row',justifyContent: 'space-between', alignItems: 'center'}}>
            <Text variant="titleSmall">Nível de precisão</Text>
            <IconButton
              icon="information-outline"
              iconColor={MD3Colors.primary0}
              size={20}
              onPress={() => onMoreInformation()}
            />
          </View>
        </Card >
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

        <View
          style={{
            borderColor: "black",
            borderWidth: 0.4,
            borderRadius: 12,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            width: 382,
            height: 320,
          }}>
          {textData}
        </View>

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
