import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Animated,Dimensions } from 'react-native';
import Header from '../sub_components/Header';
export default function OrderDetails({navigation}) {
    const[tab1,setTab1]=useState(true);
    const[tab2,setTab2]=useState(false);
    const[tab3,setTab3]=useState(false);
    const[tab4,setTab4]=useState(false);
      const [translateValue] = useState(new Animated.Value(0));
    
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
            <Header navigation={navigation} title="Order Details" />
                <View style={styles.tabsContainer}>
                
                    <TouchableOpacity onPress={()=>{                      
                        setTab1(true);setTab2(false);setTab3(false);setTab4(false);
                        Animated.spring(translateValue, {
                            toValue: 0,
                            velocity: 10,
                            useNativeDriver: true,
                          }).start()
                        }}>
                        <Text style={styles.tabsText}>Active</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Animated.spring(translateValue, {
                            toValue: 50,
                            velocity:10,
                            useNativeDriver: true,
                          }).start();setTab1(false);setTab2(true);setTab3(false);setTab4(false)}}>
                        <Text style={styles.tabsText}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        Animated.spring(translateValue, {
                            toValue: 75,
                            velocity:10,
                            useNativeDriver: true,
                          }).start();setTab1(false);setTab2(false);setTab3(true);setTab4(false)}}>
                        <Text style={styles.tabsText}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                          Animated.spring(translateValue, {
                            toValue:Dimensions.get('window').width-Dimensions.get('window').width/1.8 ,
                            velocity:10,
                            useNativeDriver: true,
                          }).start();
                        setTab1(false);setTab2(false);setTab3(true);setTab4(false)
                           
                    }}>
                        <Text style={styles.tabsText}>Cancelled</Text>
                    </TouchableOpacity>


                </View>
              
                <View style={{ flexDirection: 'row', width: '100%' }}>
                {tab1?<Animated.View
          style={[
            styles.slider,
            {
              transform: [{ translateX: translateValue }],
              width: '23%',
            },
          ]}
        />:null}
                {tab2?<Animated.View
          style={[
            styles.slider,
            { marginLeft:'11%',
              transform: [{ translateX: translateValue }],
              width: '25%',
            },
          ]}
        />:null}

                    {tab3?<Animated.View
          style={[
            styles.slider,
            { marginLeft:'32%',
              transform: [{ translateX: translateValue }],
              width: '25%',
            },
          ]}
        />:null}
                    {tab4?<Animated.View
          style={[
            styles.slider,
            { marginLeft:'70%',
              transform: [{ translateX: translateValue }],
              width: '25%',
            },
          ]}
        />:null}


                </View>
            </View>
            <View style={styles.orderContainer}>
                <View style={styles.orderTile}>
                    <Image source={require('../constants/imgs/men.jpg')} style={styles.image} />

                    <View style={styles.textContainer}><Text style={styles.textInsideContainer} >Chiken Tikka Biryani</Text>
                        <Text style={styles.lightTextinsideConatiner}>Afghani Chiken Tikka</Text>
                        <Text style={[styles.lightTextinsideConatiner, { fontWeight: 'bold' }]}>$360</Text></View>
                    <View style={styles.rightConatiner}><Text style={{ color: 'black', opacity: 0.3, fontSize: 12 }}>07/10/2020</Text></View>

                    <View style={styles.triangle} />
                    <Image source={require('../constants/imgs/check-mark.png')} style={{ width: 13, height: 13, position: 'absolute', right: 5, top: 5 }} />



                </View>
                <View style={[styles.orderTile, { marginTop: 20 }]}>
                    <Image source={require('../constants/imgs/men.jpg')} style={styles.image} />

                    <View style={styles.textContainer}><Text style={styles.textInsideContainer} >Chiken Tikka Biryani</Text>
                        <Text style={styles.lightTextinsideConatiner}>Afghani Chiken Tikka</Text>
                        <Text style={[styles.lightTextinsideConatiner, { fontWeight: 'bold' }]}>$360</Text></View>
                    <View style={styles.rightConatiner}><Text style={{ color: 'black', opacity: 0.3, fontSize: 12 }}>07/10/2020</Text></View>

                    <View style={[styles.triangle, { borderBottomColor: 'red' }]} />
                    <Image source={require('../constants/imgs/cross-sign.png')} style={{ width: 10, height: 10, position: 'absolute', right: 5, top: 5 }} />



                </View>


            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        alignItems: 'center',
        width: '100%',

        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 10,
    },
    orderContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,




    },
    orderTile: {
        width: 330,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 1,
        borderRadius: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    textContainer: {
        marginLeft: 10,

    },
    textInsideContainer: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light'

    },
    lightTextinsideConatiner: {
        marginTop: 3,
        color: 'black',
        opacity: 0.5,
        fontSize: 12,

    },
    rightConatiner: {
        marginLeft: 20,
        marginTop: 2

    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 17,
        borderRightWidth: 33,
        borderBottomWidth: 25,
        transform: [{ rotate: "55deg" }],
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#00BCD4',
        position: 'absolute',
        right: -21,
        top: 1

    },
    tabsContainer: {
        flexDirection: 'row',
        paddingTop:0,
        padding: 20,
        width: '100%',
        justifyContent: 'space-between',
        alignItems:'center'

    },
    tabsLineContainer: {
        width: '25%',
        borderWidth: 2,
        borderColor:'#FF9800'


    },
    tabsText: {
        color: 'black',
        opacity:0.6
    },
    slider: {
        height: 5,
        backgroundColor: '#FF9800',
        borderRadius: 10,
    }



})