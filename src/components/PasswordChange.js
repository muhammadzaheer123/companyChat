import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Header from '../sub_components/Header';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { updatePassword } from '../Redux/user';



class PasswordChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    submit = (values) => {

        this.props.updatePassword(this.props.route.params.email, values.password, this.props.navigation, 5);


    }
    password = (value) => value && (value.length < 8 ? 'Password must be at least 8 characters long' : undefined)


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
                {((onChange && error) && <Text style={{ color: 'orange', fontWeight: 'bold', fontFamily: 'Roboto', marginTop: 5 }}>{error}</Text>)}
            </View>
        );
    }




    render() {

        const { handleSubmit } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ alignItems: 'center', }}>
                    <Header navigation={this.props.navigation} title="Update Password" color={1} />
                    <View style={styles.subContainer}>
                        <Field icon="compass-outline" secureTextEntry name="password" placeholder="Password" component={this.renderTextInput} validate={this.password} />
                        <Field icon="compass-outline" secureTextEntry name="confirm_password" placeholder="Confirm Password" component={this.renderTextInput} />
                        <TouchableOpacity disabled={this.props.userReducer.signup_loading ? true : false} onPress={handleSubmit(this.submit)} style={styles.button}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Update</Text>
                            {this.props.userReducer.signup_loading ? <LottieView source={require('../assets/lottie/lf30_editor_wbasfrw8.json')} style={{ width: 40, height: 40 }} autoPlay loop /> : null}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',

        backgroundColor: '#222534',

    },
    subContainer: {
        marginTop: 100,
        width: '80%',
        flex: 1,

        alignItems: 'center',


    },
    logo: {
        height: 300,
        width: 300,
    },
    headerText: {

        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'



    },
    textInput: {


        height: 50,
        width: '90%',

        textAlign: 'left',
        marginTop: 20,
        paddingLeft: 10,


    },
    layout: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#FF9800',
        borderRadius: 10,
        marginTop: 20

    },
    button: {

        height: 50,
        width: 200,
        backgroundColor: '#FF9800',

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
        flexDirection: 'row'

    }

});

const validate = (values) => {
    const errors = {};
    console.log(values)

    if (!values.password) {
        errors.password = 'Password is required!';
    }
    if (!values.confirm_password) {

        errors.confirm_password = 'Confirm Password is required!'

    }
    if (values.password != values.confirm_password) {
        errors.confirm_password = 'Confirm Password is not matched!'
    }




    return errors;
};
const mapStateToProps = (state) => {

    return { userReducer: state.initialReducer }
}
const mapDispatchToProps = { updatePassword };
export default compose(connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'PasswordChange',
        validate,
    }))(PasswordChange)