import React, { useContext, useEffect, useState } from "react";
import { View, Pressable, Text, ScrollView } from "react-native";
import { Link } from "expo-router";
import { z } from "zod";
import AppContext from "../../contexts/AppContext";

const baseUrl = "https://api-maribel-production.up.railway.app";

const CompetenciaSchema = z.object({
  nota: z.number(),
  parecer: z.string(),
  acertos: z.object({
    trecho: z.string(),
    "por que se aplicam": z.string()
  }),
  erros: z.object({
    trecho: z.string(),
    "por que se aplicam": z.string()
  }),
  "sugestões": z.object({
      "trecho": z.string(),
      "reescrita": z.string()
  })
});

const FeedbackSchema = z.object({
  "competência 1": CompetenciaSchema,
  "competência 2": CompetenciaSchema,
  "competência 3": CompetenciaSchema,
  "competência 4": CompetenciaSchema,
  "competência 5": CompetenciaSchema,
});

type Feedback = z.infer<typeof FeedbackSchema>;

function FeedBackScreen() {
  const { feedback } = useContext<any>(AppContext);

  return (
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
        <FeedbackCard item={feedback.avaliacao_redacao?.["competência 1"]}/>
        <FeedbackCard item={feedback.avaliacao_redacao?.["competência 2"]}/>
        <FeedbackCard item={feedback.avaliacao_redacao?.["competência 3"]}/>
        <FeedbackCard item={feedback.avaliacao_redacao?.["competência 4"]}/>
        <FeedbackCard item={feedback.avaliacao_redacao?.["competência 5"]}/> 
      </View>
    </ScrollView>
  );
};

function FeedbackCard({ item }: { item: any }) {
  return <View
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
      }}>
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
              <Text>Nota: {item.nota}</Text>
            </View>
            <Text>{item.description}</Text>
            <Text style={{ marginTop: 16, fontSize: 16 }}>Parecer</Text>
            <Text style={{
              height: 320
            }}>{item.parecer}</Text>

            <Text>Acertos: {item.acertos.trecho}</Text>

            <Text>Erros: {item.erros.trecho}</Text>
          </View>
        </View>
      </View>
    </View>
  </View>;
}

export default FeedBackScreen;
