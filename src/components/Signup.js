import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Header from '../sub_components/Header';
import Toast from 'react-native-simple-toast';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { signupUserApi } from '../Redux/user';



class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }
  submit = (values) => {
    if (!this.state.checked) {
      Toast.show('Please do agree with Terms and Conditions', Toast.SHORT);
    }
    else {
      this.props.signupUserApi(values.name, values.email, values.password, this.props.navigation, 2);

    }
  }
  password = (value) => value && (value.length < 8 ? 'Password must be at least 8 characters long' : undefined)
  email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined

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



  facebookLogin = async () => {
    this.initUser(callBack = (json) => {
      this.props.signupUserApi(json.name, json.email, '12345678', this.props.navigation)
    });


  }
  initUser = async (callBack) => {
    await LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data
            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
              .then((response) => response.json())
              .then((json) => {
                callBack(json);
                // Some user object has been set up somewhere, build that user here
                // user.name = json.name
                // user.id = json.id
                // user.user_friends = json.friends
                // user.email = json.email
                // user.username = json.name
                // user.loading = false
                // user.loggedIn = true
                // user.avatar = setAvatar(json.id)      
              })
              .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
              })
          })
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }


  googleLogin = async () => {
    await GoogleSignin.configure({
      webClientId: '1054694600079-1a8amsl389k3cj16339lpktudr5s8qfj.apps.googleusercontent.com',
      offlineAccess: true


    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { user } = userInfo;
      this.props.signupUserApi(user.name, user.email, '12345678', this.props.navigation)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('1')
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('2')
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('3')
        // play services not available or outdated
      } else {
        alert(error)
        // some other error happened
      }
    }
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', }}>
          <Header navigation={this.props.navigation} color={1} />
          <View style={{ width: '80%', justifyContent: 'flex-end', borderColor: 'white', flexGrow: 0.1 }}>
            <Text style={styles.headerText}>Create Account</Text></View>

          <View style={styles.subContainer}>

            <Field icon="person-outline" name="name" placeholderTextColor='white' keyboardType="default" label="Name: " placeholder="Name" component={this.renderTextInput} />
            <Field icon="mail-outline" name="email" placeholderTextColor='white' keyboardType="email-address" label="Email: " placeholder="Email" component={this.renderTextInput} validate={this.email} />
            <Field icon="compass-outline" secureTextEntry name="password" placeholder="Password" component={this.renderTextInput} validate={this.password} />
            <Field icon="compass-outline" secureTextEntry name="confirm_password" placeholder="Confirm Password" component={this.renderTextInput} />

            <View style={{ width: '100%', borderColor: 'white', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Checkbox

                status={this.state.checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({ checked: !this.state.checked });
                }}
                uncheckedColor="orange"
                color="white"
              />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>I agree to the terms and conditions.</Text>
            </View>
            <TouchableOpacity disabled={this.props.userReducer.signup_loading ? true : false} onPress={handleSubmit(this.submit)} style={styles.button}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Signup</Text>
              {this.props.userReducer.signup_loading ? <LottieView source={require('../assets/lottie/lf30_editor_wbasfrw8.json')} style={{ width: 40, height: 40 }} autoPlay loop /> : null}
            </TouchableOpacity>
            <View style={{ marginTop: 25, marginBottom: 10, justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
              <Text style={{ color: 'white' }}>Already have an account?</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{ color: 'orange' }}> Login</Text>
              </TouchableOpacity>

            </View>
            <View>
              <TouchableOpacity onPress={() => this.facebookLogin()} style={{ width: 180, height: 40, flexDirection: 'row', backgroundColor: '#3C7CFF', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                <View style={{ height: 40, width: 30, justifyContent: 'center', borderRightWidth: 0.5, borderColor: 'white', marginRight: 5 }}><Icon name="logo-facebook" size={20} color="white" /></View>
                <Text style={{ color: 'white' }}>Login with facebook</Text>
              </TouchableOpacity>
              <GoogleSigninButton
                style={{ width: 192, height: 48, right: 5 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.googleLogin}
              />
            </View>
            <View style={{ width: '100%', borderColor: 'white', alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 12, color: '#dedede' }}>{'\u00A9'} Powered by Modern Technology</Text>
            </View>
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
    marginTop: 20,
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
  if (!values.name) {
    errors.name = 'Name is required!'
  }
  if (!values.email) {
    errors.email = 'Email is required!';
  }
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
const mapDispatchToProps = { signupUserApi };
export default compose(connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'SignupScreen',
    validate,
  }))(SignupScreen)