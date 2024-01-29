import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Linking,
} from 'react-native';
import HomeHeaderComponent from '../../components/HomeHeaderComponent';
import {dimensions} from '../../utility/Mycolors';
import {FONTS} from '../../global/Utils';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomButton from '../../components/CustomButton/CustomButton';
import {
  get_tax_booking_list,
  get_virtual_tour,
  requestGetApi,
  requestPostApi,
  tour_details,
} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';

const BookTaxiScreen = props => {
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [orderDate, setOrderDate] = useState('');
  const [showda, setshowda] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getBookTaxi();
    });
    return unsubscribe;
  }, []);

  const getBookTaxi = async () => {
    setLoading(true);
    const {responseJson, err} = await requestGetApi(
      get_tax_booking_list,
      '',
      'GET',
      user.token,
    );
    setLoading(false);
    console.log('the getBookTaxi==>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        setDataList(responseJson.data);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else if (err == null) {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

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
  return (
    <SafeAreaView style={{backgroundColor: COLORS.White, height: '100%'}}>
      <HomeHeaderComponent
        stylecontainer={{height: 110}}
        icon1={require('../../assets/images/Icons/firstline2.png')}
        press1={() => {
          props.navigation.openDrawer();
        }}
        press2={() => {
          props.navigation.navigate('Notification');
        }}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: dimensions.SCREEN_WIDTH * 1,
          // marginTop:-40,flex:1
        }}>
        {user.userid != undefined ? (
          <View style={{justifyContent:'center',alignItems:'center',width: dimensions.SCREEN_WIDTH * 1,marginTop:datalist.length > 0 ? 60 : -80,}}>
            <View style={[styles.calCantainer, {marginTop: -10}]}>
              <View style={styles.container}>
                <Text style={styles.dateText}>
                  {orderDate
                    ? moment(orderDate).format('LL')
                    : 'Search Book Date'}
                </Text>
                <Image
                  resizeMode="contain"
                  style={styles.calendar}
                  source={images.calendar}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setshowda(true);
                }}
                style={styles.scontainer}>
                <Image source={images.fillter} />
              </TouchableOpacity>
            </View>

            <View style={{}}>
              {Platform.OS == 'ios' ? (
                <DatePicker
                  customStyles={{
                    dateInput: {borderColor: 'transparent'},
                    dateText: {color: Mycolors.GrayColor},
                    dateIcon: styles.dateIcon,
                    dateplaceholder: {
                      alignContent: 'flex-start',
                    },
                    placeholderText: {
                      fontSize: 15,
                      color: Mycolors.GrayColor,

                      left: Platform.OS == 'ios' ? -30 : 5,
                    },
                    zIndex: 99999,
                  }}
                  showIcon={false}
                  androidMode={'spinner'}
                  readOnly={true}
                  style={[
                    styles.datePickerSelectInput,
                    {
                      fontSize: 11,
                      color: Mycolors.GrayColor,
                      left: Platform.OS == 'ios' ? 15 : 10,
                    },
                  ]}
                  date={orderDate}
                  mode="date"
                  placeholder={'Pick a Date'}
                  // minimumDate={orderendDate != "" ? new Date(moment(orderendDate).format("YYYY-MM-DD")) : new Date() }
                  // maximumDate={new Date()}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={date => {
                    console.log('datae isss==>>', date);
                    setOrderDate(date);
                  }}
                />
              ) : showda ? (
                <View>
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    // is24Hour={true}
                    display="spinner"
                    dateFormat="YYYY-MM-DD"
                    // minimumDate={orderendDate != "" ? new Date(moment(orderendDate).format("YYYY-MM-DD")) : new Date() }
                    // maximumDate={new Date()}
                    onChange={(event, sTime) => {
                      setshowda(false);
                      console.log('SelectDate.start....', sTime.toDateString());
                      setOrderDate(sTime);
                      console.log(event);
                    }}
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.btncontainer}>
              <Text style={styles.txt}>Taxi Booking Requests</Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  props.navigation.navigate('BookTaxi');
                }}>
                <View
                  style={{
                    width: 50,
                    // alignSelf: 'center',
                    alignItems: 'center',
                    height: 50,
                    borderRadius: 50 / 2,
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(228, 228, 228, 1)',
                  }}>
                  <Text style={styles.btnTxt}>Book Taxi</Text>
                </View>
              </TouchableOpacity>
            </View>
            {datalist.length > 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 300,
                }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={datalist}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <>
                        <View style={styles.cardConainer}>
                          <View style={styles.btnContainer1}>
                            <View style={styles.imgContainer}>
                              <Image
                                style={styles.img}
                                source={
                                  item?.user_profile != ''
                                    ? {uri: `${item?.user_profile}`}
                                    : require('../../assets/images/largeimages/dummy_profile.png')
                                }
                              />
                            </View>
                            <Text numberOfLines={1} style={styles.titleTxt}>
                              {item?.user_name}
                            </Text>
                            <TouchableOpacity
                              style={styles.callContainer}
                              onPress={() => {
                                dialCall(item?.mobile);
                              }}>
                              <Image source={images.callicon} />
                            </TouchableOpacity>
                          </View>

                          <View style={styles.line}></View>
                          <View style={styles.locationContainer}>
                            <Image source={images.location} />
                            <View>
                              <Text style={styles.pickuplocationTxt}>
                                Pickup Location
                              </Text>
                              <Text numberOfLines={2} style={styles.location}>
                                {item?.pickup_location}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.locationContainer}>
                            <Image
                              style={{tintColor: '#3DA1E3'}}
                              source={images.location}
                            />
                            <View>
                              <Text style={styles.dropoffLocation}>
                                Drop Off Location
                              </Text>
                              <Text style={styles.location}>
                                {item?.drop_location}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.hotelTxtContainer}>
                            <View style={{width: '40%'}}>
                              <Text style={styles.hotelTxt}>Hotel</Text>
                              <Text numberOfLines={2} style={styles.hotelName}>
                                {item?.hotel_name}
                              </Text>
                            </View>
                            <View style={{width: '40%'}}>
                              <Text style={styles.hotelTxt}>Date & Time</Text>
                              <Text numberOfLines={2} style={styles.hotelName}>
                                {item?.booking_time}
                              </Text>
                            </View>
                          </View>
                          <View style={[styles.line, {marginTop: 18}]}></View>
                          <View style={styles.bookingIdContainer}>
                            <Text style={styles.bookingIdTxt}>Booking ID:</Text>
                            <Text style={styles.bookingIdN}>
                              {item?.booking_id}
                            </Text>
                            <Image
                              resizeMode="contain"
                              source={images.document}
                              style={{marginLeft: 7}}
                            />
                          </View>
                        </View>
                      </>
                    );
                  }}
                />
              </View>
            ) : (
              <>
                <View style={{marginTop: 40,}}>
                  <View style={{height: 350, width: 350, alignSelf: 'center'}}>
                    <Image
                      resizeMode="stretch"
                      source={require('../../assets/images/largeimages/photoboothwithloginicon.png')}
                      style={{
                        height: '100%',
                        width: '100%',
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: '#000000',
                      alignSelf: 'center',
                      marginTop: 45,
                      fontSize: 20,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    No data found
                  </Text>
                </View>
              </>
            )}
          </View>
        ) : (
          <View style={{marginTop: 40,width:'90%'}}>
            <View style={{height: 350, width: 350, alignSelf: 'center'}}>
              <Image
                resizeMode="stretch"
                source={require('../../assets/images/largeimages/photoboothwithloginicon.png')}
                style={{height: '100%', width: '100%', alignSelf: 'center'}}
              />
            </View>
            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 45,
                fontSize: 20,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              To access book taxi you need an account.
            </Text>
            <CustomButton
            borderColor={'#83CDFD'}
            title={'Login / Signup'}
            onPress={() => {
              AsyncStorage.clear();
              dispatch(onLogoutUser());
            }}
            backgroundColor={COLORS.Primary_Blue}
          />
          </View>
        )}
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
    </SafeAreaView>
  );
};

