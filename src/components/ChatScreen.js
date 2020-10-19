import React from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';

export default function ChatScreen({navigation}){
    return(
        <View style={styles.container}>
            <Button title="click" onPress={()=>navigation.navigate('ChatView')} />
            
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})