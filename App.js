import React from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import Screens from './src/navigation/screens';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux'
import Reducer from './src/Redux/user';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk' ;
import logger from 'redux-logger';
import OrderReducer from './src/Redux/order'
// import { useNavigation } from '@react-navigation/native';
import { reducer as formReducer } from 'redux-form';
const rootReducer=combineReducers({
  initialReducer:Reducer,
  orderReducer:OrderReducer,
  form: formReducer,

})
const store =configureStore({reducer:rootReducer,middleware:[logger,ReduxThunk]})
export default function App(){
  const [token,setToken]=React.useState('');
  const [loading,setLoading]=React.useState(true);
  // const navigation = useNavigation();
  React.useEffect(()=>{
   const  checkToken=async()=>{
      const token=await AsyncStorage.getItem('token');
      setToken(token);
      setLoading(false)
 
    }
    checkToken()
  },[])
  return(
    <Provider store={store}>
   {loading?<ActivityIndicator size="small" color="orange" />:
      <Screens token={token} />}
      </Provider>
  );

}