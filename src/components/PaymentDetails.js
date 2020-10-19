import React from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../sub_components/Header';
export default function PaymentDetails({navigation}){
    return(
        <View style={styles.container}>
             <Header navigation={navigation} title="Payment Details" />
            <View style={styles.paymentContainer}>
                <View style={styles.columnPaymentContainer}>
                    <Text style={styles.text}>Total Payment:</Text>
                    <Text style={[styles.text,{marginTop:50}]}>Pending Payment:</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('PaymentMethods')} style={styles.customButton}><Text style={styles.text}>Payment Method</Text>
                <Icon name="angle-right" size={25} color="#222534" style={{flexGrow:1,textAlign:'right',marginRight:10}} /></TouchableOpacity>
                    <Text style={[styles.text,{marginTop:100}]}>Payment Transaction:</Text>


                </View>
                <View style={[styles.columnPaymentContainer,{alignItems:'flex-end',paddingRight:20}]}>
                <Text style={styles.text}>$1000</Text>
                    <Text style={[styles.text,{marginTop:50}]}>$400</Text>
                    <Text style={[styles.text,{marginTop:100}]}>Done</Text>

                </View>

            </View>




        </View>
    )


}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    subContainer: {
      
        alignItems: 'center'


    },
    paymentContainer:{
        padding:10,
        flexDirection:'row',
        marginTop:30,
        shadowColor: "#000",
        backgroundColor:'white',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation:3,
        marginLeft:10,
        marginRight:10,
        borderRadius:10

    },
    columnPaymentContainer:{
        flexDirection:'column',
        width:Dimensions.get('window').width/2,
        width:'50%'
     

    },
    text:{
        fontSize:17,
        color:'black',
        opacity:0.7
    },
    customButton:{
        position:'absolute',
        width:Dimensions.get('window').width-60,
        height:40,
        top:122,
        borderRadius:5,
        backgroundColor:'#fff6d6',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation:3,
        alignItems:'center',
        paddingLeft:10,
        flexDirection:'row'
    
    }


})
