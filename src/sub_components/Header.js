import React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';

export default function Header({navigation,title}){
    return(
        <View style={{alignItems:'center',flexDirection:'row',marginTop:20,padding:20}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{height:40,width:40,justifyContent:'center'}}>
            <Image source={require('../constants/imgs/left-arrow.png')} style={{width:20,height:20}} /></TouchableOpacity>
            <Text style={{fontSize:30,fontWeight:'bold',flexGrow:1,textAlign:'center',paddingRight:40}}>{title}</Text>

        </View>
    )


} 