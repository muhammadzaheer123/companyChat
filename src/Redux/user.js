import { createSlice } from '@reduxjs/toolkit'
import { LoginManager,AccessToken } from "react-native-fbsdk";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-simple-toast';
export const initialState = {
  signin_loading: false,
  signup_loading:false,
  forgot_password_loading:false,
  otp_loading:false,
  newPassword_loading:false,
  hasErrors: false,

  userLoginResponse: '',
}

// A slice for recipes with our three reducers
const userAuthentication = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state,{payload}) => {
    
      if(payload==1){
    return{ ...state, signin_loading : true}
      }
      else if(payload==2){
        return{ ...state, signup_loading : true}

      }
      else if(payload==3){
        return{ ...state, forgot_password_loading : true}

      }
      else if(payload==4){
        return{ ...state, otp_loading : true}

      }
      else if(payload==5){
        return{ ...state, newPassword_loading : true}

      }
    },
    userLoginSuccessful: async(state, {payload}) => {
      console.log('data in reducer',payload,'.......',)
      if(payload.value==1){
     
     
     
        const token = JSON.stringify(payload.json.success.token);
        console.log('.............',token)
        await AsyncStorage.setItem('token', token);
        state.signin_loading=false;
      }
      else if(payload.value==2){
        console.log(payload)
         
        const token = JSON.stringify(payload.json.success.token);
        console.log('.............',token)
        await AsyncStorage.setItem('token', token);
        state.signup_loading=false;

      }
      else {
        state.signin_loading=false;
        state.signup_loading=false;
        state.forgot_password_loading=false;
        state.otp_loading=false;
        state.newPassword_loading=false
      }
     
     
    

    },
    userLoginFail: (state,{payload}) => {
      console.log('fail data',payload)
    
      if(payload==1){
      state.signin_loading =false
          }
          else if(payload==2){
         state.signup_loading=false;
    
          }
          else if(payload==3){
         state.forgot_password_loading=false;
    
          }
          else if(payload==4){
            state.otp_loading=false;
          }
          else if(payload==5){
            state.newPassword_loading=false;
          }
    },
  },
})

// Three actions generated from the slice
export const { userLogin, userLoginSuccessful, userLoginFail } = userAuthentication.actions


export default userAuthentication.reducer



export const loginUserApi=(email,password,navigation,value)=>{


  let formdata = new FormData();
  formdata.append('email',email)
  formdata.append('password',password)
  return async dispatch=>{
    // let token=await AsyncStorage.getItem('token');
    // token = await token.replace(/"/g,"")
    dispatch(userLogin(value));
    await fetch('https://dtmoderntech.com/api/login',{

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
  
    },
    body:formdata

    
  })
    .then((response) => response.json())
    .then((json) => {
      // console.log('////////////////////////////////',json)
      if(json.error=='Unauthorised'){
        console.log(json)
         Toast.show('Email or Password is incorrect',Toast.SHORT);
        dispatch(userLoginFail(value));
      }
      else{
     dispatch(userLoginSuccessful({json,value}));
     navigation.navigate('DashBoard')}
    
    })
    .catch((error) => {
      console.log(error);
      dispatch(userLoginFail(value))



    })
}
}
export const signupUserApi=(name,email,password,navigation,value)=>{
  console.log(name,email,password)
let formdata = new FormData();
formdata.append('name',name);
formdata.append('email',email);
formdata.append('password',password)
  return async dispatch=>{
    dispatch(userLogin(value));
    await fetch('https://dtmoderntech.com/api/register',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body:formdata
    }).then((response)=>response.json()).then((json) => {
      if(json.message=='The given data was invalid.'){
        Toast.show('Email is already taken',Toast.SHORT);
        dispatch(userLoginFail(value))

      }else{
      console.log(json)
     dispatch(userLoginSuccessful({json,value}));
      navigation.navigate('DashBoard')
      }
  }).catch((error) => {
    console.log(error);
    dispatch(userLoginFail(value))



  })
}
}

export const signupUserApiGoogle=async(name,email,password,navigation,dispatch)=>{
  console.log(name,email,password)
let formdata = new FormData();
formdata.append('name',name);
formdata.append('email',email);
formdata.append('password',password)
  
    dispatch(userLogin());
    await fetch('https://dtmoderntech.com/api/register',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body:formdata
    }).then((response)=>response.json()).then((json) => {
      console.log(json)
    //  dispatch(userLoginSuccessful(json));
    //  navigation.navigate('DashBoard')

  }).catch((error) => {
    console.log(error);
    dispatch(userLoginFail())



  })
}


export const facebookLogin=async(navigation)=>{
 
 await LoginManager.logInWithPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(async(data) => {
            const { accessToken } = data
        await   fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
          dispatch(signupUserApiGoogle('fff','fff@gmail.com','1234',navigation,dispatch))
          
              // Some user object has been set up somewhere, build that user here
                 
            })
            .catch(() => {
              Toast.show('ERROR GETTING DATA FROM FACEBOOK',Toast.SHORT)
            })
          })
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }
export const forgotPassword=(email,navigation,value)=>{
  let formdata=new FormData();
  formdata.append('email',email);

  return async dispatch=>{
    dispatch(userLogin(value));
    await fetch('https://dtmoderntech.com/api/forget-password',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body:formdata
    }).then((data)=>{
      // navigation.navigate('OTP',{email});
      if(data.status==200){
        navigation.navigate('OTP',{email});
      dispatch(userLoginSuccessful(data.status,value))}else{Toast.show('Email is not registered',Toast.SHORT);dispatch(userLoginFail(value))}}).catch((e)=>{Toast.show(e,Toast.SHORT)
     dispatch(userLoginFail(value))}
    );

  }

}
export const OTPVerify=(email,code,navigation,value)=>{
  console.log(email,code,navigation,value)
  let formdata=new FormData();
  formdata.append('email',email);
  formdata.append('code',code);
  console.log('formdata',formdata)

  return async dispatch=>{
    dispatch(userLogin(value));
    await fetch('https://dtmoderntech.com/api/code',{
      method:'POST',
      headers:{
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body:formdata
      }
    }).then(async(data)=>{
      const t=await data.json()
      console.log(data,t)
      if(data.status==200){
      navigation.navigate('PasswordChange',{email});
      dispatch(userLoginSuccessful(data.status,value))}else{Toast.show('Code is invalid',Toast.SHORT);dispatch(userLoginFail(4))}}).catch((e)=>{Toast.show(e,Toast.SHORT)
     dispatch(userLoginFail(value))}
    );
  }

}
export const updatePassword=(email,password,navigation,value)=>{
  let formdata=new FormData();
  formdata.append('email',email);
  formdata.append('password',password);
  return async dispatch=>{
    dispatch(userLogin(value));
    await fetch('https://dtmoderntech.com/api/change-password',{
      method:'POST',
      headers:{
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body:formdata
      }
    }).then((data)=>{
      if(data.status==200){
      navigation.navigate('DashBoard');
      dispatch(userLoginSuccessful(data.status,value))}else{Toast.show('Something went wrong',Toast.SHORT);dispatch(userLoginFail(value))}}).catch((e)=>{Toast.show('Something went wrong',Toast.SHORT)
     dispatch(userLoginFail(value))}
    );
  }

}
