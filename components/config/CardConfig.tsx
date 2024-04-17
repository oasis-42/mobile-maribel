import * as React from 'react';
import { Card, Button, Switch } from 'react-native-paper';


const CardConfig = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <Card>
            <Card.Title
                title="Nome usuário"
                subtitle="Você é dedicado"
                right={(props) => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
            />
        </Card >
    )
};

export default CardConfig;