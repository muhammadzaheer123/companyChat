import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../sub_components/Header';
import { connect } from 'react-redux';
import { userOrderData, saveToken } from '../Redux/order';


function Home({ navigation, userOrderData, saveToken, OrderReducer }) {
    React.useEffect(() => {
        userOrderData();
        tokenAccess();


    }, [])
    const tokenAccess = async () => {
        let token = await AsyncStorage.getItem('token');
        token = token.replace(/"/g, "")
        await saveToken(token)


    }
    return (
        <View style={styles.container}>
            <StatusBar hidden={false} />
            {OrderReducer.loading_order_status ? (<View style={styles.customLoding} >
                <View style={styles.customLodingContainer}>
                    <ActivityIndicator
                        visible={true}
                        color="black"
                        size="small"
                    />

                </View>
            </View>) : null}
            <Header navigation={navigation} title="Home" />

            <View style={styles.subContainer}>


                <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')} style={styles.profileContainer}>
                    <Image style={styles.imageContainer} source={require('../constants/imgs/men.jpg')} />
                    <Text style={{ marginLeft: 20, fontSize: 18, }}>William Jonas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('OrderDetails')} style={[styles.tiles, { marginTop: 50 }]}>
                    <Icon name="shopping-cart" size={25} style={styles.iconSize} />
                    <Text style={{ marginLeft: 50 }}>Order</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                    </View></TouchableOpacity>
                <TouchableOpacity style={[styles.tiles, { marginTop: 20 }]}>
                    <Icon name="angle-double-up" size={30} style={styles.iconSize} />
                    <Text style={{ marginLeft: 50 }}>Media</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                    </View></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PaymentDetails')} style={[styles.tiles, { marginTop: 0 }]}>
                    <Icon name="cc-paypal" size={25} style={[styles.iconSize, { width: 40 }]} />
                    <Text style={{ marginLeft: 40 }}>Payment</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                    </View></TouchableOpacity>
                <TouchableOpacity style={[styles.tiles, { marginTop: 50 }]}>
                    <Icon name="database" size={25} style={styles.iconSize} />
                    <Text style={{ marginLeft: 50 }}>Chat Backup</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                    </View></TouchableOpacity>
                <TouchableOpacity style={[styles.tiles, { marginTop: 0 }]}>
                    <Icon name="bell" size={25} style={styles.iconSize} />
                    <Text style={{ marginLeft: 50 }}>Notifications</Text>
                    <View style={styles.arrowContainer}>
                        <Icon name="angle-right" size={25} color="#cecece" />

                    </View></TouchableOpacity>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    subContainer: {
        width: '100%',
        alignItems: 'center'


    },
    profileContainer: {

        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 1,

    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 50

    },
    tiles: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#dedede',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 1,


    },
    arrowContainer: {
        flexGrow: 1,

        alignItems: 'flex-end'

    },
    iconSize: {
        width: 30,
        height: 30,

    },
    customLoding: {
        height: 15,
        width: 15,
        borderRadius: 50,
        width: '100%',
        alignItems: 'center',
        marginBottom: -15,
        marginTop: 5
    },
    customLodingContainer: {
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 5,
        backgroundColor: 'white'


    }

})
const mapStateToProps = (state) => {
    console.log(state.orderReducer)
    return {
        OrderReducer: state.orderReducer
    }

}
const mapDispatchToProps = { userOrderData, saveToken }
export default connect(mapStateToProps, mapDispatchToProps)(Home)