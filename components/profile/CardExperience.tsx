import * as React from 'react';
import { Avatar, Card, IconButton, MD3Colors, ProgressBar, Text } from 'react-native-paper';


export default function CardExperience() {
    const [isProgress, setIsProgress] = React.useState(0);

    return (
        <Card style={{ padding: 25 }}>
            <Card.Title
                title="Nome usuário"
                subtitle="Você é dedicado"
                left={(props) => <Avatar.Image size={38} source={require('../../assets/user_image.svg')} />}
            />
            <ProgressBar progress={isProgress} color={MD3Colors.primary0} />
            <Card.Content>
                <Text variant="bodyMedium" style={{ textAlign: 'right', marginTop: 10 }}>Card content</Text>
            </Card.Content>
        </Card>
    )
}