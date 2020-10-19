import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { Switch } from 'react-native-paper';
import Header from '../sub_components/Header';
export default function MessageNotification ({navigation}){
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return(
        <View style={styles.container}>
                 <Header navigation={navigation} title="Message Notification" />
            <View style={styles.subContainer}>
            <Switch style={{height:50,width:50,right:10}} value={isSwitchOn} onValueChange={onToggleSwitch} color="orange" /></View>
            <View style={styles.instructionsContainer}>
                <Text style={[styles.text,{marginTop:0}]}>1) Do you want to show Notifications or not.</Text>
                <Text style={styles.text}>2) Do you want to show Notifications on Screen or not.</Text>


            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    subContainer:{
        width:'100%',
        alignItems:'flex-end',
        
        

    },
    instructionsContainer:{
        padding:20,
        width:'100%',
        alignItems:'flex-start'


    },
    text:{
        marginTop:10,
        height:40,
        width:'100%',
        shadowColor: "#000",
        backgroundColor:'white',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation:1,
        padding:10,
        borderRadius:5
    
    }

})