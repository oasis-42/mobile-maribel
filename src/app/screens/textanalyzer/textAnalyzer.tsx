import React, { useEffect, useState } from "react";
import { PaperProvider, Card, Text } from "react-native-paper";
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


  return (
    <PaperProvider>
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
                Continuar
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
                Continuar
              </Text>
            </Pressable>
          </Link>
        </View>


      </View>
      



    </PaperProvider>
  );
}