export default BookTaxiScreen;

const styles = StyleSheet.create({
  calCantainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '89%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal:20
  },
  container: {
    height: 55,
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginTop: 70,
    // marginLeft: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scontainer: {
    height: 55,
    width: 55,
    backgroundColor: '#3DA1E3',
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
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
  btncontainer: {
    width: '89%',
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#EAEDF7',
    height: 60,
    marginTop: 20,
    justifyContent: 'space-between',
    // padding: 10,
    // flex:1
  },

  txt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    // fontFamily: FONTS.regular,
    // marginLeft: 12,
    lineHeight: 20,
  },
  btn: {
    height: 60,
    width: 60,
    backgroundColor: '#3DA1E3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60 / 2,
    borderWidth: 5,
    borderColor: '#83CDFD',
  },
  btnTxt: {
    fontSize: 11,
    fontWeight: '400',
    color: '#fff',
    lineHeight: 10,
    textAlign: 'center',
    fontFamily: FONTS.alloyInk,
  },
  cardConainer: {
    flex: 1,
    // height: 285,
    width: dimensions.SCREEN_WIDTH * 0.89,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 1,
    justifyContent: 'center',
    // alignItems:'center',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  btnContainer1: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  imgContainer: {
    height: 40,
    width: 40,
    borderRadius: 99,
    marginTop: 2,
  },
  img: {
    height: 37,
    width: 37,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  callContainer: {
    height: 35,
    width: 35,
    backgroundColor: '#3DA1E3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    flex: 1,

    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#000',
    fontFamily: FONTS.regular,
  },
  line: {
    height: 0.3,
    backgroundColor: '#000',
    marginTop: 10,
  },
  locationContainer: {
    width: '90%',
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
    alignItems: 'center',
    gap: 5,
  },
  pickuplocationTxt: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: FONTS.regular,
    color: '#000',
  },
  location: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#8F93A0',
    fontFamily: FONTS.regular,
  },
  dropoffLocation: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: FONTS.regular,
    color: '#3DA1E3',
  },
  hotelTxtContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  hotelTxt: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.regular,
    color: '#1F191C',
  },
  hotelName: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FONTS.regular,
    color: '#8F93A0',
  },
  bookingIdContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  bookingIdTxt: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.regular,
    color: '#505667',
  },
  bookingIdN: {
    color: '#8F93A0',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.regular,
  },
});
