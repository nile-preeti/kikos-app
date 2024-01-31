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
import React, {useState,useEffect} from 'react';

import images from '../../global/images';

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
import {baseUrl, change_password, login, requestPostApi} from '../../WebApi/Service';
import MyHeader from '../../components/MyHeader';
import {dimensions} from '../../utility/Mycolors';
import {
  FONTS,
  FONTS_SIZE,
  checkPlatForm,
  heightScale,
  widthScale,
} from '../../global/Utils';

const SetNewPass = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setcPass] = useState('');
  const [myeye, setmyeye] = useState(true);
  const [myeye1, setmyeye1] = useState(true);
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setpopup] = useState(false);

  useEffect(() => {
    console.log('select_EMAIL ......', props?.route?.params?.email);
    setEmail(props?.route?.params?.email);
  }, []);
  const LoginPressed = async () => {
    if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (pass == '' || pass.trim().length == 0) {
      setalert_sms('Please Enter New Password');
      setMy_Alert(true);
    } else if (pass.trim().length < 8) {
      setalert_sms('The password must be at least 8 characters.');
      setMy_Alert(true);
    } else if (cpass == '' || cpass.trim().length == 0) {
      setalert_sms('Please Enter New Confirm Password');
      setMy_Alert(true);
    } else if (cpass.trim().length < 8) {
      setalert_sms('The confirm password must be at least 8 characters.');
      setMy_Alert(true);
    } else if (pass != cpass) {
      setalert_sms('Password And Confirm Password should be same');
      setMy_Alert(true);
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('email', email);
      formdata.append('new_password', pass);
      formdata.append('confirm_new_password', cpass);

      const {responseJson, err} = await requestPostApi(
        change_password,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      console.log('the res Changepssword==>>', responseJson);
      if (err == null) {
        if (responseJson.status) {
          setpopup(true);
        } else {
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else {
        setalert_sms(err);
        setMy_Alert(true);
      }
    }
  };

   

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MyHeader
        // title={'Set your New password'}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Text
        style={{
          color: COLORS.Primary_Blue,
          marginLeft: 20,
          marginTop: 25,
          fontSize: 20,
          fontWeight: '600',
        }}>
        Set your New password
      </Text>
      <Text
        style={{
          color: '#000',
          marginLeft: 20,
          marginTop: 10,
          fontSize: 13,
          fontWeight: '400',
        }}>
        Your new password must be different from previously used password
      </Text>
      
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
            placeholder={'New Password*'}
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
        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomTextInput
            onChangeText={txt => {
              setcPass(txt);
            }}
            placeholder={'Confirm New Password*'}
            secureTextEntry={myeye1}
            rightView={
              <TouchableOpacity
                onPress={() => {
                  setmyeye1(!myeye1);
                }}>
                <Image
                  source={myeye1 ? images.ceye : images.eye}
                  style={{height: 25, width: 25}}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <CustomButton
          title={'Save'}
          borderColor={'#83CDFD'}
          onPress={() => {
           LoginPressed();
          }}
          backgroundColor={COLORS.Primary_Blue}
        />
       
      
      <ImageBackground
          style={{width: '100%', height: '100%',flex:1,marginTop:60}}
          resizeMode="stretch"
          source={require('../../assets/images/largeimages/loginbottum.png')}>
           
        </ImageBackground>

      {popup ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: dimensions.SCREEN_HEIGHT,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            padding: 20,
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 15,
            }}>
            <TouchableOpacity>
              <Image
                source={images.successimg}
                style={{
                  alignSelf: 'center',
                  width: 120,
                  height: 120,
                  resizeMode: 'stretch',
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 45,
                fontSize: 20,
                fontWeight: '600',
              }}>
              Password Changed!
            </Text>
            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 14,
                fontWeight: '400',
              }}>
              Your Password has been changed successfully
            </Text>

            <CustomButton
              title={'Save'}
              borderColor={'#83CDFD'}
              state
              onPress={() => {
                setpopup(false);
                props.navigation.navigate('Login');
              }}
              backgroundColor={COLORS.Primary_Blue}
            />
          </View>
        </View>
      ) : null}

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
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#ffff',
    position: 'absolute',
    bottom: 0,
    height: checkPlatForm() == 'android' ? '49%' : '53%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
  },
  logo: {
    height: heightScale(170),
    width: widthScale(236),
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  },
  forgotTxt: {
    fontSize: FONTS_SIZE.h4,
    fontWeight: '400',
    color: COLORS.Primary_Blue,
    fontFamily: FONTS.regular,
  },
  topImgContainer: {flex: 0.55, alignItems: 'center', justifyContent: 'center'},
  loginTxt: {
    // alignSelf: 'center',
    color: COLORS.Primary_Blue,
    marginTop: 20,
    fontSize: FONTS_SIZE.h1,
    fontWeight: '700',
    fontFamily: FONTS.bold,
  },
  SignupTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  txtStyle: {
    fontSize: FONTS_SIZE.h4,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    fontWeight: '600',
  },
  signup: {
    fontSize: FONTS_SIZE.h4,
    fontFamily: FONTS.regular,
    fontWeight: '600',
    color: COLORS.Primary_Green,
  },
});

export default SetNewPass;
