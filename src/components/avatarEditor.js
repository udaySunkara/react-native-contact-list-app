import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View, Platform, StyleSheet, Text } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

const AvatarEditor = ({avatarImage, addImage}) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
            addImage(result.uri);
        }
    };


    return <View style={styles.container}>
        {avatarImage || image ? <TouchableOpacity onPress={pickImage}><Image source={{ uri: (image || avatarImage) }} style={styles.image} /></TouchableOpacity> : <TouchableOpacity onPress={pickImage}><FontAwesome name="user-circle-o" size={120} color="black" /></TouchableOpacity>}
    </View>
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75
    }
});

export default AvatarEditor;