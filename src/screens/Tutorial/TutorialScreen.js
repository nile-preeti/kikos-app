import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import images from '../../global/images';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import {
  FONTS,
  FONTS_SIZE,
  heightScale,
  myHeight,
  widthScale,
} from '../../global/Utils';
import COLORS from '../../global/Colors';
import CustomButton from '../../components/CustomButton/CustomButton';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setLoading, saveUserResult} from '../../redux/actions/user_action';
const TutorialScreen = ({navigation}) => {
  const dispatch = useDispatch();
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

    AsyncStorage.setItem('kikos', JSON.stringify(dddd));
    dispatch(saveUserResult(data));
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/largeimages/loginbg.png')}
        style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
        resizeMode="stretch">
        <LinearGradient
          style={{flex: 1}}
          colors={['#FFFFFF', '#FFFFFF', '#23356F61', '#23356F61']}
          start={{x: 0, y: 0}}
          end={{x: 0.6, y: 1}}>
          <View style={styles.container}>
            <View style={{width: 100, height: '15%'}}></View>
            <CustomFastImage
              imageStyle={styles.logo}
              img={images.loginlogo}
              resizeMode={'contain'}
            />

            <Text
              style={[
                styles.txtStyle,
                {fontSize: 31, marginTop: 15, color: '#3DA1E3', opacity: 1},
              ]}>
              Aloha
            </Text>
            <Text
              style={[
                styles.txtStyle,
                {fontSize: 31, marginTop: 10, color: '#3DA1E3'},
              ]}>
              You found the spot!
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 50,
              width: '100%',
            }}>
            <CustomButton
              title={'Start Here'}
              backgroundColor={COLORS.Primary_Blue}
              borderColor={'#83CDFD'}
              txtStyle={{color: '#fff', fontFamily: FONTS.alloyInk}}
              onPress={() => {
                loginPress();
                // navigation.navigate('SignUp')E Komo Mai
              }}
            />
            <View style={{marginLeft: 10}}>
              <CustomButton
                title={'Sign In'}
                backgroundColor={COLORS.light_white}
                borderColor={'#F4F4F4'}
                txtStyle={{color: '#000', fontFamily: FONTS.alloyInk}}
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    height: heightScale(206),
    width: widthScale(206),
    resizeMode: 'stretch',
  },
  txt: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: FONTS.regular,
    width: '90%',
    textAlign: 'center',
    color: COLORS.light_white,
    marginTop: 10,
    alignSelf: 'center',
  },
  txtStyle: {
    fontSize: FONTS_SIZE.body3,
    width: '100%',
    color: COLORS.light_white,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '400',
    fontFamily: FONTS.alloyInk,
  },
  bottomTxt: {
    fontSize: FONTS_SIZE.h4,
    fontWeight: '600',
    fontFamily: FONTS.regular,
    color: COLORS.light_white,
    opacity: 0.9,

    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    bottom: 3,
  },
  backgroundVideo: {
    height: myHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  termsTxt: {
    fontSize: FONTS_SIZE.h4,
    color: COLORS.light_white,
  },
  conditionTxtStyle: {
    fontSize: FONTS_SIZE.body3,
    color: COLORS.primary_white,

    opacity: 0.9,
    marginLeft: 4,
  },
  singUpTxt: {
    color: COLORS.Primary_Green,
  },
});
