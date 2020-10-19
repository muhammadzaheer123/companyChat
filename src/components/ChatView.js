import React, { useState, useCallback, useEffect,useRef } from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,ScrollView,Dimensions,KeyboardAvoidingView,Linking} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


export default function Example(props) {
  const [messages, setMessages] = useState([]);
  const [menuList,setMenuList]=useState(false);
 
  const menu = useRef();

  const hideMenu = () => menu.current.hide();
  const sendWhatsAppMessage = link => {
    let url =
    "whatsapp://send?text=" +
    "hello" +
    "&phone=92" +
    '3244720335';
    if (url) {
     Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
         Alert.alert(
           'Please install whats app to send direct message to students via whatsapp'
         );
       } else {
         return Linking.openURL(url);
       }
     })
     .catch(err => console.error('An error occurred', err));
   } else {
     console.log('sendWhatsAppMessage -----> ', 'message link is undefined');
    }
   };
  const showMenu = () =>{ menu.current.show()};

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
  <View style={{flex:1}}>
      <View style={styles.topContainer}>
      <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{marginLeft:-10,marginRight:5}}><Image source={require('../constants/imgs/left-arrow.png')} style={{width:20,height:20}} /></TouchableOpacity>
        <View>
          <View style={{width:9,height:9,borderRadius:50,backgroundColor:'green',position:'absolute',left:48,top:1}}></View>
        <Image source={require('../constants/imgs/men.jpg')} style={{height:50,width:50,borderRadius:50}} />
        </View>
        <View style={{marginLeft:20}}><Text style={{fontWeight:'bold',fontSize:16}}>Modern Technology (Admin)</Text>
        <Text style={{color:'black',opacity:0.6}}>Last seen today at 12:00 pm</Text>
     
        </View>
     <TouchableOpacity onPress={()=>sendWhatsAppMessage()}><Icon style={{marginLeft:20,marginTop:10}} name ="video-camera" size={20} color="green" /></TouchableOpacity>
      <TouchableOpacity onPress={()=>Linking.openURL('tel:119')} style={{justifyContent:'center',alignItems:'center',marginLeft:10,marginTop:10,width:35}} ><Icon name ="phone" size={25} color="orange" /></TouchableOpacity>
      <View style={{alignItems:'flex-end',right:20}}>
<Menu ref={menu} button={<Icon style={{marginLeft:20,marginTop:10,width:30,height:30,textAlign:'center',textAlignVertical:'center'}} name ="ellipsis-v" size={25} color="black" onPress={showMenu} />}>
 <MenuItem  onPress={hideMenu}>Menu item 1</MenuItem>
 <MenuDivider />
 <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
 <MenuDivider />
 <MenuItem onPress={hideMenu}>
   Menu item 3
 </MenuItem>
 <MenuDivider />
 <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
</Menu>
</View>
      </View>
     
      <View style={{flexGrow:1}}>
    <GiftedChat
 
    

      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </View>
    </View>
  )
}
const styles=StyleSheet.create({
  topContainer:{
    marginTop:15,
    width:'100%',
    height:80,
    alignItems:'center',
    paddingLeft:20,
    paddingTop:9,
    flexDirection:'row',
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation:2,

   
  }

})