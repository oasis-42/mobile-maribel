import { CameraView, useCameraPermissions } from 'expo-camera';
import { useContext, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from "react-native-paper";
import api from '../../../sdk/api';
import AppContext from '../../contexts/AppContext';
import { router } from 'expo-router';

export default function Camera() {
    const orientacaoDaCamera = "back";
    const [permission, requestPermission] = useCameraPermissions();

    const cameraRef = useRef<CameraView>();

    const { setBase64Image } = useContext<any>(AppContext);

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

        setBase64Image(base64Image);

        router.push({ pathname: "screens/avaliacaoGuiada/confirmandoFoto/ConfirmandoFoto" });
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={orientacaoDaCamera} ref={(ref) => ref ? cameraRef.current = ref : null}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <IconButton
                            icon="camera"
                            iconColor='#fff'
                            size={38}
                            containerColor='#044884'
                        />
                        {/* <Text style={styles.text}>Take Picture</Text> */}
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