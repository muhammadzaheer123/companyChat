import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, LogBox } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Pusher from 'pusher-js/react-native';

LogBox.ignoreAllLogs();

Pusher.logToConsole = true;
var pusher = new Pusher('73ead456e66df0eb225b', {
  cluster: 'ap2'
});

var channel = pusher.subscribe('channel2');

export default function Example(props) {
  const [messages, setMessages] = useState([]);
  const menu = useRef();
  const loaded = useRef(false);

  useEffect(() => {
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
      //  console.log(json.messages)

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
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJlNGUyYjIzOTcxYTc3YzI3Mzg1ZjBlZjUxY2IxZjQ2ZDM3NjFhMTAzM2JiNmYxM2M4N2Q5M2QyMzU5OTJjNTRkYjFmYWE4ODRiYjI3M2ZiIn0.eyJhdWQiOiIzIiwianRpIjoiYmU0ZTJiMjM5NzFhNzdjMjczODVmMGVmNTFjYjFmNDZkMzc2MWExMDMzYmI2ZjEzYzg3ZDkzZDIzNTk5MmM1NGRiMWZhYTg4NGJiMjczZmIiLCJpYXQiOjE2MDYzMDI3MDAsIm5iZiI6MTYwNjMwMjcwMCwiZXhwIjoxNjM3ODM4NzAwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ia0vUooZNMlLOeddYXncZsmQL9xnJl2sR_anivhbeZwKl-_MgUpWJ9vjOmHSi591NpSHfvNwE9CJM7dcI4lcroeLlVyZjKtT8m966iNVZlDrWIDdDxFZwrkCFUAXjPIkfCfZEkGU0BpA1Kt9eCMZZtmM7L89nVsjTerMKQAh0fuYbjZyteEJ-0z0qumue396RjTaYAQHgNMICvLtUxs28RIZjlp7IKu2InkdX3yW8yppQuP4GxwIhxtTfH4euGXuo1H86dzCGEH--VCn8KMCIPX5BqHG8nH105AuktmcltWLpOVbtTPBkk7_a83qSYULMtpcLeDiIt564zZ0RAb-5jzph3vSWeAQT9dM4mT3d0_Vmwq_NSMGCcNwUasFxQbnuZuBBs3jwWhsBO4-CBU2SFqdeirFtwttPkH9O2NVO4cj1MTbjjUN6bz0ap9Q6vq6_h6hdFMvlXTTspUvX6Fo5Hi61ZdI8jyQgWMHmMyk_RVssWOKxOfxxlC6tSF5YHMUt66c0fUlQSNMv4Uyitlu13Kx2-Tkfw2vlNiW304B6UROjF_vkLpFNzLemer2_xyrQ_PQVo9v-rMMBcmRMACnb9dQ2DlUfrhW9uPMHrS74GCHqTimscguWAOy0mTOsp2Zy1bM_ZVhfLQTJSVj3UhhYr7w9oilrGz6URknboSHcnU',
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
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJlNGUyYjIzOTcxYTc3YzI3Mzg1ZjBlZjUxY2IxZjQ2ZDM3NjFhMTAzM2JiNmYxM2M4N2Q5M2QyMzU5OTJjNTRkYjFmYWE4ODRiYjI3M2ZiIn0.eyJhdWQiOiIzIiwianRpIjoiYmU0ZTJiMjM5NzFhNzdjMjczODVmMGVmNTFjYjFmNDZkMzc2MWExMDMzYmI2ZjEzYzg3ZDkzZDIzNTk5MmM1NGRiMWZhYTg4NGJiMjczZmIiLCJpYXQiOjE2MDYzMDI3MDAsIm5iZiI6MTYwNjMwMjcwMCwiZXhwIjoxNjM3ODM4NzAwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ia0vUooZNMlLOeddYXncZsmQL9xnJl2sR_anivhbeZwKl-_MgUpWJ9vjOmHSi591NpSHfvNwE9CJM7dcI4lcroeLlVyZjKtT8m966iNVZlDrWIDdDxFZwrkCFUAXjPIkfCfZEkGU0BpA1Kt9eCMZZtmM7L89nVsjTerMKQAh0fuYbjZyteEJ-0z0qumue396RjTaYAQHgNMICvLtUxs28RIZjlp7IKu2InkdX3yW8yppQuP4GxwIhxtTfH4euGXuo1H86dzCGEH--VCn8KMCIPX5BqHG8nH105AuktmcltWLpOVbtTPBkk7_a83qSYULMtpcLeDiIt564zZ0RAb-5jzph3vSWeAQT9dM4mT3d0_Vmwq_NSMGCcNwUasFxQbnuZuBBs3jwWhsBO4-CBU2SFqdeirFtwttPkH9O2NVO4cj1MTbjjUN6bz0ap9Q6vq6_h6hdFMvlXTTspUvX6Fo5Hi61ZdI8jyQgWMHmMyk_RVssWOKxOfxxlC6tSF5YHMUt66c0fUlQSNMv4Uyitlu13Kx2-Tkfw2vlNiW304B6UROjF_vkLpFNzLemer2_xyrQ_PQVo9v-rMMBcmRMACnb9dQ2DlUfrhW9uPMHrS74GCHqTimscguWAOy0mTOsp2Zy1bM_ZVhfLQTJSVj3UhhYr7w9oilrGz6URknboSHcnU',
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
    paddingTop: 9,
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
    height: 50,
    maxWidth: '100%',
    minWidth: 50,
    backgroundColor: 'orange',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginTop: 2

  },
  rightText: {
    height: 50,
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

  },
  rightTextDesign: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 20



  }

})