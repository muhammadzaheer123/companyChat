import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import Header from '../sub_components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Notification({navigation}){
     function alertFunc(){
        Alert.alert(
            'Warning',
            'Do you want to restore default settings.',
         
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
             <Header navigation={navigation} title="Notification" />
             <View style={styles.subContainer}>
             <TouchableOpacity onPress={()=>navigation.navigate('MessageNotification')} style={[styles.tiles,{marginTop:50}]}>
                    <Icon name="bell" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>Message Notification</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        <TouchableOpacity onPress={()=>console.log('ok')} style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="history" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>Call</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        {/* <TouchableOpacity onPress={()=>navigation.navigate('Order')} style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="key" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>In App</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity> */}
                        <TouchableOpacity onPress={()=>alertFunc()} style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="cog" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>Restore default settings</Text>
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