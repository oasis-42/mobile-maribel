import * as React from 'react';
import { Card, Button, Switch } from 'react-native-paper';


const CardConfig = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <Card style={{padding: 10}}>
            <Card.Title
                title="Nome config"
                subtitle="Descrição config"
                right={(props) => <Switch value={isSwitchOn} onValueChange={onToggleSwitch}/>}
            />
        </Card >
    )
};

export default CardConfig;