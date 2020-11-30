
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';

export default function Register({ navigation }) {
  return (

    <View style={styles.container}>
      <View style={{ position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', borderColor: 'white', width: '100%', top: 0 }}>
        <Image source={require('../constants/imgs/dt_logo.png')} style={styles.logo} resizeMode="contain" /></View>
      <StatusBar hidden={true} translucent={true} />

      <View style={styles.subContainer}>


        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button2}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={[styles.button1, { backgroundColor: '#FF9800', marginTop: 20 }]}>
          <Text style={styles.text}>Signup</Text>

        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222534'
  },
  subContainer: {
    position: 'absolute',
    bottom: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',

    width: '100%'

  },
  logo: {
    height: 300,
    width: 300,
    overflow: 'hidden',


  },

  button1: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF9800',
    width: '45%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  button2: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF9800',
    width: '45%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

  },

  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  }


});