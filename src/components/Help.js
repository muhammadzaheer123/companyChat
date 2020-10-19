import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Header from '../sub_components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function Help({navigation}){
    return(
        <View style={styles.container}>
             <Header navigation={navigation} title="Help" />
             <View style={styles.subContainer}>
             <TouchableOpacity onPress={()=>navigation.navigate('Notification')} style={[styles.tiles,{marginTop:50}]}>
                    <Icon name="comments" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>FAQ</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        <TouchableOpacity  style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="id-badge" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:55}}>Contact us</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        <TouchableOpacity style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="file" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:50}}>Terms & Conditions</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                        </View></TouchableOpacity>
                        <TouchableOpacity  style={[styles.tiles,{marginTop:20}]}>
                    <Icon name="shield" size={25}  style={styles.iconSize} />
                    <Text style={{marginLeft:55}}>Security</Text>
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