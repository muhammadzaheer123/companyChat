import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import Header from '../sub_components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast'
import LottieView from 'lottie-react-native';
import {forgotPassword} from '../Redux/user';

function ForgotPassword({forgotPassword,navigation,userReducer}){
    console.log(userReducer.forgot_password_loading)
    const[email,setEmail]=React.useState('');
return(
    <View style={styles.container}>

     <Header navigation={navigation} title="Forgot Password" color={1} />
     <View style={styles.layout}>
                    <Icon name="mail-outline" size={18} color="white" style={{ marginLeft: 5 }} />
                    <TextInput placeholder="Enter Your Email" placeholderTextColor='white' style={styles.textInput} keyboardType="email-address" onChangeText={(text)=>setEmail(text)} />
                    </View>
                    <TouchableOpacity disabled={userReducer.forgot_password_loading?true:false} onPress={()=>{if(email!=''){forgotPassword(email,navigation,3)}else{Toast.show('Please enter email carefully',Toast.SHORT)}}} style={styles.buttonStyle}>
                        <Text style={styles.textStyle}>Done</Text>
                        {userReducer.forgot_password_loading?<LottieView source={require('../assets/lottie/lf30_editor_wbasfrw8.json')} style={{width:40,height:40}} autoPlay loop />:null}
                    </TouchableOpacity>
    </View>
    
)

}

const styles=StyleSheet.create({
container:{
    flex:1,
    backgroundColor: '#222534',
    alignItems:'center',
   
},
layout: {
    flexDirection: 'row',
    width: '80%',
    borderWidth: 1,
    borderColor: '#FF9800',
    borderRadius: 10,
    marginTop: 200,
    alignItems: 'center'

},
textInput: {


    height: 50,
    width: '70%',
    borderRadius: 10,
    textAlign: 'left',
    paddingLeft: 15,
    color:'white'



},
buttonStyle:{
    height:50,
    width:'35%',
    backgroundColor:'orange',
    borderRadius:6,
    marginTop:30,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  
},
textStyle:{
    color:'white',
    fontSize:18,
    fontWeight:'bold'
}
})

const mapStateToProps=(state)=>{
 
    return{userReducer:state.initialReducer}
}
const mapDispatchToProps={forgotPassword};
export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);