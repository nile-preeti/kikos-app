import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import CustomheaderCard1 from '../../components/CustomheaderCard1';
import images from '../../global/images';
import {FONTS} from '../../global/Utils';
import {dimensions} from '../../utility/Mycolors';
import COLORS from '../../global/Colors';
import {requestPostApi, tour_details} from '../../WebApi/Service';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {onLogoutUser} from '../../redux/actions/user_action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

const ContactUs = props => {
  const user = useSelector(state => state.user.user_details);
  const dispatch = useDispatch();

  const [DATA2, setDATA2] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);
  const dialCall = num => {
    console.log('numbers', num);
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:'+"+1"+ num;
    } else {
      phoneNumber = 'tel:'+"+1"+ num;
      // phoneNumber = 'telprompt:${' + num + '}';
    }
    Linking.openURL(phoneNumber);
  };
  const sendEmail = myMail => {
    console.log('sendEmail email', myMail);
    Linking.openURL(`mailto:${myMail}`);
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.White, flex: 1}}>
      <CustomHeader
        title={'Contact Us'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View style={{marginTop: 2, flex: 1, alignSelf: 'center'}}>
            <View style={{padding: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#ffffff',
                      borderRadius: 20,
                      shadowColor: '#000',
                      shadowOffset: {width: 3, height: 0},
                      shadowOpacity: 0.4,
                      shadowRadius: 2,
                      elevation: 3,
                      padding: 15,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 16,
                        lineHeight: 20,
                      }}>
                      (808) 206-9033
                    </Text>
                    <Text
                      style={{
                        color: '#1F191C',
                        fontWeight: '500',
                        fontSize: 14,
                        lineHeight: 24,
                        marginTop: 10,
                      }}>
                      For small group tours, we can customize an intinerary to
                      emphasize your interests. If you have a special request,
                      send us a message, and we will be sure to get back to you
                      soon.
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#ffffff',
                      borderRadius: 20,
                      shadowColor: '#000',
                      shadowOffset: {width: 3, height: 0},
                      shadowOpacity: 0.4,
                      shadowRadius: 2,
                      elevation: 3,

                      marginTop: 10,
                    }}>
                    <View style={{marginTop: 20, paddingHorizontal: 15}}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 18,
                          lineHeight: 20,
                        }}>
                        Kikos Tours Oahu
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          width: '100%',
                          marginTop: 15,
                        }}>
                        <Image
                          source={require('../../assets/images/Icons/location_black.png')}
                          style={{height: 25, width: 25}}
                        />
                        <Text
                          style={{
                            color: '#1F191C',
                            fontWeight: '400',
                            fontSize: 14,
                            lineHeight: 20,
                            marginLeft: 10,
                          }}>
                          582D Hahaione Street, Honolulu, Hawaii 96825, United
                          States
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 15,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          dialCall('(808)206-2205');
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          width: '100%',
                          marginTop: 15,
                        }}>
                        <Image
                          source={require('../../assets/images/Icons/call_icon_black.png')}
                          style={{height: 25, width: 25}}
                        />
                        <Text
                          style={{
                            color: '#1F191C',
                            fontWeight: '400',
                            fontSize: 14,
                            lineHeight: 20,
                            marginLeft: 10,
                          }}>
                         +1 (808)206-2205
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          sendEmail('klinekristi@hotmail.com');
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          width: '100%',
                          marginTop: 15,
                          marginBottom: 10,
                        }}>
                        <Image
                          source={require('../../assets/images/Icons/sms_black.png')}
                          style={{height: 25, width: 25}}
                        />
                        <Text
                          style={{
                            color: '#1F191C',
                            fontWeight: '400',
                            fontSize: 14,
                            lineHeight: 20,
                            marginLeft: 10,
                          }}>
                          klinekristi@hotmail.com
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#EAEDF7',
                        paddingHorizontal: 15,
                        height: 40,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                      }}>
                      <Text
                        style={{
                          color: '#1F191C',
                          fontWeight: '400',
                          fontSize: 12,
                          marginTop: 10,
                        }}>
                        *24 hour notice cancellation for booked tours, Mahalo
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 400,
                width: 400,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
            {/* <FlatList
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  data={DATA2}
                  renderItem={({item, index}) => {
                    return (
                      <>
                        <TouchableOpacity
                          style={styles.touchableOpacity}
                          onPress={() => {}}>
                          <ImageBackground
                            style={styles.imageBackground}
                            resizeMode="stretch"
                            source={require('../../assets/images/largeimages/groupframe.png')}></ImageBackground>
    
                          <View style={{padding: 15}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between',
                              }}>
                              <View style={{width: '100%'}}>
                                <Text
                                  style={{
                                    color: '#000',
                                    fontWeight: '700',
                                    fontSize: 15,
                                    lineHeight: 20,
                                  }}>
                                  North Shore
                                </Text>
                                
                                <View style={{flexDirection: 'row'}}>
                                  <Image source={images.gallaryicon} />
                                  <Text style={[styles.titleTxt, {marginLeft: 10}]}>
                                    432 Photos
                                  </Text>
                                  <Image
                                    style={{marginLeft: 10,height:14,width:14}}
                                    source={images.gallaryvideoicon}
                                  />
                                  <Text style={[styles.titleTxt, {marginLeft: 10}]}>
                                    432 Photos
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    color: '#3DA1E3',
                                    fontWeight: '700',
                                    fontSize: 15,
                                  }}>
                                  Purchase at $23.00
                                </Text>
                                <Text
                                  style={{
                                    color: '#8F93A0',
                                    fontWeight: '400',
                                    fontSize: 12,
                                    lineHeight: 20,
                                  }}>
                                  09:45 AM
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </>
                    );
                  }}
                /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  hrcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 2,
  },
  titleTxt: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FONTS.regular,
    marginLeft: 2,
    color: '#3DA1E3',
  },
  calCantainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 50,
    width: '95%',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    //   flex: 1,
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scontainer: {
    height: 50,
    width: 60,
    backgroundColor: '#3DA1E3',
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    padding: 10,
    color: '#8F93A0',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.regular,
  },
  calendar: {
    marginRight: 10,
    height: 30,
    width: 30,
    tintColor: '#CECECE',
  },
  touchableOpacity: {
    marginHorizontal: 10,
    width: (dimensions.SCREEN_WIDTH * 92) / 100,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 20,
  },
  imageBackground: {
    width: '100%',
    height: 150,
    resizeMode: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
