import React, { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { View, Pressable, Text, ScrollView } from "react-native";
import { Link } from "expo-router";
import FeedBackCard from "./feedBackCard";
import {
  black,
  blue300,
} from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const FeedBackScreen: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<any[]>([]);

  useEffect(() => {
    fetch( 'https://api-maribel-production.up.railway.app/api/v1/ocr/feedback')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFeedbackData(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, []);

  return (
    <PaperProvider>
      <ScrollView>
      <View
        style={{
          gap: 8,
          paddingVertical: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {feedbackData.map((item) => (
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
            }}
            key={item.key}>
            <View
              style={{
                display: "flex",
              }
            }>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 382,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 8,
                  }}>
                <View>
                  
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 4,
                  }}>
                <Text>Competência {item.competencia}   </Text>
                <Text>{item.points} Pontos  </Text>
                </View>
                <Text>{item.description}</Text>
                <Text style={{marginTop: 16, fontSize: 16}}>Parecer</Text>
                <Text style={{
                  height: 320
                }}>{item.parecer}</Text>
                </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default FeedBackScreen;
