import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../../sdk/api';
import { router } from 'expo-router';

export default function Camera() {
    const orientacaoDaCamera = "back";
    const [permission, requestPermission] = useCameraPermissions();

    const cameraRef = useRef<CameraView>();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    async function takePicture() {
        const capturedPicture = await cameraRef.current?.takePictureAsync({ base64: true, imageType: 'png' });
        const base64Image = capturedPicture?.base64;

        if (!base64Image) return;

        router.push({ pathname: "screens/avaliacaoGuiada/confirmandoFoto/ConfirmandoFoto", params: { base64Image }});

        // const { data, error, isLoading } = api.processOcr(imageBase64);

        // while (isLoading) {

        // }

        // router.push()
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={orientacaoDaCamera} ref={(ref) => ref ? cameraRef.current = ref : null}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});