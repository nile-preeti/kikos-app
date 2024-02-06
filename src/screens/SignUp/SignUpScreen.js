import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import images from '../../global/images';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import styles from './SignUpScreenStyle';
import CustomButton from '../../components/CustomButton/CustomButton';
import COLORS from '../../global/Colors';
import {
  FONTS,
  FONTS_SIZE,
  myHeight,
  heightScale,
  widthScale,
} from '../../global/Utils';

import SignupModal from '../../modals/SignupDropdown/SignupDropdown';
import Datepicker from '../../components/Datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setLoading, saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {
  baseUrl,
  country,
  state,
  city,
  register,
  requestGetApi,
  requestPostApi,
  send_otp,
  verify_otp,
} from '../../WebApi/Service';
import DropDownPicker from 'react-native-dropdown-picker';
import MyHeader from '../../components/MyHeader';
import {bgcolor, dimensions} from '../../utility/Mycolors';
import PhoneInput from 'react-native-phone-number-input';
import MaskInput from 'react-native-mask-input';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const SignUpScreen = props => {
  const [modalVisable, setModalVisible] = useState(false);
  const [opendateModal, setopenDateModal] = useState(false);
  const [ismodal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false);

  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [lode, setlode] = useState(true);
  const [popup, setpopup] = useState(false);
  const [modalVisibleSendOtp, setModalVisibleSendOtp] = useState(false);
  const [checkvalid, setCheckvalid] = useState(false);
  const [state, setState] = useState('');
  const [codeData, setCodeData] = useState('');

  const [selectedJobopen, setselectedJobOpen] = useState(false);
  const [selectedJobvalue, setselectedJobValue] = useState(null);
  const [selectedJobitems, setselectedJobItems] = useState([
    {label: ' ', value: ' '},
  ]);
  const [dob, setdob] = useState('');
  const [dobplace, setdobplace] = useState('Birth Date (mm/dd/yyyy)');
  const [maritalopen, setmaritalOpen] = useState(false);
  const [maritalvalue, setmaritalValue] = useState(null);
  const [maritalitems, setmaritalItems] = useState([
    {label: 'Single', value: 'Single'},
    {label: 'Married', value: 'Married'},
  ]);
  const [dependant, setdependant] = useState('');
  const [address, setaddress] = useState('');
  const [contry, setcontry] = useState('');
  const [contryopen, setcontryOpen] = useState(false);
  const [contryvalue, setcontryValue] = useState(null);
  const [contryitems, setcontryItems] = useState([{label: ' ', value: ' '}]);
  const [stateopen, setstateOpen] = useState(false);
  const [statevalue, setstateValue] = useState(null);
  const [stateitems, setstateItems] = useState([{label: ' ', value: ' '}]);
  const [cityopen, setcityOpen] = useState(false);
  const [cityvalue, setcityValue] = useState(null);
  const [cityitems, setcityItems] = useState([{label: ' ', value: ' '}]);
  const [zip, setzip] = useState('');
  const [resum, setresum] = useState('');
  const [latter, setlatter] = useState('');
  const [pass, setpass] = useState('');
  const [myeye, setmyeye] = useState(true);
  const [myeye1, setmyeye1] = useState(true);
  const [cpass, setcpass] = useState('');
  const [checkOtpValid, setCheckOtpValid] = useState(false);

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  // const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    // getCountry()
  }, []);

  // const validateEmail = () => {
  //   const regex =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (!regex.test(email)) {
  //     setalert_sms('Invalid Email Address');
  //     setMy_Alert(true);
  //   } else {
  //     SendotpApi();
  //   }
  // };

  const dateformates = (month, day, year) => {
    if (month == 'Jan') {
      return year + '-01-' + day;
    } else if (month == 'Feb') {
      return year + '-02-' + day;
    } else if (month == 'Mar') {
      return year + '-03-' + day;
    } else if (month == 'Apr') {
      return year + '-04-' + day;
    } else if (month == 'May') {
      return year + '-05-' + day;
    } else if (month == 'Jun') {
      return year + '-06-' + day;
    } else if (month == 'Jul') {
      return year + '-07-' + day;
    } else if (month == 'Aug') {
      return year + '-08-' + day;
    } else if (month == 'Sep') {
      return year + '-09-' + day;
    } else if (month == 'Oct') {
      return year + '-10-' + day;
    } else if (month == 'Nov') {
      return year + '-11-' + day;
    } else if (month == 'Dec') {
      return year + '-12-' + day;
    }
  };
  const SendotpApi = async () => {
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
      console.log('the res sendotp==>>', responseJson);
      if (err == null) {
        if (responseJson.status == true) {
          console.log('Send-Otp', responseJson);
          setCodeData(responseJson.code);
          setModalVisibleSendOtp(true);
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
  const VerifyOtpApi = async () => {
    setModalVisibleSendOtp(false);
    console.log('VerifyOtpApi_FORMDATA', email, state);
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
          // loginPress(responseJson.data);
          setCheckvalid(true);
          setModalVisibleSendOtp(false);
        } else {
          setModalVisibleSendOtp(false);
          setState('');
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else if (err == null) {
        setModalVisibleSendOtp(false);
        setState('');
        setalert_sms(err);
        setMy_Alert(true);
      }
    }
  };

  const SignupPressed = async () => {
    setpopup(true);
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name == '' || name.trim().length == 0) {
      setalert_sms('Please Enter Full Name');
      setMy_Alert(true);
    } else if (email == '' || email.trim().length == 0) {
      setalert_sms('Please Enter Email');
      setMy_Alert(true);
    } else if (!EmailReg.test(email)) {
      setalert_sms('Enter Valid Email');
      setMy_Alert(true);
    } else if (mobile == '' || mobile.trim().length == 0) {
      setalert_sms('Please Enter Phone Number');
      setMy_Alert(true);
    } else if (mobile.trim().length < 10) {
      setalert_sms('Please Enter Valid Phone Number');
      setMy_Alert(true);
    } else if (pass == '' || pass.trim().length == 0) {
      setalert_sms('Please Enter Password');
      setMy_Alert(true);
    } else if (pass.trim().length < 8) {
      setalert_sms('The password must be at least 8 characters.');
      setMy_Alert(true);
    } else if (cpass == '' || cpass.trim().length == 0) {
      setalert_sms('Please Enter Confirm Password');
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
      formdata.append('fullname', name);
      formdata.append('email', email);
      formdata.append('mobile', mobile);

      formdata.append('password', pass);
      formdata.append('c_password', cpass);

      console.log('FORMdata print...', formdata);
      const {responseJson, err} = await requestPostApi(
        register,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      console.log('the res signup=11=>>', responseJson);
      if (err == null) {
        if (responseJson?.status == true) {
          setpopup(true);
          // dataStore(responseJson.data);

          // console.log("CREATED PROFILE..........!!!!",responseJson);
        } else {
          console.log('Error in signup', responseJson.message);
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else if (err == null) {
        setalert_sms(err);
        setMy_Alert(true);
      }
    }
  };

  const getCountry = async () => {
    setLoading(true);
    // let formdata = new FormData();
    // formdata.append("fullname", name);
    const {responseJson, err} = await requestGetApi(country, '', 'GET', '');
    setLoading(false);
    console.log('the country==>>', responseJson);
    if (err == null) {
      if (responseJson.status) {
        // var dd=[]
        //  for(let i=0;i<responseJson.data.length;i++){
        //   let ab= {label:responseJson.data[i].name , value: responseJson.data[i].id}
        //   dd.push(ab)
        //  }
        setcontryItems(responseJson.data);
        setlode(!lode);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  const getState = async id => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('country_id', id);
    const {responseJson, err} = await requestPostApi(
      state,
      formdata,
      'POST',
      '',
    );
    setLoading(false);
    console.log('the res==>>', responseJson);
    if (err == null) {
      if (responseJson.status) {
        setstateItems(responseJson.data);
        setlode(!lode);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };
  const getCity = async id => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('state_id', id);
    const {responseJson, err} = await requestPostApi(
      city,
      formdata,
      'POST',
      '',
    );
    setLoading(false);
    console.log('the res==>>', responseJson);
    if (err == null) {
      if (responseJson.status) {
        setcityItems(responseJson.data);
        setlode(!lode);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', height: '100%', flex: 1}}>
      <MyHeader
        title={'Sign up'}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: COLORS.Primary_Blue,
              marginLeft: 20,
              marginTop: 45,
              fontSize: 20,
              fontWeight: '600',
            }}>
            Create an account
          </Text>
          <Text
            style={{
              color: '#000',
              marginLeft: 20,
              marginTop: 10,
              fontSize: 13,
              fontWeight: '400',
            }}>
            Please enter the basic details
          </Text>
          {/* <KeyboardAwareScrollView> */}
          <View style={{marginTop: 20}}>
            <CustomTextInput
              onChangeText={txt => {
                setName(txt);
              }}
              placeholder={'Full Name*'}
            />
          </View>
          <View style={{marginTop: 20}}>
            <CustomTextInput
              onChangeText={txt => {
                setEmail(txt);
              }}
              placeholder={'Email Address*'}
            />
            <View
              style={{
                width: 70,
                height: 25,
                backgroundColor: COLORS.Primary_Green,
                position: 'absolute',
                right: 30,
                top: 18,
                borderRadius: 4,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (email == '' || email.trim().length == 0) {
                    setalert_sms('Please Enter Email*');
                    setMy_Alert(true);
                  } else {
                    // validateEmail();
                    SendotpApi();
                  }
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#fff',
                    alignSelf: 'center',
                  }}>
                  {checkvalid == false ? 'Send OTP' : 'Verified'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignSelf: 'center',
              width: '90%',
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
            }}>
            <View
              style={{
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
              }}>
              <Text
                style={{
                  marginLeft: 5,
                  color: '#1F191C',
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                +1
              </Text>
            </View>
            <View
              style={{
                borderLeftColor: '#EAEDF7',
                borderLeftWidth: 1,
                height: 42,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
                marginTop: 4,
              }}
            />
            <MaskInput
              value={mobile}
              keyboardType="phone-pad"
              placeholder="Phone Number*"
              placeholderTextColor={'#CECECE'}
              style={{color: '#000', marginLeft: 15}}
              onChangeText={(masked, unmasked) => {
                setMobile(masked); // you can use the unmasked value as well

                // assuming you typed "9" all the way:
                console.log(masked); // (99) 99999-9999
                console.log(unmasked); // 99999999999
              }}
              mask={[
                '(',
                /\d/,
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
          </View>
          {/* <View style={{marginTop: 10, alignSelf: 'center', width: '90%'}}>
          <PhoneInput
            // ref={phoneInput}
            
            defaultValue={value}
            defaultCode="US"
            layout="first"
            onChangeText={text => {
              setValue(text);
              setMobile(text);
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
            placeholder={"Phone Number"}
            
            textInputStyle={{color:'#1F191C',height:50,alignSelf:'center'}}
            textInputProps={{height:50,alignSelf:'center',marginTop:4,placeholderTextColor:'#CECECE'}}
            textContainerStyle={{backgroundColor: "transparent", height: 55,marginTop:-4}}
            containerStyle={{width: '100%',height: 50, borderRadius: 7,alignSelf:'center',}}
            withDarkTheme
            withShadow
            // autoFocus
          />
        </View> */}
          <View style={{marginTop: 10}}>
            <CustomTextInput
              onChangeText={txt => {
                setpass(txt);
              }}
              placeholder={'Password*'}
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
          <View style={{marginTop: 10}}>
            <CustomTextInput
              onChangeText={txt => {
                setcpass(txt);
              }}
              placeholder={'Confirm Password*'}
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
            title={'Sign Up'}
            borderColor={'#83CDFD'}
            onPress={() => {
              SignupPressed();
            }}
            backgroundColor={COLORS.Primary_Blue}
          />
          <View
            style={{
              top: 20,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={[styles.txtStyle, {color: '#000', fontWeight: '400'}]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={[styles.signup, {color: '#3DA1E3'}]}> Sign In</Text>
            </TouchableOpacity>
          </View>
          {/* </KeyboardAwareScrollView> */}
          <View
            style={{
              // position: 'absolute',
              // bottom: 0,
              flex: 1,
              marginTop: (dimensions.SCREEN_HEIGHT * 8) / 100,
              width: '100%',
              height: (dimensions.SCREEN_HEIGHT * 25) / 100,
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
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Login')}>
                  <Text style={[styles.signup, {color: '#fff'}]}> Sign In</Text>
                </TouchableOpacity>
              </View> */}
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
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
            <View
              style={{
                alignSelf: 'center',
                width: 120,
                height: 120,
                marginTop: 20,
              }}>
              <Image
                source={images.alriightIcon}
                style={{
                  width: 120,
                  height: 120,
                }}
              />
            </View>

            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 20,
                fontSize: 20,
                fontWeight: '600',
              }}>
              Congratulations
            </Text>
            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 13,
                fontWeight: '400',
              }}>
              Your account has been successfully created
            </Text>

            <CustomButton
              title={'Go'}
              borderColor={'#83CDFD'}
              onPress={() => {
                props.navigation.navigate('Login');
                setpopup(false);
              }}
              backgroundColor={COLORS.Primary_Blue}
            />
          </View>
        </View>
      ) : null}

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisibleSendOtp}
        onRequestClose={() => setModalVisibleSendOtp(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            margin: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              height: (dimensions.SCREEN_HEIGHT * 45) / 100,
              width: dimensions.SCREEN_WIDTH,
              backgroundColor: '#FBFBFB',
              // position: 'absolute',
              bottom: 0,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderTopColor: COLORS.Primary_Blue,
              borderTopWidth: 2,
            }}>
            <ScrollView>
              <>
                {/* <Text
                style={{
                  color: COLORS.Primary_Blue,
                  marginLeft: 20,
                  marginTop: 45,
                  fontSize: 20,
                  fontWeight: '600',
                }}>
                Verify your email
              </Text> */}
                <KeyboardAvoidingView
                  style={{flex: 1}}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height-1'}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '90%',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        // marginLeft: 20,
                        marginTop: 30,
                        fontSize: 18,
                        fontWeight: '700',
                        textAlign: 'center',
                      }}>
                      {/* Cheehoo! 🤙 */}
                      Verification required
                    </Text>
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
                      To continue, complete this verification step. We've send a
                      One Time Password (OTP) to the email{' '}
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
                      textAlign: 'center',
                      marginLeft: 20,
                      // marginTop: 10,
                      fontSize: 13,
                      fontWeight: '400',
                    }}>
                    {codeData}
                  </Text> */}
                  {/* <Text
                    style={{
                      color: '#000',
                      marginLeft: 20,
                      
                      fontSize: 13,
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
                    placeholderCharacter={'*'}
                    placeholderTextColor={'#CECECE'}
                    pinCount={4}
                    code={state} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={code => {
                      setState(code);
                    }}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={code => {
                      console.log(`Code is ${code}, you are good to go!`);
                    }}
                  />
                  {checkOtpValid == true ? (
                    <View style={styles.forgotContainer}>
                      <Text style={[styles.forgotTxt, {marginTop: 10}]}>
                        The OTP entered is incorrect. Please enter correct OTP
                      </Text>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    style={styles.forgotContainer}
                    onPress={() => {SendotpApi()}}>
                    <Text style={[styles.forgotTxt, {marginTop: 10}]}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>

                  <CustomButton
                    title={'Submit'}
                    borderColor={'#83CDFD'}
                    onPress={() => {
                      // if(codeData != state){
                      //   setCheckOtpValid(true);
                      // }
                      VerifyOtpApi();
                    }}
                    backgroundColor={COLORS.Primary_Blue}
                  />
                  <View style={{height: 10}}></View>
                </KeyboardAvoidingView>
              </>
            </ScrollView>
          </View>
        </View>
      </Modal>
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

// const styless = StyleSheet.create({
//   topImgContainer: {
//     flex: 0.5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   forgotContainer: {
//     alignSelf: 'center',
//     marginRight: 20,
//     marginTop: 10,
//   },
//   underlineStyleBase: {
//     width: 30,
//     height: 45,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     color: '#000000',
//   },

//   underlineStyleHighLighted: {
//     borderColor: '#3DA1E3',
//   },
//   logo: {
//     height: heightScale(170),
//     width: widthScale(236),
//     resizeMode: 'contain',
//   },
//   container: {
//     flex: 0.6,
//     backgroundColor: '#ffff',
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//   },
//   Txt: {
//     alignSelf: 'center',
//     color: COLORS.Primary_Blue,
//     marginTop: widthScale(20),
//     fontSize: FONTS_SIZE.h1,
//     fontWeight: '700',
//     fontFamily: FONTS.bold,
//   },
//   viewContanier: {
//     height: heightScale(155),
//     borderRadius: widthScale(5),
//     borderWidth: 0.5,
//     borderColor: COLORS.primary_white,
//     width: '90%',
//     backgroundColor: '#fff',
//     alignSelf: 'center',

//     shadowColor: '#000',
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.4,
//     shadowRadius: 2,
//     elevation: 3,

//     alignItems: 'center',

//     marginTop: 20,
//   },
//   resumeTxt: {
//     color: COLORS.grey,
//     marginTop: widthScale(20),
//     fontSize: FONTS_SIZE.h4,
//     fontWeight: '500',
//     fontFamily: FONTS.regular,
//   },
//   instructionTxt: {
//     fontSize: FONTS_SIZE.body5,
//     fontFamily: FONTS.regular,
//     fontWeight: '300',
//     marginTop: 10,
//   },
//   sizeStyle: {
//     fontSize: FONTS_SIZE.body4,
//     fontFamily: FONTS.regular,
//     color: COLORS.grey,
//   },
//   btnContainer: {
//     height: 40,
//     borderWidth: 0.6,
//     borderColor: COLORS.primary_white,
//     width: '90%',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center',

//     gap: 10,
//   },
//   btn: {
//     height: 25,
//     width: 100,
//     backgroundColor: COLORS.Primary_Blue,
//     borderRadius: 3,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: widthScale(30),
//   },
//   txt: {
//     fontSize: FONTS_SIZE.body3,
//     fontFamily: FONTS.regular,
//     color: COLORS.light_white,
//   },
//   textInputContainer: {
//     height: heightScale(130),
//     borderRadius: widthScale(5),
//     borderWidth: 0.5,
//     borderColor: COLORS.primary_white,
//     width: '90%',
//     backgroundColor: '#fff',
//     alignSelf: 'center',

//     shadowColor: '#000',
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.4,
//     shadowRadius: 2,
//     elevation: 3,
//     marginTop: 20,
//   },
//   txtInput: {
//     flex: 1,
//     textAlignVertical: 'top',
//     paddingLeft: 15,
//   },
// });
// const mystyles = StyleSheet.create({
//   topImgContainer: {
//     flex: 0.9,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   logo: {
//     height: heightScale(170),
//     width: widthScale(236),
//     resizeMode: 'contain',
//   },
//   container: {
//     flex: 0.2,
//     backgroundColor: '#ffff',
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//   },

//   container: {
//     flex: 1,
//     backgroundColor: COLORS.light_white,
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//   },
//   txt: {
//     fontSize: FONTS_SIZE.h1,
//     fontWeight: '700',
//     fontFamily: FONTS.regular,
//     color: COLORS.Primary_Blue,
//     alignSelf: 'center',
//     marginTop: 30,
//   },
//   SignupTxtContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//     gap: 5,
//   },
//   txtStyle: {
//     fontSize: FONTS_SIZE.h4,
//     fontFamily: FONTS.regular,
//     color: COLORS.grey,
//     fontWeight: '600',
//   },
//   signup: {
//     fontSize: FONTS_SIZE.h4,
//     fontFamily: FONTS.regular,
//     fontWeight: '600',
//     color: COLORS.Primary_Green,
//   },
//   modalContainerStyle: {
//     backgroundColor: COLORS.light_white,
//     height: myHeight * 0.5,
//     width: '90%',
//     alignSelf: 'center',
//     marginBottom: myHeight * 0.2,
//     borderRadius: 20,
//   },
//   topContainer: {
//     alignItems: 'center',
//   },
//   img: {
//     height: heightScale(120),
//     width: widthScale(120),
//     resizeMode: 'contain',
//   },
//   modalCotationTxt: {
//     fontSize: FONTS_SIZE.h2,
//     fontWeight: '700',
//     fontFamily: FONTS.regular,
//     color: COLORS.Primary_Blue,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   conditionalTxtStyle: {
//     fontSize: FONTS_SIZE.body3,
//     fontFamily: FONTS.regular,
//     color: COLORS.grey,
//     textAlign: 'center',
//     width: '90%',
//     marginTop: 20,
//   },
//   txtContainer: {
//     width: '85%',
//     height: 35,
//     backgroundColor: COLORS.secondary_blue,
//     borderRadius: widthScale(5),
//     marginTop: 10,
//     justifyContent: 'center',
//   },

//   btnTxtStyle: {
//     fontSize: FONTS_SIZE.body4,
//     textAlign: 'center',
//     fontFamily: FONTS.regular,
//     color: COLORS.light_white,
//   },
// });

export default SignUpScreen;
