import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';

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
import {baseUrl, forgotPassword, login, requestPostApi, send_otp, verify_otp} from '../../WebApi/Service';
import MyHeader from '../../components/MyHeader';
import {dimensions} from '../../utility/Mycolors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  FONTS,
  FONTS_SIZE,
  checkPlatForm,
  heightScale,
  widthScale,
} from '../../global/Utils';
import OtpInputs from 'react-native-otp-inputs';
const Otp = props => {
  const [email, setEmail] = useState('');
  const [viewOtp, setViewOtp] = useState('');
  const [state, setState] = useState('');
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(props?.route?.params?.email);
    setViewOtp(props?.route?.params?.Otp);
    console.log('EMAIL DATA', props?.route?.params.Otp);
  }, []);

  const LoginPressed = async () => {
    // props.navigation.navigate('SetNewPass')
    console.log('ENTER OTP TEXT', state);
    if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (state == '' || state.trim().length == 0) {
      setalert_sms('Please Enter OTP');
      setMy_Alert(true);
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('email', email); //code+
      // formdata.append("device_id", mapdata.devicetoken);
      formdata.append('otp', state);
      console.log('FORMDATA', formdata);
      const {responseJson, err} = await requestPostApi(
        verify_otp,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      console.log('the res verify_OTP==>>', responseJson);
      if (err == null) {
        if (responseJson.status == true) {
          loginPress(responseJson.data);
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
  const FromForgotPressed = async () => {
    console.log('ENTER OTP TEXT', state);
    if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (state == '' || state.trim().length == 0) {
      setalert_sms('Please Enter OTP');
      setMy_Alert(true);
    } else if (state === viewOtp) {
      setalert_sms('Please Enter Valid Otp');
      setMy_Alert(true);
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('email', email); //code+
      // formdata.append("device_id", mapdata.devicetoken);
      formdata.append('otp', state);
      console.log('FORMDATA', formdata);
      const {responseJson, err} = await requestPostApi(
        verify_otp,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      console.log('the res FromForgotPressed==>>', responseJson);
      if (err == null) {
        if (responseJson.status == true) {
          props.navigation.navigate('SetNewPass', {email: email});
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
  const ResendOtp = async () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (!EmailReg.test(email)) {
      setalert_sms('Enter Valid Email');
      setMy_Alert(true);
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('email', email);

      const {responseJson, err} = await requestPostApi(
        send_otp,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      // console.log('the res sendotp==>>', responseJson);
      if (err == null) {
        if (responseJson.status == true) {
         
        } else {
          console.log('Error', responseJson.message);
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else if (err == null) {
        setalert_sms(err);
        setMy_Alert(true);
      } else {
        setalert_sms(err);
        setMy_Alert(true);
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <MyHeader
        title={'Verification Code'}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <>
        <Text
          style={{
            color: COLORS.Primary_Blue,
            marginLeft: 20,
            marginTop: 45,
            fontSize: 20,
            fontWeight: '600',
          }}>
          Verify your email
        </Text>
        <Text
          style={{
            color: '#000',
            // marginLeft: 20,
            marginTop: 10,
            fontSize: 16,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          Cheehoo! 🤙
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '92%',
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              // marginLeft: 20,
              marginTop: 10,
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 18,
            }}>
            To continue, complete this verification step. We've send a One Time
            Password (OTP) to the email{' '}
            <Text
              style={{
                color: '#000',
                // marginLeft: 20,
                textDecorationLine: 'underline',
                fontSize: 14,
                fontWeight: '400',
                alignSelf: 'center',
                // marginTop: 30,
              }}>
              {email}
            </Text>
            . Please enter it below.
          </Text>
        </View>

        {/* <Text
          style={{
            color: '#000',
            marginLeft: 20,

            fontSize: 14,
            fontWeight: '400',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          {email}
        </Text> */}

        <OTPInputView
          style={{
            width: '70%',
            alignSelf: 'center',
            height: 50,
            marginTop: 20,
            color: 'black',
            // shadowColor: '#000',
            // shadowOffset: {width: 1, height: 1},
            // shadowOpacity: 0.4,
            // shadowRadius: 2,
            // elevation: 3,
          }}
          pinCount={4}
          code={state} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => {
            setState(code);
          }}
          placeholderCharacter={'*'}
          placeholderTextColor={'#CECECE'}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />

        <TouchableOpacity style={styles.forgotContainer}
        onPress={()=>{ResendOtp();}}
        >
          <Text style={[styles.forgotTxt, {marginTop: 10}]}>
            Resend Verification Code
          </Text>
        </TouchableOpacity>
        <View style={{height: 10}}></View>
        <CustomButton
          title={'Submit'}
          borderColor={'#83CDFD'}
          onPress={() => {
            if (props?.route?.params?.from == 'ForgotPass') {
              FromForgotPressed();
            } else {
              LoginPressed();
            }
          }}
          backgroundColor={COLORS.Primary_Blue}
        />

        <ImageBackground
          style={{width: '100%', height: '100%', flex: 1, marginTop: 60}}
          resizeMode="stretch"
          source={require('../../assets/images/largeimages/loginbottum.png')}></ImageBackground>
      </>
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
    alignSelf: 'center',
    marginRight: 20,
    marginTop: 10,
  },
  forgotTxt: {
    fontSize: FONTS_SIZE.h4,
    fontWeight: '400',
    color: COLORS.Primary_Blue,
    fontFamily: FONTS.regular,
    alignSelf: 'center',
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
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#000000',
  },

  underlineStyleHighLighted: {
    borderColor: '#3DA1E3',
  },
});

export default Otp;
