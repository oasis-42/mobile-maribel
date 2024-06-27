import { CameraView, useCameraPermissions } from 'expo-camera';
import { useContext, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton, ActivityIndicator } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import api from '../../../../sdk/api';
import AppContext from '../../../contexts/AppContext';
import { router } from 'expo-router';

export default function Camera() {
    const [loading, setLoading] = useState(false);
    const orientacaoDaCamera = "back";
    const [permission, requestPermission] = useCameraPermissions();
    const [galleryPermission, requestGalleryPermission] = ImagePicker.useMediaLibraryPermissions();

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

    if (!galleryPermission) {
        return <View />;
    }

    if (!galleryPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to access the gallery</Text>
                <Button onPress={requestGalleryPermission} title="grant permission" />
            </View>
        );
    }

    async function takePicture() {
        setLoading(true);
        const capturedPicture = await cameraRef.current?.takePictureAsync({ base64: true, imageType: 'png' });
        const base64Image = capturedPicture?.base64;

        if (!base64Image) return;

        setBase64Image(base64Image);

        setLoading(false);
        router.push({ pathname: "screens/typeOfAssessment/cameraSelected/photoConfirmation" });
    }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const base64Image = result.assets[0].base64;

            if (base64Image) {
                setBase64Image(base64Image);
                router.push({ pathname: "screens/typeOfAssessment/cameraSelected/photoConfirmation" });
            }
        }
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={orientacaoDaCamera} ref={(ref) => ref ? cameraRef.current = ref : null}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.galleryButton]} onPress={pickImage}>
                        <IconButton
                            icon="image"
                            iconColor='#fff'
                            size={28}
                            containerColor='#808080'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cameraButton]} onPress={takePicture}>
                        {loading ? (
                            <ActivityIndicator color="#fff" style={styles.indicator} animating={true} />
                        ) : (
                            <IconButton
                                icon="camera"
                                iconColor='#fff'
                                size={34}
                                containerColor='#044884'
                            />
                        )}
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
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    loading: {
        alignSelf: 'center',
    },
    button: {
        borderRadius: 50,
    },
    galleryButton: {
        position: 'absolute',
        left: 40,
        backgroundColor: '#808080',
        
    },
    cameraButton: {
        backgroundColor: '#044884',
        alignSelf: 'center',
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        width: 34,
        height: 34,
    },
});
