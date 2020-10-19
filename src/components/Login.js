import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', borderColor: 'white', width: '100%', top: 0 }}>
                <Image source={require('../constants/imgs/dt_logo.png')} style={styles.logo} resizeMode="contain" /></View>

            <View style={styles.subContainer}>
                <View style={{ marginBottom: 30 }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Get Free Consultancy</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <View style={styles.desingLine}></View>
                        <View style={{ position: 'absolute', borderWidth: 3, borderColor: 'orange', width: 50, backgroundColor: 'orange' }} />

                        <View style={[styles.desingLine, { marginLeft: 50 }]}></View>
                    </View>
                </View>








                <View style={styles.layout}>
                    <Icon name="mail-outline" size={18} color="white" style={{ marginLeft: 5 }} />
                    <TextInput placeholder="Email" placeholderTextColor='white' style={styles.textInput} />
                </View>
                <View style={styles.layout}>
                    <Icon name="compass-outline" size={18} color="white" style={{ marginLeft: 5 }} />

                    <TextInput secureTextEntry placeholder="Password" placeholderTextColor='white' style={styles.textInput} /></View>
                <View style={{ width: '100%', marginTop: 20, justifyContent: 'flex-end',flexDirection:'row' }}><Text style={{ color: 'white' }}>Forgot password?</Text>
                <TouchableOpacity><Text style={{color:'orange'}}> Click here</Text></TouchableOpacity></View>
                <TouchableOpacity onPress={() => navigation.navigate('DashBoard')} style={styles.button}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 30, marginBottom: 10, justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                    <Text style={{ color: 'white' }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ color: 'orange' }}> Sign up</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#222534'

    },
    subContainer: {
        position: 'absolute',
        bottom: 100,

        width: '80%',

        justifyContent: 'center',
        alignItems: 'center',



    },
    headerText: {

        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'


    },
    logo: {
        height: 300,
        width: 300,
    },

    textInput: {


        height: 50,
        width: '100%',
        borderRadius: 10,
        textAlign: 'left',
        paddingLeft: 15,



    },
    layout: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderColor: '#FF9800',
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center'

    },
    button: {

        height: 50,
        width: 200,
        backgroundColor: '#FF9800',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20

    },
    desingLine: {
        width: 50,
        borderWidth: 1,
        borderColor: 'white'
    }


});