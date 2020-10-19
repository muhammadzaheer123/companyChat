import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image,Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
import { LoginManager,AccessToken } from "react-native-fbsdk";



export default function SignupScreen({navigation}) {
    const [checked, setChecked] = React.useState(false);
 const facebookLogin=async()=>{
    
    await LoginManager.logInWithPermissions(["public_profile"]).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
          AccessToken.getCurrentAccessToken().then((accessToken) => console.log(accessToken))
            console.log(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
            );
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        }
      );
  }
 const  googleLogin = async () => {
    await GoogleSignin.configure({
         webClientId:'1054694600079-1a8amsl389k3cj16339lpktudr5s8qfj.apps.googleusercontent.com',
         offlineAccess: true
        
        
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
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
    return (
        <View style={styles.container}>
                  <View style={{width:'80%',justifyContent:'flex-end',borderColor:'white',flexGrow:0.1}}>
           <Text style={styles.headerText}>Create Account</Text></View>
         
            <View style={styles.subContainer}>
            
 

           
         
                   <View style={styles.layout}>
                       <Icon name="person-outline" size={18} color="white" style={{marginLeft:5}} />

                <TextInput placeholder="Name" placeholderTextColor="white" style={[styles.textInput,{marginTop:0}]} />
              
               </View>
               <View style={styles.layout}>
                       <Icon name="mail-outline" size={18} color="white" style={{marginLeft:5}} />

                <TextInput keyboardType="email-address" placeholderTextColor="white" placeholder="Email" style={[styles.textInput,{marginTop:0}]} />
              
               </View>
               <View style={styles.layout}>
                       <Icon name="compass-outline" size={18} color="white" style={{marginLeft:5}} />

                <TextInput secureTextEntry placeholderTextColor="white" placeholder="Password" style={[styles.textInput,{marginTop:0}]} />
              
               </View>
               <View style={styles.layout}>
                       <Icon name="compass-outline" size={18} color="white" style={{marginLeft:5}} />

                <TextInput secureTextEntry placeholderTextColor="white"  placeholder="Confirm Password"  style={[styles.textInput,{marginTop:0}]} />
              
               </View>
               <View style={{width:'100%',borderColor:'white',flexDirection:'row',alignItems:'center',marginTop:10}}>
                   <Checkbox
                  
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                    uncheckedColor="orange"
                    color="white"
                    />
                    <Text style={{color:'white',fontWeight:'bold'}}>I agree to the terms and conditions.</Text>
                    </View>
                <TouchableOpacity onPress={()=>navigation.navigate('DashBoard')} style={styles.button}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Signup</Text>
                </TouchableOpacity>
                <View style={{marginTop:25,marginBottom:10,justifyContent:'center',flexDirection:'row',width:'100%'}}>
             <Text style={{color:'white'}}>Already have an account?</Text>
             <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                 <Text style={{color:'orange'}}> Login</Text>
             </TouchableOpacity>

                </View>
                <View>
              <TouchableOpacity onPress={()=>facebookLogin()} style={{width:180,height:40,flexDirection:'row',backgroundColor:'#3C7CFF',alignItems:'center',padding:10,borderRadius:5}}>
                  <View style={{height:40,width:30,justifyContent:'center',borderRightWidth:0.5,borderColor:'white',marginRight:5}}><Icon name="logo-facebook" size={20} color="white" /></View>
                  <Text style={{color:'white'}}>Login with facebook</Text>
              </TouchableOpacity>
              <GoogleSigninButton
    style={{ width: 192, height: 48,right:5 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={googleLogin}
     />
      </View>
                <View style={{width:'100%',borderColor:'white',alignItems:'flex-end'}}>
                    <Text style={{fontSize:12,color:'#dedede'}}>{'\u00A9'} Powered by Modern Technology</Text>
                </View>
            </View>
            </View>
       
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor:'#222534'
    },
    subContainer:{
        marginTop:50,
        width:'80%',
        flex:1,
      
        alignItems:'center',
    

    },
    logo:{
        height:300,
        width:300,
      },
    headerText: {

        fontSize: 25,
        fontWeight: 'bold',
        color:'white'
    


    },
    textInput: {
      
       
        height: 50,
        width: '90%',
      
        textAlign:'left',
        marginTop:20,
        paddingLeft:10,
      
    
    },
    layout:{
        flexDirection:'row',
        alignItems:'center',
         width:'100%',
         borderWidth: 1,
         borderColor: '#FF9800', 
        borderRadius: 10,
        marginTop:20

    },
    button: {
      
        height: 50,
        width: 200,
        backgroundColor: '#FF9800',

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop:30
        
    }

});