import Ionicons from 'react-native-vector-icons/Ionicons';
import * as React from 'react';
import { Button, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
//import images from constants folder
//import screen from screens folder
import Homee from '../components/Home';
import Calls from '../components/Profile';
import Settings from '../components/Settings';
import ChatScreen from '../components/ChatView';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Regist from '../components/Register';
import ChatView from '../components/ChatView';
import ProfileSettings from '../components/ProfileSettings';
import Order from '../components/Order';
import OrderDetails from '../components/OrderDetails';
import PaymentDetails from '../components/PaymentDetails';
import PaymentMethods from '../components/PaymentMethods';
import Notification from '../components/Notification';
import MessageNotification from '../components/MessageNotification';
import Help from '../components/Help';
import Authentication from '../components/Authentication';
import ForgotPassword from '../components/ForgotPassword';
import OTP from '../components/OTP';
import PasswordChange from '../components/PasswordChange';


const Tab = createBottomTabNavigator();
const Register = createStackNavigator();
const Home = createStackNavigator();
const ChatScreenStack = createStackNavigator();
const Stack = createStackNavigator();
const Setting = createStackNavigator();

const getTabBarVisibility = (route) => {

  // const routeName = route.state
  //     ? route.state.routes[route.state.index].name
  //     : '';


  if (route.name === 'ChatScreen') {

    return false;
  }

  return true;
};
function dashBoard() {
  return (


    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarVisible: getTabBarVisibility(route),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            return (
              focused ? <Image source={require('../constants/imgs/chat-bubble-focus.png')} style={{ height: 25, width: 25 }} /> : <Image source={require('../constants/imgs/chat-bubble.png')} style={{ height: 25, width: 25 }} />
            )
          }

          else if (route.name === 'ChatScreen') {
            iconName = focused ? 'chatbubble-outline' : 'chatbubble-outline';
          }
          else if (route.name === 'Calls') {
            iconName = focused ? 'person-circle-outline' : 'person-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'contrast-outline' : 'contrast-outline';
          }


          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={home} />
      <Tab.Screen

        name="ChatScreen" component={ChatView} />
      <Tab.Screen name="Calls" component={Calls} />
      <Tab.Screen name="Settings" component={setting} />
    </Tab.Navigator>


  );
}
function home() {
  return (
    <Home.Navigator>
      <Home.Screen name="Home" component={Homee} options={{ headerShown: false }} />
      <Home.Screen name="ProfileSettings" component={ProfileSettings} options={{ headerShown: false }} />
      <Home.Screen name="Order" component={Order} options={{ headerShown: false }} />
      <Home.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />
      <Home.Screen name="PaymentDetails" component={PaymentDetails} options={{ headerShown: false }} />
      <Home.Screen name="PaymentMethods" component={PaymentMethods} options={{ headerShown: false }} />
    </Home.Navigator>

  )
}
function setting() {
  return (
    <Setting.Navigator >

      <Setting.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Setting.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Setting.Screen name="MessageNotification" component={MessageNotification} options={{ headerShown: false }} />
      <Setting.Screen name="Help" component={Help} options={{ headerShown: false }} />
      <Setting.Screen name="Authentication" component={Authentication} options={{ headerShown: false }} />

    </Setting.Navigator>
  )
}
function registerSteps() {
  return (
    <Register.Navigator>
      <Register.Screen name="Regist" component={Regist} options={{ headerShown: false }} />
      <Register.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Register.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Register.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Register.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
      <Register.Screen name="PasswordChange" component={PasswordChange} options={{ headerShown: false }} />



    </Register.Navigator>
  )

}
function chatScreenStack() {
  return (
    <ChatScreenStack.Navigator>
      <ChatScreenStack.Screen name="ChatView" component={ChatView} options={{ headerShown: false }} />

    </ChatScreenStack.Navigator>
  );
}

export default function App(props) {

  React.useEffect(() => {

    SplashScreen.hide();

  }, [])





  if (props.token == null || props.token == '') {

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RegisterSteps" component={registerSteps} options={{ headerShown: false }} />
          <Stack.Screen name="DashBoard" component={dashBoard} options={{ headerShown: false }} />


        </Stack.Navigator>

      </NavigationContainer>
    )
  }
  else {

    return (
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="DashBoard" component={dashBoard} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterSteps" component={registerSteps} options={{ headerShown: false }} />


        </Stack.Navigator>

      </NavigationContainer>
    )
  }
}

