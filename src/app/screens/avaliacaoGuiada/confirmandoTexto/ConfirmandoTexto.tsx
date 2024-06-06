
import { View, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";
import AppContext from "../../../contexts/AppContext";
import { useContext, useState } from "react";

export default function ConfirmandoTexto() {
    const { text, setText } = useContext<any>(AppContext);

    return (
        <View>
            <TextInput
                editable
                multiline
                numberOfLines={30}
                maxLength={2000}
                value={text}
                onChangeText={(t) => setText(t)}
                style={{padding: 10}}
            />

            <Button>
                Tentar novamente
            </Button>

            <Button>
                Usar texto
            </Button>
        </View>
    );
}
