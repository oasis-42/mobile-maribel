import * as React from 'react';
import { Card, Button, Switch } from 'react-native-paper';

export default function CardConfig({title='', describe='', check=false}) {
    const [isSwitchOn, setIsSwitchOn] = React.useState(check);

    function onToggleSwitch(check:boolean) {
        setIsSwitchOn(!isSwitchOn);
    }

    return (
        <Card style={{ padding: 10 }}>
            <Card.Title
                title={title}
                subtitle={describe}
                right={(props) => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
            />
        </Card >
    )
};