import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Linking} from 'react-native';
import Header from '../sub_components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Settings({navigation}){
    return(
        <View style={styles.container}>
             <Header navigation={navigation} title="Settings" />
             <View style={styles.subContainer}>
             <TouchableOpacity onPress={()=>navigation.navigate('Notification')} style={[styles.tiles,{marginTop:50}]}>
                    <Icon name="bell" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>Notifications</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('Help')} style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="info-circle" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>Help</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('Authentication')} style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="key" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:45}}>Authentication</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        <TouchableOpacity onPress={()=>Linking.openURL('http://dtmoderntech.com/')} style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="asterisk" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>Rafer us</Text>
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