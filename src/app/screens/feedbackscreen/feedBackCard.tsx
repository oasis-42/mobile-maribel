import { useEffect, useState } from "react"
import { View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";



export default function FeedBackCard({key, points, competencia, parecer} : {points : number, competencia : string, parecer : string, key : number}) {

    return(
        <PaperProvider>
            <View key={key}>
            <Text >{points}</Text>
                <Text>{competencia}</Text>
                <Text>{parecer}</Text>
            </View>
                
        </PaperProvider>
    )
}