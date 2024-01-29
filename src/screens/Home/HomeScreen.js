import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useRef, useEffect, Component} from 'react';
import {Mycolors, dimensions} from '../../utility/Mycolors';
import HomeHeaderComponent from '../../components/HomeHeaderComponent';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLoading, saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {calendarEvents, home, requestGetApi, requestPostApi} from '../../WebApi/Service';
import COLORS from '../../global/Colors';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS} from '../../global/Utils';
import {BlurView} from '@react-native-community/blur';

const HomeScreen = props => {
  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: `Allow Yarrow to access this devices's location.`,
  //           message: '',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('You can use the location');
  //       } else {
  //         console.log('location permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   } else {
  //     const auth = await Geolocation.requestAuthorization('whenInUse');
  //     // setIosLocation(auth);
  //     console.log(auth);
  //   }
  //   };

  //    useEffect(() => {
  //      requestCameraPermission();
  //    }, []);

  //   const locationGet = async () => {
  // setLoading(true);
  // if (Platform.OS === 'ios') {
  //   if (iosLocation !== 'granted') {
  //     return Alert.alert(
  //       'Alert!',
  //       `We're unable to connect to your location. Please provide the location access.`,
  //       [{text: 'Ok'}],
  //       {cancelable: true},
  //     );
  //   }
  // }

  // Geolocation.getCurrentPosition(
  //   position => {
  //     console.log(position);
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   },
  //   error => {
  //     // See error code charts below.
  //     console.log('error in location :->> ', error.code, error.message);
  //   },
  //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  // );
  // };

  const [DATA2, setDATA2] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);
  const [click1, setclick1] = useState('Mon');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details);
  const [DATA, setDATA] = useState([]);
  const [edit, setedit] = useState(false);
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [My_Alert, setMy_Alert] = useState(false);
const[calendatData,setCalendatData]=useState([]);

  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [lod, setlod] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    getprofile();
    // GetCalenderEvents();
    props.navigation.closeDrawer();
  }, []);

  const getprofile = async () => {
    setLoading(true);
    const {responseJson, err} = await requestGetApi(home, '', 'GET', '');
    setLoading(false);
    // console.log('the getprofile==>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        setDATA(responseJson.data);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else if(err == null) {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  // const GetCalenderEvents = async()=> {
  //   setLoading(true);
    
  //   const {responseJson, err} = await requestGetApi(
  //     calendarEvents,
  //     '',
  //     'GET',
  //     '',
  //   );
  //   setLoading(false);
  //   console.log('the res=PostTourDetails=>>', responseJson);
  //   if (err == null) {
  //     if (responseJson.status == true) {
  //       setCalendatData(responseJson);
         
   
  //     } else {
  //       setalert_sms(responseJson.message);
  //       setMy_Alert(true);
  //     }
  //   } else {
  //     setalert_sms(err);
  //     setMy_Alert(true);
  //   }
    
  // };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E8ECF2'}}>
      {/* <View style={{ backgroundColor: '#E8ECF2',flex:1}}> */}
      <HomeHeaderComponent
        icon1={require('../../assets/images/Icons/firstline2.png')}
        press1={() => {
          props.navigation.openDrawer();
        }}
        press2={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <View style={{top: -60, marginBottom: 60}}>
        <ScrollView style={{height: '100%'}}>
          <ImageBackground
            style={{
              width: (dimensions.SCREEN_WIDTH * 95) / 100,
              height: 270,
              resizeMode: 'stretch',
              justifyContent: 'flex-end',
              alignSelf: 'center',
              borderRadius: 15,

              // overflow: 'hidden',
            }}
            source={require('../../assets/images/largeimages/Rectangle.png')}>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <LinearGradient
                style={{
                  width: '100%',
                  height: 46,
                  justifyContent: 'flex-end',
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}
                colors={[
                  'rgba(61, 161, 227, 0.58)',
                  'rgba(61, 161, 227, 0.58)',
                ]}>
                 
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    backgroundColor: 'transparent',
                    color: '#fff',
                    fontWeight: '600',
                    alignSelf: 'flex-end',
                    marginTop: 2,
                    marginRight: 20,
                  }}>
                  (808)206-2205
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    backgroundColor: 'transparent',
                    fontSize: 17,
                    color: '#fff',
                    fontWeight: '600',
                    alignSelf: 'flex-end',
                    // marginLeft: 42,
                    marginRight: 20,
                  }}>
                  YOUR GUIDE TO ADVENTURE ON O'AHU
                </Text>
                
              </LinearGradient>
            </View>
          </ImageBackground>
          <View
            style={{width: '100%', height: 30, marginLeft: 20, marginTop: 15}}>
            <Text
              style={{
                fontSize: 20,
                color: '#000',
                fontWeight: '600',
                marginBottom: 0,
              }}>
              Aloha!
            </Text>
            <View style={{height: 110}}>
              <Text style={{fontSize: 14, color: '#000', fontWeight: '500'}}>
                You are about to experience the best place on Earth, Hawai’i no
                ka oi. Private group tours and comfortable seating.
              </Text>
            </View>
          </View>

          <View style={{marginTop: 65, flex: 1, height: '100%'}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={DATA}
              renderItem={({item, index}) => {
                return (
                  <>
                    <View
                      style={{
                        width: (dimensions.SCREEN_WIDTH * 95) / 100,
                        borderRadius: 20,
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowRadius: 10,
                        // shadowOffset: {height: 0, width: 3},
                        shadowOpacity: 1,
                        elevation: 3,
                        marginBottom: 20,
                        // flex: 1,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('BookDetails', {
                            tourId: item.id,
                            // CalendarList:calendatData
                          });
                          // styles = {flex: 1};
                        }}>
                        <ImageBackground
                          style={{
                            width: '100%',
                            height: 300,
                            resizeMode: 'stretch',
                            justifyContent: 'flex-end',
                            borderRadius: 20,

                            overflow: 'hidden',
                          }}
                          // resizeMode="cover"
                          source={{uri: `${item?.images}`}}>
                          <LinearGradient
                            style={{
                              borderRadius: 5,
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                              position: 'absolute',
                              right: 10,
                              top: 15,
                              flex: 1,
                            }}
                            colors={[
                              'rgba(76, 186, 8, 0.66)',
                              'rgba(76, 186, 8, 0.66)',
                            ]}>
                            <Text
                              style={{
                                backgroundColor: 'transparent',
                                color: 'rgba(255, 255, 255, 1)',
                                fontWeight: '700',
                                fontSize: 14,
                                fontFamily: FONTS.bold,
                              }}>
                              US${item?.under_10_age_price} – /US$
                              {item?.age_60_price}
                            </Text>
                          </LinearGradient>
                          <LinearGradient
                            style={{
                              width: '100%',
                              justifyContent: 'flex-end',
                              borderBottomLeftRadius: 20,
                              borderBottomRightRadius: 20,
                            }}
                            colors={[
                              'rgba(61, 161, 227, 0.8)',
                              'rgba(61, 161, 227, 0.8)',
                            ]}>
                              
                            <View
                              style={{
                                padding: 12,
                                paddingHorizontal: 20,
                                backgroundColor: 'transparent',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '100%',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <View style={{width: '70%'}}>
                                  <Text
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: '#FFFFFF',
                                      fontWeight: '700',
                                      fontSize: 16,
                                    }}>
                                    {item?.title}
                                  </Text>
                                  <Text
                                    numberOfLines={2}
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: '#FFFFFF',
                                      fontWeight: '400',
                                      fontSize: 13,
                                      lineHeight: 18,
                                    }}>
                                    {item?.name} • {item?.duration} Hours
                                  </Text>
                                </View>

                                <TouchableOpacity
                                  style={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: 55 / 2,
                                    backgroundColor: COLORS.Primary_Blue,
                                    justifyContent: 'center',
                                    borderWidth: 6,
                                    borderColor: 'rgba(131, 205, 253, 1)',
                                  }}
                                  onPress={() => {
                                    props.navigation.navigate('BookDetails', {
                                      tourId: item.id,
                                    });
                                  }}>
                                  <View
                                    style={{
                                      width: 45,
                                      alignSelf: 'center',
                                      height: 45,
                                      borderRadius: 45 / 2,
                                      justifyContent: 'center',
                                      borderWidth: 1,
                                      borderColor: 'rgba(228, 228, 228, 1)',
                                    }}>
                                    <Text
                                      style={{
                                        backgroundColor: 'transparent',
                                        color: '#fff',
                                        fontWeight: '600',
                                        fontSize: 13,
                                        alignSelf: 'center',
                                      }}>
                                      View
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </LinearGradient>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  </>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {loading ? <Loader /> : null}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
