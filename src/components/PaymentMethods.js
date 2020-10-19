import React from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import Header from '../sub_components/Header';

export default function PaymentMethod({navigation}){
    return(
        <View style={styles.container}>
           <Header navigation={navigation} title="Payment Methods" />
            <View style={styles.paymentContainer}>

                <TouchableOpacity style={{width:'50%',padding:50}}>
                    <Image source={require('../constants/imgs/paypal.png')} style={{width:100,height:100}} resizeMode="contain" />


                </TouchableOpacity>
                <TouchableOpacity style={{width:'50%',padding:50}}>
                    <Image source={require('../constants/imgs/master-card.png')} style={{width:100,height:100}} resizeMode="contain" />


                </TouchableOpacity>
                <View>

                </View>
            </View>
            <View style={styles.paymentContainer}>

<TouchableOpacity style={{width:'50%',padding:50}}>
    <Image source={require('../constants/imgs/bank.png')} style={{width:100,height:100}} resizeMode="contain" />


</TouchableOpacity>
<TouchableOpacity style={{width:'50%',padding:50}}>
    <Image source={require('../constants/imgs/stipe.png')} style={{width:100,height:100}} resizeMode="contain" />


</TouchableOpacity>
<View>

</View>
</View>
        </View>
    )
}
const styles =StyleSheet.create({
    container:{
        flex:1,
       
    },
    subContainer:{
        alignItems:'center'

    },
    paymentContainer:{
        width:'100%',
        flexDirection:'row'


    }
})
