import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';

import images from '../../global/images';
import styles from './LoginScreenStyle';

import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import {ColorProperties} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import COLORS from '../../global/Colors';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import CustomButton from '../../components/CustomButton/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setLoading, saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {baseUrl, login, requestPostApi} from '../../WebApi/Service';
import MyHeader from '../../components/MyHeader';
import {dimensions} from '../../utility/Mycolors';

const LoginScreen = props => {
  const DeviceToken = useSelector(state => state.maplocation)
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [myeye, setmyeye] = useState(true);

  console.log("DeviceTOKEN",DeviceToken?.devicetoken);

  const LoginPressed = async () => {
   
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (!EmailReg.test(email)) {
      setalert_sms('Enter valid email');
      setMy_Alert(true);
    } else if (pass == '' || pass.trim().length == 0) {
      setalert_sms('Please Enter Password');
      setMy_Alert(true);
    }
  
    else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('email', email); //code+
      // formdata.append("device_id", mapdata.devicetoken);
      formdata.append('password', pass);

      const {responseJson, err} = await requestPostApi(
        login,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      console.log('the res==>>', responseJson);
      if (err == null) {
        if (responseJson.status == true) {
          loginPress(responseJson.data);
        } else {
          setalert_sms('Your email or password is incorrect');
          setMy_Alert(true);
        }
      }else if(err == null){
        setalert_sms(responseJson.message);
          setMy_Alert(true);
      }
       else {
        setalert_sms('Your email or password is incorrect');      
        setMy_Alert(true);
      }
    }
  };

  const loginPress = data => {
    var dddd = {
      about: '',
      address: '',
      cert_no: '',
      city: '',
      country: '0',
      created_at: '',
      current_salon: '',
      dob: '',
      email: '',
      experience: '',
      expiry_date: '',
      expiry_date1: '',
      facilities: '',
      featured: '0',
      gender: '',
      hobbies: '',
      id: null,
      id_proof: '',
      language: '',
      license: '',
      license_num: '',
      license_num1: '',
      location: '',
      name: '',
      nationality: '',
      otp: '',
      owner_image: '',
      owner_name: '',
      password: '4e652ad08eba102e0658176641dc6da6',
      phone: '',
      phone1: '',
      previous_location: '',
      previous_salon: '',
      profile: '1',
      qualification: '',
      salon_image: '',
      salon_type: '',
      service: '',
      slogan: '',
      state: '',
      status: '1',
      type: 'customer',
      unique_id: '',
      vat: '',
      video: '',
    };

    AsyncStorage.setItem('kikos', JSON.stringify(data));
    dispatch(saveUserResult(data));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff',height:"100%"}}>
      <MyHeader
        // title={'Sign In'}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
      <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
      <CustomFastImage
              imageStyle={styles.logo}
              img={images.loginlogo}
              resizeMode={'contain'}
            />
        <Text
          style={{
            color: COLORS.Primary_Blue,
            // marginLeft: 20,
            marginTop: 25,
            fontSize: 20,
            fontWeight: '600',
          }}>
          Sign In
        </Text>
        <Text
          style={{
            color: '#000',
            marginLeft: 20,
            marginTop: 10,
            fontSize: 13,
            fontWeight: '400',
          }}>
          Please enter your email and password
        </Text>

        {/* <KeyboardAwareScrollView> */}

        <View style={{justifyContent: 'center', alignItems: 'center',flex:1}}>
          <View
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomTextInput
              onChangeText={txt => {
                setEmail(txt);
              }}
              placeholder={'Enter Your Email ID'}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomTextInput
              onChangeText={txt => {
                setPass(txt);
              }}
              placeholder={'Password'}
              secureTextEntry={myeye}
              rightView={
                <TouchableOpacity
                  onPress={() => {
                    setmyeye(!myeye);
                  }}>
                  <Image
                    source={myeye ? images.ceye : images.eye}
                    style={{height: 25, width: 25}}
                  />
                </TouchableOpacity>
              }
            />
          </View>
          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={() => {
              props.navigation.navigate('ForgotPass');
              // props.navigation.replace('ForgotPass');
            }}>
            <Text style={styles.forgotTxt}>Forgot your password?</Text>
          </TouchableOpacity>
          <CustomButton
            title={'Login'}
            borderColor={'#83CDFD'}
            onPress={() => {
              LoginPressed();
            }}
            backgroundColor={COLORS.Primary_Blue}
          />
          
        </View>
        <View
              style={{
                top:30,
                justifyContent:'center',
                alignItems:'center',
                flexDirection: 'row',
              }}>
              <Text
                style={[styles.txtStyle, {color: '#000', fontWeight: '400'}]}>
                Don’t have an account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SignUp')}>
                <Text style={[styles.signup, {color: '#3DA1E3'}]}> Signup</Text>
              </TouchableOpacity>
            </View>
        {/* </KeyboardAwareScrollView> */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: (dimensions.SCREEN_HEIGHT * 8) / 100,
            // position: 'absolute',
            // bottom: 0,
            width: '100%',
            height: (dimensions.SCREEN_HEIGHT * 25) / 100,
            // backgroundColor:'#3DA1E3',
            // alignSelf: 'center',
          }}>
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            resizeMode="stretch"
            source={require('../../assets/images/largeimages/loginbottum.png')}>
            {/* <View
              style={{
                position: 'absolute',
                bottom: 30,
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={[styles.txtStyle, {color: '#fff', fontWeight: '400'}]}>
                Don’t have an account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SignUp')}>
                <Text style={[styles.signup, {color: '#fff'}]}> Signup</Text>
              </TouchableOpacity>
            </View> */}
          </ImageBackground>
        </View>
      </View>
      </ScrollView>
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default LoginScreen;
