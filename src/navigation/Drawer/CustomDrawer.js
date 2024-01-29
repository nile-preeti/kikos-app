import React, {Component, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Modal,
} from 'react-native';
import DrawerHeader from '../../components/DrawerHeader';
import CustomScreen from '../../components/CustomScreen';
import images from '../../global/images';
import {FONTS, heightScale, widthScale} from '../../global/Utils';
import CustomFastImage from '../../components/FastImage/CustomFastImage';
import COLORS from '../../global/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoading,
  onLogoutUser,
  saveUserResult,
} from '../../redux/actions/user_action';
import {WebView} from 'react-native-webview';
import {dimensions} from '../../utility/Mycolors';

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details);
  const [name, setname] = useState('John Dev.');
  const [loder, setLoder] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [subExp, setsubExp] = useState(false);
  const [loading, setLoading] = useState(false);
  const[webViewVisible,setWebViewVisible]=useState(false);
  const[getWebViewUrlBasedOnTitle,setGetWebViewUrlBasedOnTitle]=useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.imgContainer}>
          <Image style={styles.imageStyle} source={images.drawerlogo}></Image>
        </View>
        <View
          style={{width: '100%', height: 0.5, backgroundColor: '#CECECE'}}
        />
        <DrawerHeader
          onPressprofile={() => {
            if (user.userid != undefined) {
              props.navigation.navigate('Profile');
            } else {
              props.navigation.closeDrawer();
              AsyncStorage.clear();
              dispatch(onLogoutUser());
            }
          }}
        />
        {/* <View style={styles.drowerComponentStyle}>
          <CustomScreen
            image={images.home}
            title={'Home'}
            onPress={() => {
              props.navigation.navigate('HomeStack');
            }}
          />
        </View> */}
        <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
          <CustomScreen
            image={images.aboutuskikos}
            title={'About Us'}
            onPress={() => {
              setGetWebViewUrlBasedOnTitle('http://100.21.178.252/about-us');
             setWebViewVisible(true);
             props.navigation.closeDrawer();
             // Linking.openURL('http://100.21.178.252/about-us');
            }}
          />
        </View>
        <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
          <CustomScreen
            image={images.contactus}
            title={'Contact Us'}
            onPress={() => {
              props.navigation.navigate('ContactUs');
            }}
          />
        </View>
        {/* <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
      <CustomScreen image={images.message} title={'Virtual Tours'} />
    </View> */}
        <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
          <CustomScreen image={images.ratingicon} title={'Rating & Reviews'} />
        </View>
        <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
          <CustomScreen
            image={images.termsandcond}
            title={'Terms & Conditions'}
            onPress={() => {
              setGetWebViewUrlBasedOnTitle('http://100.21.178.252/term-condition');
              setWebViewVisible(true);
              props.navigation.closeDrawer();
              // Linking.openURL('http://100.21.178.252/term-condition');
            }}
          />
        </View>
        <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
          <CustomScreen
            image={images.privacypolicy}
            title={'Privacy Policy'}
            onPress={() => {
              setGetWebViewUrlBasedOnTitle('http://100.21.178.252/privacy-policy');
              setWebViewVisible(true);
              props.navigation.closeDrawer();
              // Linking.openURL('http://100.21.178.252/privacy-policy');
            }}
          />
        </View>
        {user.userid != undefined ? (
          <View style={[styles.drowerComponentStyle, {marginTop: 15}]}>
            <CustomScreen
              image={images.logouticon}
              title={'Log Out'}
              onPress={() => {
                props.navigation.closeDrawer();
                AsyncStorage.clear();
                dispatch(onLogoutUser());
              }}
            />
          </View>
        ) : null}

        <LinearGradient
          colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#3DA1E3']}
          start={{x: -2, y: 1}}
          end={{x: 1, y: 1}}
          style={styles.followcontainer}>
          <Text style={styles.title}>Follow Us!</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.facebook.com/kikostoursoahu/');
              }}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/Icons/facebook_icon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.instagram.com/kikostoursoahu/');
              }}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/Icons/instagram_icon.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            {/* <Image source={require('../../assets/images/Icons/youtube_icon.png')} style={[styles.image,{width:26}]} /> */}

            {/* <Image source={require('../../assets/images/Icons/X_icon.png')} style={styles.image} /> */}
          </View>
        </LinearGradient>
        <View
          style={{justifyContent: 'center', position: 'absolute', bottom: 60}}>
          <Text style={[styles.title]}>App Version: V1.0.0.1</Text>
        </View>
      </View>
      <Modal visible={webViewVisible} animationType="slide" transparent={false}>
        <View style={{flex: 1}}>
          <WebView  
          contentMode="mobile"
          source={{uri: getWebViewUrlBasedOnTitle}}
            // Other WebView props...
          />
          <TouchableOpacity
            onPress={()=>{setWebViewVisible(false)}}
            style={{
              backgroundColor: '#2084C7',
              height: 60,
              justifyContent: 'center',
            }}>
            {/* Close button or any UI to close the WebView */}
            <Text
              style={{
                fontFamily: FONTS.alloyInk,
                fontSize: 16,
                color: 'white',
                fontWeight: '600',
                alignSelf: 'center',
              }}>
              Close WebView
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drowerComponentStyle: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 30,
  },
  imageStyle: {
    height: heightScale(130),
    width: widthScale(130),
    resizeMode: 'stretch',
  },
  followcontainer: {
    height: 100,
    // width:'100%',

    justifyContent: 'center',
    // alignItems: 'center',
    //  position:'absolute',
    marginTop: 60,
    // bottom:30,
    // alignSelf: 'center',
  },
  imgContainer: {
    marginVertical: 25,
    // marginBottom:10,
    alignItems: 'center',

    alignSelf: 'center',
  },
  title: {
    fontWeight: '400',
    fontSize: 14,
    color: '#1F191C',
    marginLeft: 15,
  },
  image: {
    height: 25,
    width: 25,
    marginLeft: 15,
  },
});
export default CustomDrawer;
