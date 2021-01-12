import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../sub_components/Header';
import { compose } from '@reduxjs/toolkit'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { loginUserApi } from '../Redux/user';
import LottieView from 'lottie-react-native';
class LoginScreen extends React.Component {
    constructor(props) {
        super(props);


    }

    onSubmit = (values) => {
        this.props.loginUserApi(values.email, values.password, this.props.navigation, 1)
        //console.log('....................', values.email, values.password)
    }
    renderTextInput = (field) => {
        const { meta: { touched, error }, label, secureTextEntry, maxLength, keyboardType, icon, placeholder, input: { onChange, ...restInput } } = field;
        return (
            <View>
                <View style={styles.layout}>
                    <Icon name={icon} size={18} color="white" style={{ marginLeft: 5 }} />

                    <TextInput
                        style={{ width: 300, paddingLeft: 15, color: 'white' }}
                        onChangeText={onChange}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        placeholderTextColor="white"
                        secureTextEntry={secureTextEntry}

                        label={label}

                        {...restInput}
                    />

                </View>
                {((touched && error) && <Text style={{ color: 'orange', fontWeight: 'bold', fontFamily: 'Roboto', marginTop: 5 }}>{error}</Text>)}
            </View>
        );
    }
    render() {

        const { handleSubmit } = this.props;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} color={1} />
                <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', borderColor: 'white', width: '100%', top: 80 }}>
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








                    <Field icon="mail-outline" name="email" placeholderTextColor='white' keyboardType="email-address" label="Email: " placeholder="Email" component={this.renderTextInput} />



                    <Field icon="compass-outline" secureTextEntry name="password" placeholder="Password" component={this.renderTextInput} />

                    <View style={{ width: '100%', marginTop: 20, justifyContent: 'flex-end', flexDirection: 'row' }}><Text style={{ color: 'white' }}>Forgot password?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}><Text style={{ color: 'orange' }}> Click here</Text></TouchableOpacity></View>
                    <TouchableOpacity disabled={this.props.userReducer.signin_loading ? true : false} style={[styles.button, { flexDirection: 'row' }]} onPress={handleSubmit(this.onSubmit)} >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
                        {this.props.userReducer.signin_loading ? <LottieView source={require('../assets/lottie/lf30_editor_wbasfrw8.json')} style={{ width: 40, height: 40 }} autoPlay loop /> : null}
                    </TouchableOpacity>
                    <View style={{ marginTop: 30, marginBottom: 10, justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                        <Text style={{ color: 'white' }}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                            <Text style={{ color: 'orange' }}> Sign up</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

        )
    }
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
        bottom:80
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


const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Email is required!';
    }
    if (!values.password) {
        errors.password = 'Password is required!';
    }



    return errors;
};
const mapStateToProps = (state) => {

    return { userReducer: state.initialReducer }
}
const mapDispatchToProps = { loginUserApi };
export default compose(connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'Login',
        validate,

    }))(LoginScreen)