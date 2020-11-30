import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, ImagePickerIOS } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import men from '../constants/imgs/men.jpg';
import Header from '../sub_components/Header';
export default function ProfileSettings({ navigation }) {
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const [phone, setPhone] = useState(false);
    const [about, setAbout] = useState(false);
    const [email, setEmail] = useState(false);
    const [textInputdata1, setTextInputdata1] = useState('+1 437 12542');
    const [textInputdata2, setTextInputdata2] = useState('Good Employee');
    const [textInputdata3, setTextInputdata3] = useState('modertech@gmail.com');
    const [image, setImage] = useState('');
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    function imageSelect() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };


                setImage(source);
            }
        });

    }
    console.log(men)
    return (

        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            automaticallyAdjustContentInsets={true}

            style={styles.Container}>
            <View style={styles.subContainer}>
                <Header navigation={navigation} title="Profile Settings" />
                <Image style={styles.profileImage} source={image != '' ? image : men} />
                <TouchableOpacity style={{ position: 'absolute', top: 150, justifyContent: 'center', width: 80, height: 40, alignItems: 'flex-end' }} onPress={() => imageSelect()}>
                    <Image source={require('../constants/imgs/camera.png')} style={{ width: 20, height: 20 }} />

                </TouchableOpacity>
                <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
                    <Text style={{ width: '100%', fontWeight: 'bold', marginLeft: 50 }}>NAME</Text>
                    <View style={styles.smallContainer}>
                        <TextInput editable={false} style={styles.textInput} value="James Bond" onChangeText={(text) => setTextInputdata1(text)} />
                    </View>
                    <Text style={{ width: '100%', fontWeight: 'bold', marginLeft: 50, marginTop: 20 }}>PHONE NUMBER</Text>
                    <View style={styles.smallContainer}>
                        <TextInput keyboardType="number-pad" ref={inputRef1} editable={phone} style={styles.textInput} value={textInputdata1} onChangeText={(text) => setTextInputdata1(text)} />
                        <TouchableOpacity onPress={() => { setPhone(true); inputRef1.current.focus() }}><Image style={styles.editImage} source={require('../constants/imgs/edit.png')} /></TouchableOpacity></View>
                    <Text style={{ width: '100%', marginTop: 20, fontWeight: 'bold', marginLeft: 50 }}>ABOUT</Text>
                    <View style={styles.smallContainer}>
                        <TextInput ref={inputRef2} editable={about} style={styles.textInput} value={textInputdata2} onChangeText={(text) => { setTextInputdata2(text) }} />
                        <TouchableOpacity onPress={() => { setAbout(true); inputRef2.current.focus() }}><Image style={styles.editImage} source={require('../constants/imgs/edit.png')} /></TouchableOpacity></View>
                    <Text style={{ width: '100%', marginTop: 20, fontWeight: 'bold', marginLeft: 50 }}>EMAIL</Text>
                    <View style={styles.smallContainer}>
                        <TextInput ref={inputRef3} editable={email} style={styles.textInput} value={textInputdata3} onChangeText={(text) => { setTextInputdata3(text) }} />
                        <TouchableOpacity onPress={() => { setEmail(true); inputRef3.current.focus() }}><Image style={styles.editImage} source={require('../constants/imgs/edit.png')} /></TouchableOpacity></View>
                </View>
                {(phone || about || email) ?
                    <TouchableOpacity style={styles.updateButton}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Update</Text>
                    </TouchableOpacity>
                    : null}
            </View>

        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,

    },
    subContainer: {
        width: '100%',
        alignItems: 'center'


    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 50,


    },
    smallContainer: {
        width: '100%',
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: '#dedede',
        borderColor: '#cecece',
        flexDirection: 'row'

    },
    textInput: {
        width: 350,
        height: 40,
        borderRadius: 10,
        marginLeft: 20,
        color: 'black'


    },
    editImage: {
        width: 20,
        height: 20,


    },
    updateButton: {
        height: 50,
        width: 200,
        backgroundColor: '#FF9800',
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    }
})