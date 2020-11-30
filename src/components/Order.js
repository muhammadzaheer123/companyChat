import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../sub_components/Header';
import {connect} from 'react-redux';


 function Order({navigation,userOrderData,route}) {
     console.log(route)
    const [status,setStatus]=useState(false);
    const [cancelStatus,setCancelStatus]=useState(true);

    return(
        <View style={styles.container}>
              <Header navigation={navigation} title="Order" />
          
            <View style={styles.listContainer}>
                <View style={{marginTop:-30,justifyContent:'space-between',flexDirection:'row'}}>
                 
                    <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.textTop}>ID: </Text>
                    <Text style={styles.insideTextTop}>{route.params.id}</Text>
                 </View>
                 <View style={{flexDirection:'row',marginTop:6}}>
                    <Text  style={styles.textTop}>Order Status: </Text>
                    <Text  style={styles.insideTextTop}>{route.params.status}</Text>
                    </View>
                    </View>
                    <View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.textTop}>Package:</Text>
                    <Text style={styles.insideTextTop}> {route.params.package}</Text></View>
                    <View style={{flexDirection:'row',marginTop:6}}>
                    <Text  style={styles.textTop}>Amount:</Text>
                    <Text style={styles.insideTextTop}> {`$${route.params.amount}`}</Text>
                    </View>
                    </View>

                </View>
                {/* <View style={styles.tile}>
                <Text style={styles.text}>Recent Order</Text></View> */}
                {/* <View style={[styles.tile,{marginTop:20}]}>
                <Text style={styles.text}>Order Status</Text></View> */}

           
            <View style={{height:50,width:'100%',marginTop:20}}>
            <ProgressSteps activeStep={(!status&&cancelStatus)?1:(status&&!cancelStatus)?1:2} completedProgressBarColor="#FF9800" 
            activeStepIconBorderColor="#FF9800" completedStepIconColor="#FF9800" activeLabelColor="#FF9800" completedLabelColor='rgba(38, 67, 235,0.4)'  >
         <ProgressStep  label="Start" removeBtnRow >
            <View style={{ alignItems: 'center' }}>
   
            </View>
            
        </ProgressStep>     
        <ProgressStep  label="20%" removeBtnRow >
            <View style={{ alignItems: 'center' }}>
   
            </View>
            
        </ProgressStep>
    
        <ProgressStep label="50%" removeBtnRow>
            <View style={{ alignItems: 'center' }}>
               
            </View>
        </ProgressStep>
        <ProgressStep label="100%" removeBtnRow>
            <View style={{ alignItems: 'center' }}>
                
              
            </View>
        </ProgressStep>
    </ProgressSteps>
    </View>
 {!status?<View style={{flexGrow:1,flexDirection:'row',marginTop:60,justifyContent:'flex-end',alignItems:'center'}}>
        <Text style={{position:'absolute',left:0,fontSize:14,flexWrap:'wrap'}}>Approve or Disapprove the status.</Text>
    <TouchableOpacity onPress={()=>setStatus(true)} style={{height:40,width:50,marginRight:10}}>
   <Image source={require('../constants/imgs/check.png')} style={{width:30,height:30,opacity:0.7}} resizeMode="contain" />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setStatus(true);setCancelStatus(false)}} style={{height:40,width:50}}>
   <Image source={require('../constants/imgs/cancel.png')} style={{width:30,height:30}} resizeMode="contain" /></TouchableOpacity>


    </View>:null}
    <TouchableOpacity onPress={()=>navigation.navigate('PaymentMethods')} style={[styles.tile,{marginTop:status?60:20,flexDirection:'row'}]}>
    <Text style={[styles.text,{width:'66%',textAlign:'right',fontWeight:'bold'}]}>Order payment</Text>
    <View style={styles.arrowContainer}>
    <Icon name="angle-right" size={25} color="#cecece"  />
    </View>
    </TouchableOpacity>
    <TouchableOpacity  style={[styles.tile,{marginTop:20,backgroundColor:'red'}]}>
      <Text style={[styles.text,{color:'white',fontWeight:'bold'}]}>Cancel order</Text></TouchableOpacity>
      <TouchableOpacity disabled={true} style={[styles.tile,{marginTop:20,backgroundColor:'green'}]}>
      <Text style={[styles.text,{color:'white',fontWeight:'bold'}]}>Mark as complete order</Text></TouchableOpacity>
    
      {/* <TouchableOpacity onPress={()=>navigation.navigate('OrderDetails')} style={[styles.tile,{marginTop:20,flexDirection:'row'}]}>
    <Text style={[styles.text,{width:'73%',textAlign:'right'}]}>Number Of Order</Text>
    <View style={styles.arrowContainer}>
    <Icon name={(!status&&cancelStatus)?"exclamation-circle":(status&&!cancelStatus)?"exclamation-circle":'check-circle'} size={25} color={(!status&&cancelStatus)?"red":(status&&!cancelStatus)?"red":'green'}  />
    </View>
    </TouchableOpacity> */}
   

        </View>
        </View>
    )
    
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'

    },
    subContainer: {
      
        alignItems: 'center'


    },
    listContainer:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:30,

    },
    tile:{
        width:'100%',
        height:40,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:5,
        paddingBottom:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation:3,
        borderRadius:10

    },
    text:{
        fontSize:16,
        color:'#222534',
        fontFamily: 'notoserif',
        color:'black',
    },
    arrowContainer:{
        flexGrow:1,
    
        alignItems:'flex-end'
    },
    textTop:{
        fontSize:18,
        fontFamily:'Roboto'
    },
    insideTextTop:{
        color:'green',
        fontWeight:'bold',
        fontSize:18

    }
    
})

export default connect(null,null)(Order)