
import { View, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";

export default function ConfirmandoTexto() {
    const text = "Com a R.I.P Privacidade evolução dos meios de comunicação, ninguém tem mais privacidade. Tipo é impossível \"dar perdido\" Sem que saibam onde você esteve e quando esteve. Fornecemos nossos dados a empresas poderosas sem termos noção do que será feito com isso. Hoje trocamos nossas informações em troca de entretenimento barato. Pior que isso, compartilhamos por vontade própria só para interagir com a galera, vejo isso como algo preocupante. Pois as grandes empresas do mal que Usam essas informações, nos veem como carteiras com pernas e tem poder para criar governos que as representem. Algo precisa ser feito a respeito disso. Se informação é poder, qual é o poder daqueles que tem toda a informação do mundo. É preciso que nossos melhores cientistas trabalhem nisso para pensar em soluções para nos proteger. Senão seremos escravizados por grandes corporações e terá um futuro punk.";

    return (
        <View>
            <TextInput
                editable
                multiline
                numberOfLines={30}
                maxLength={2000}
                value={text}
                style={{padding: 10}}
            />

            <Button>
                Tirar outra foto
            </Button>

            <Button>
                Continuar
            </Button>
        </View>
    );
}
