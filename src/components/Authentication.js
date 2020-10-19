import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import Header from '../sub_components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Authentication({navigation}){
    function alertFunc(){
        Alert.alert(
            'Warning',
            'Are you sure to delete account.',
         
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
            },
            {
              text: 'Confirm', 
              onPress: () => console.log('OK Pressed')
            },
          ],
          {cancelable: false},
        )

    }
    return(
        <View style={styles.container}>
             <Header navigation={navigation} title="Authentication" />
             <View style={styles.subContainer}>
             <TouchableOpacity onPress={()=>navigation.navigate('Notification')} style={[styles.tiles,{marginTop:50}]}>
                    <Icon name="info" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>Request Account Info</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        <TouchableOpacity onPress={()=>alertFunc()} style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="user-times" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:35}}>Delete Account</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('Order')} style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="dollar" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>Pay Withdraw</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('Order')} style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="shield" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>Security</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                 
                 </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
      
     
    },
    subContainer:{
        width:'100%',
        alignItems:'center'
  
  
      },
      arrowContainer:{
        flexGrow:1,
    
        alignItems:'flex-end'

    },
    tiles:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:5,
        paddingBottom:5,
        height:50,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        borderWidth:0.5,
        borderColor:'#dedede',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation:1,
    

    },
})