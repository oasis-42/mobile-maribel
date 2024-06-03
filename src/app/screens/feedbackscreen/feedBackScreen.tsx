import React, { useEffect, useState } from "react";
import { View, Pressable, Text, ScrollView } from "react-native";
import { Link } from "expo-router";
import FeedBackCard from "./feedBackCard";
import { z } from "zod";

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
  const [data, setData] = useState<Feedback>();
  const [error, setError] = useState<{ isError: boolean, message: string }>({ isError: false, message: "" });
  const [loading, setLoading] = useState<boolean>(true);

  async function getData() {
    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/api/v1/ocr/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "text": "Com a\nR.I.P Privacidade\nevolução dos meios de comunicação, ninguém\ntem mais privacidade. Tipo é impossível \"dar perdido\"\nSem que saibam onde você esteve e quando esteve.\nFornecemos nossos dados a empresas poderosas sem termos noção do\nque\nserá feito com isso.\nHoje trocamos nossas informações em troca\nde entretenimento barato. Pior que isso, compartilhamos por vontade própria só para interagir com\na galera, vejo isso como algo preocupante. Pois as\ngrandes empresas do mal\nque\nUsam essas informações, nos veem como carteiras com pernas\ne têm poder para criar governos que as representem. Algo precisa ser feito a respeito disso.\nSe informação é poder, qual é o poder daqueles\nque têm toda a informação do mundo? É preciso\nque nossos melhores cientistas trabalhem nisso\npara pensar em soluções para nos proteger.\nSenão seremos escravizados por grandes corporações e teremos um futuro punk."
        }),
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      const parsedFeedback = FeedbackSchema.parse(json["avaliacao_redacao"]);
      setData(parsedFeedback);

      setLoading(false);
    } catch (err: any) {
      setError({ 
        isError: true,
        message: err.message
      });
    }
  }

  useEffect(() => {
    getData();
  }, [])

  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    )
  }

  if (error.isError) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    )
  }

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
        <FeedBackCard item={data?.["competência 1"]}/>
        <FeedBackCard item={data?.["competência 2"]}/>
        <FeedBackCard item={data?.["competência 3"]}/>
        <FeedBackCard item={data?.["competência 4"]}/>
        <FeedBackCard item={data?.["competência 5"]}/>
      </View>
    </ScrollView>
  );
};

function FeedbackCard({ item }: { item: any }) {
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
              <Text>{item.points} Pontos  </Text>
            </View>
            <Text>{item.description}</Text>
            <Text style={{ marginTop: 16, fontSize: 16 }}>Parecer</Text>
            <Text style={{
              height: 320
            }}>{item.parecer}</Text>
          </View>
        </View>
      </View>
    </View>
  </View>;
}

export default FeedBackScreen;
