import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ActivityIndicator,
  TextInput,

} from 'react-native';


import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import {OTPVerify} from '../Redux/user';
const{width,height}=Dimensions.get('window');

class OTP extends React.Component {
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
    this.num1 = React.createRef();
    this.num2 = React.createRef();
    this.num3 = React.createRef();
    this.num4 = React.createRef();
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      textInput1: '',
      textInput2: '',
      textInput3: '',
      textInput4: '',
    };
}
 
  inputNumber(value, flag) {
    const completeFlag = `num${flag}`;
    this.setState({[completeFlag]: value});
    flag = flag + 1;
    if (flag < 5 && value) {
      const nextFlag = `num${flag}`;
      const textInputToFocus = this[nextFlag];
      textInputToFocus.current.focus();
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#222534',
          alignItems:'center',
          
          
        //   borderWidth:10,
        //   borderColor:'white'
    
        }}>
        {/* <Header
          gob={null}
          value={this.props.navigation}
          title="OTP Verification"
        /> */}

        <View style={{marginTop:height/5}}>
          <View>
            <Text style={{color:'white',fontFamily:'Roboto',fontWeight:'bold'}}>Enter 4 digits code sent to</Text>
            <Text style={{color:'white',fontFamily:'Roboto',fontWeight:'bold'}}>{this.props.route.params.email}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 55,
            }}>
            <TextInput
              ref={this.num1}
              style={{
                borderWidth: 2,
                color:'white',
                width: 70,
                borderColor: 'orange',
                borderRadius:6,
                textAlign: 'center',
                fontSize: 25,
              }}
              onChangeText={number => {
                this.inputNumber(number, 1);
                this.setState({textInput1: number});
              }}
              keyboardType="numeric"
              numberOfLines={1}
              maxLength={1}
            />
            <TextInput
              ref={this.num2}
              style={{
                marginLeft: '7%',
                borderWidth: 2,
                color:'white',
                width: 70,
                borderColor: 'orange',
                borderRadius:6,
                textAlign: 'center',
                fontSize: 25,
              }}
              onChangeText={number => {
                this.inputNumber(number, 2);
                this.setState({textInput2: number});
              }}
              onKeyPress={e => {
                if (e.nativeEvent.key == 'Backspace') {
                  this.num1.current.focus();
                }
              }}
              keyboardType="numeric"
              numberOfLines={1}
              maxLength={1}
            />
            <TextInput
              ref={this.num3}
              style={{
                marginLeft: '7%',
                borderWidth: 2,
                color:'white',
                width: 70,
                borderColor: 'orange',
                borderRadius:6,
                textAlign: 'center',
                fontSize: 25,
              }}
              onChangeText={number => {
                this.inputNumber(number, 3);
                this.setState({textInput3: number});
              }}
              keyboardType="numeric"
              onKeyPress={e => {
                if (e.nativeEvent.key == 'Backspace') {
                  this.num2.current.focus();
                }
              }}
              numberOfLines={1}
              maxLength={1}
            />
            <TextInput
              ref={this.num4}
              style={{
                marginLeft: '7%',
                borderWidth: 2,
                color:'white',
                width: 70,
                borderColor: 'orange',
                borderRadius:6,
                textAlign: 'center',
                fontSize: 25,
              }}
              onChangeText={number => {
                this.inputNumber(number, 4);
                this.setState({textInput4: number});
              }}
              onKeyPress={e => {
                if (e.nativeEvent.key == 'Backspace') {
                  this.num3.current.focus();
                }
              }}
              keyboardType="numeric"
              numberOfLines={1}
              maxLength={1}
            />
          </View>
        </View>
        <View
          style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{fontSize: 25, fontWeight: 'bold',color:'white'}}>
            Enter Your Code
          </Text>
       
            <TouchableOpacity
              onPress={() => {
                if (
                  this.state.textInput1 != '' &&
                  this.state.textInput2 != '' &&
                  this.state.textInput3 != '' &&
                  this.state.textInput4 != ''
                ) {
                  const concatenated = `${this.state.textInput1}${
                    this.state.textInput2
                  }${this.state.textInput3}${this.state.textInput4}`;
                  this.props.OTPVerify(
                    this.props.route.params.email,
                    concatenated,
                    this.props.navigation,
                    4
                  );
                } else {
                  Toast.show('Enter Code Please', Toast.SHORT);
                }
              }}
              disabled={this.props.userReducer.otp_loading?true:false}
              style={styles.start}>
              <Text style={{color: 'white', fontSize: 20}}>Enter</Text>
              {this.props.userReducer.otp_loading?<LottieView source={require('../assets/lottie/lf30_editor_wbasfrw8.json')} style={{width:40,height:40}} autoPlay loop />:null}
            </TouchableOpacity>
          
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 40,
            flexGrow: 1,
          }}>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  start: {
    opacity: 0.8,
    height: 50,
    width: 200,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection:'row'
  },
  lastDesign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleDesign: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: '#63d4b6',
    opacity: 0.7,
    marginLeft: 5,
  },
  singleOne: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: '#04c491',
    marginLeft: 5,
  },
});

// const mapStateToProps = state => {
//   return {
//     addition: state.addReducer,
//   };
// };

  const mapStateToProps=(state)=>{
 
    return{userReducer:state.initialReducer}
}
const mapDispatchToProps={OTPVerify};
export default connect(mapStateToProps,mapDispatchToProps)(OTP);
