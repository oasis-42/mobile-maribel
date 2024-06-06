import { router } from "expo-router";
import { View, Image } from "react-native";
import { Button } from "react-native-paper";
import api from "../../../../sdk/api";
import { useState } from "react";

export default function ConfirmandoFoto() {
    const base64Image = "";

    // const [data, setData] = useState<any>();
    // const [error, setError] = useState<any>();
    // const [isLoading, setIsLoading] = useState<any>();

    async function consegueTextoProcessadoPeloOcr() {
        const { data, error, isLoading } = api.processOcr(base64Image); 
    }

    function vaiParaTelaDeConfirmandoTexto() {
        
    }

    return (
        <View>
            <Image 
                source={{ uri: `data:image/png;base64,${base64Image}` }} 
                style={{ width: 200, height: 200 }}
            />

            <Button>
                Tirar outra foto
            </Button>

            <Button onPress={() => {
                router.push({ pathname: "screens/avaliacaoGuiada/confirmandoTexto/ConfirmandoTexto" });
            }}>
                Continuar
            </Button>
        </View>
    );
}
