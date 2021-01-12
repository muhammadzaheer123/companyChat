import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, LogBox,StatusBar } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Pusher from 'pusher-js/react-native';
import { connect } from 'react-redux';

LogBox.ignoreAllLogs();

Pusher.logToConsole = true;
var pusher = new Pusher('73ead456e66df0eb225b', {
  cluster: 'ap2'
});

var channel = pusher.subscribe('channel2');

function ChatView(props) {
  const [messages, setMessages] = useState([]);
  const menu = useRef();
  const loaded = useRef(false);

  useEffect(() => {
    console.log('....../////////', props.OrderReducer.token)
    channel.bind('message2', function (data) {
      // console.log(data);
      callme();
    });
    if (!loaded.current) {
      loaded.current = true;
      callme()
    }


  }, [])
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
  const showMenu = () => { menu.current.show() };
  const callme = () => {
    // alert('ok')
    let tempArray = [];
    recieveMessages(function callBack(json) {
        console.log(json)

      json.messages != undefined ? json.messages.map(item =>
        tempArray.push({ _id: item.id, createdAt: item.updated_at, text: item.message, user: { _id: item.from, name: item.from } })

      ) : null
      // console.log(tempArray)
      setMessages(tempArray.reverse())
    })
  }
  const recieveMessages = (callBack) => {
    fetch('https://dtmoderntech.com/api/message/get/641442', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${props.OrderReducer.token}`,
      },

    }).then((response) => response.json()).then(json => callBack(json)).catch(e => alert(e))

  }
  const sendAndRecieveMessage = (message) => {

    // console.log(message[0].text)
    let formdata = new FormData();
    formdata.append('receiver_id', "641442");
    formdata.append('message', message[0].text)

    fetch('https://dtmoderntech.com/api/message/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${props.OrderReducer.token}`,
      },
      body: formdata
    }).then(res => console.log(res.status)
    ).catch((e) => console.log(e))

  }
  const onSend = useCallback((messages) => {


    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    sendAndRecieveMessage(messages)


  }, [])
  const renderMessages = (message) => {
    //  console.log(message)

    return (
      <View style={{ flex: 1 }}>

        {message.user._id == '641442' ? <View style={styles.leftTextDesign}>
          <Image style={{ width: 30, height: 30, borderRadius: 50, marginRight: 5, resizeMode: 'contain' }} source={require('../constants/imgs/admin2.png')} />
          <Text style={styles.leftText}>{message.text}</Text>
          {/* {message._id=='1'?<Text style={{flexGrow:1,textAlign:'left'}}>Cool</Text>:<Text style={{flexGrow:1,textAlign:'right'}}>Cool not</Text>} */}
        </View> : <View style={styles.rightTextDesign}><Text style={styles.rightText}>{message.text}</Text></View>}
      </View>
    )

  }
  return (
    <View style={{ flex: 1 }}>
         
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ marginLeft: -10, marginRight: 5 }}><Image source={require('../constants/imgs/left-arrow.png')} style={{ width: 20, height: 20 }} /></TouchableOpacity>
        <View>
          <View style={{ width: 9, height: 9, borderRadius: 50, backgroundColor: 'green', position: 'absolute', left: 48, top: 1 }}></View>
          <Image source={require('../constants/imgs/men.jpg')} style={{ height: 50, width: 50, borderRadius: 50 }} />
        </View>
        <View style={{ marginLeft: 20 }}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Modern Technology (Admin)</Text>
          <Text style={{ color: 'black', opacity: 0.6 }}>Last seen today at 12:00 pm</Text>

        </View>
        <TouchableOpacity onPress={() => sendWhatsAppMessage()}><Icon style={{ marginLeft: 20, marginTop: 10 }} name="video-camera" size={20} color="green" /></TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('tel:119')} style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10, width: 35 }} ><Icon name="phone" size={25} color="orange" /></TouchableOpacity>
        <View style={{ alignItems: 'flex-end', right: 20 }}>
          <Menu ref={menu} button={<Icon style={{ marginLeft: 20, marginTop: 10, width: 30, height: 30, textAlign: 'center', textAlignVertical: 'center' }} name="ellipsis-v" size={25} color="black" onPress={showMenu} />}>
            <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
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

      <View style={{ flexGrow: 1 }}>
        <GiftedChat
          messages={messages}
          alwaysShowSend
          showUserAvatar
          isAnimated
          showAvatarForEveryMessage
          onSend={messages => onSend(messages)}
          renderMessage={(message) => renderMessages(message.currentMessage)}

          user={{
            _id: 1,
            name: 'waseem'
          }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,


  },
  leftTextDesign: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 20



  },
  leftText: {
    height: 45,
    maxWidth: '100%',
    minWidth: 50,
    backgroundColor: 'orange',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginTop: 2,
    marginBottom: 10


  },
  rightText: {
    height: 45,
    maxWidth: '100%',
    minWidth: 50,
    backgroundColor: 'green',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 20,
    paddingLeft: 10,
    paddingTop: 10,
    color: 'white',
    marginTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10


  },
  rightTextDesign: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 20



  }

})
const mapStateToProps = (state) => {

  return {
    OrderReducer: state.orderReducer
  }
}
export default connect(mapStateToProps, null)(ChatView)