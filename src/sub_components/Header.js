import React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';

export default function Header({navigation,title,color}){
    
    return(
        <View style={{alignItems:'center',flexDirection:'row',marginTop:20,padding:20}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{height:40,width:40,justifyContent:'center'}}>
            <Image source={color!=undefined? require('../constants/imgs/left-arrow_white.png'):require('../constants/imgs/left-arrow.png')} style={{width:20,height:20}} /></TouchableOpacity>
            <Text style={{fontSize:30,fontWeight:'bold',flexGrow:1,textAlign:'center',paddingRight:40,color:color!=undefined?'white':'black'}}>{title}</Text>

        </View>
    )


} 