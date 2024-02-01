import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Platform,
} from 'react-native';
import React, {
  useState,
  Fragment,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import {FONTS, FONTS_SIZE, heightScale, widthScale} from '../../global/Utils';
import AntDesign from 'react-native-vector-icons';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {ScrollView} from 'react-native-gesture-handler';
import {Calendar, LocaleConfig, CalendarUtils} from 'react-native-calendars';
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import PhoneInput from 'react-native-phone-number-input';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {
  booking_taxi,
  callback_request,
  requestPostApi,
  tour_details,
} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';
import MaskInput from 'react-native-mask-input';

const BookTaxi = props => {
  const user = useSelector(state => state.user.user_details);
  const ProfileDetail = useSelector(state => state.user.ProfileDetails);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [pickuploc, setPickUpLoc] = useState('');
  const [droploc, setDropLoc] = useState('');

  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setpopup] = useState(false);
  const [timezonevalue, setTimeZoneValue] = useState('UTC-05:00 Los Angeles');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [date, setDate] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [addNote, setAddNote] = useState('');

  const [showda, setshowda] = useState(false);
  const [showdatime, setshowdatime] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    // console.log(
    //   'TourID ..from bookDetails screen....',
    //   props?.route?.params?.tourId,
    // );
  }, []);
  // console.log('.........',Object.keys(markedDates)[0]);
  console.log("ProfileDetail",ProfileDetail?.userid);
  const PostBookingTaxi = async () => {
    setpopup(true);
    console.log('.........',orderTime);
    if (Object.keys(markedDates).length == 0) {
      setalert_sms('Please Select Booking Taxi Date*');
      setMy_Alert(true);
    } else if (orderTime == '' || orderTime.trim().length == 0) {
      setalert_sms('Please Select Time');
      setMy_Alert(true);
    } else if (fullName == '' || fullName.trim().length == 0) {
      setalert_sms('Please Enter Full Name');
      setMy_Alert(true);
    }   else if (mobile == '' || mobile.trim().length == 0) {
      setalert_sms('Please Enter Phone Number');
      setMy_Alert(true);
    }else if (mobile.trim().length < 10) {
      setalert_sms('Please Enter Valid Phone Number');
      setMy_Alert(true);
    } else if (hotelName == '' || hotelName.trim().length == 0) {
      setalert_sms('Please Enter Hotel Name');
      setMy_Alert(true);
    }  else if (pickuploc == '' || pickuploc.trim().length == 0) {
      setalert_sms('Please Enter Pickup Location');
      setMy_Alert(true);
    } else if (droploc == '' || droploc.trim().length == 0) {
      setalert_sms('Please Enter Drop off Location');
      setMy_Alert(true);
    } 
    else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('booking_date_time', Object.keys(markedDates)[0] +" "+ orderTime);
      formdata.append('mobile', mobile);
      formdata.append('fullname', fullName);
      formdata.append('pickup_location', pickuploc);
      formdata.append('pickup_lat_long', "28.9844618, 77.7064137");
      formdata.append('drop_location', droploc);
      formdata.append('drop_lat_long', '28.6691565, 77.45375779999999');
      formdata.append('hotel_name', hotelName);
      formdata.append('user_id',ProfileDetail?.userid != undefined ? ProfileDetail?.userid : '');

      console.log('FORMdata print', formdata);
      const {responseJson, err} = await requestPostApi(
        booking_taxi,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      console.log('the res signup==>>', responseJson);
      if (err == null) {
        if (responseJson.status == true) {
          setpopup(true);
        } else {
          console.log('Error', responseJson.message);
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else {
        setalert_sms(err);
        setMy_Alert(true);
      }
    }
  };

  // const formatPhoneNumber = input => {
  //   // Remove all non-numeric characters
  //   const cleanedInput = input.replace(/\D/g, '');
  //   // Format the number in (XXX) XXX-XXXX
  //   const formattedNumber = cleanedInput.replace(
  //     /(\d{3})(\d{3})(\d{4})/,
  //     '($1) $2-$3',
  //   );
  //   // console.log("formattedNumber",formattedNumber);
  //   setMobile(formattedNumber);
  // };
  const handleDayPress = day => {
    // Check if the date is already marked
    if (markedDates[day.dateString]) {
      // Date is already marked, unmark it
      const updatedMarkedDates = {...markedDates};
      delete updatedMarkedDates[day.dateString];
      setMarkedDates(updatedMarkedDates);
    } else {
      // Date is not marked, mark it
      setMarkedDates({
        [day.dateString]: {
          selected: true,
          selectedColor: '#3DA1E3',
          marked: true,
          dotColor: '#3DA1E3',
        },
      });
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.Primary_Blue, flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#EAEDF7'}}>
        <ScrollView>
          <CustomHeader
            title={'Book Taxi'}
            onBackPress={() => {
              props.navigation.goBack();
            }}
            onNotificationPress={() => {
              props.navigation.navigate('Notification');
            }}
          />
          <View
            style={{
              width: '90%',
              marginTop: 10,
              justifyContent: 'center',
              marginHorizontal: 20,
            }}>
            <Calendar
              // onDayPress={day => {
              //   console.log('selected day', day);
              //   var mydd=selected
              //   mydd.push(day.dateString)
              //   setSelected(mydd)
              // }}
              // markedDates={{
              //   [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
              // }}
              // markedDates={{
              //   '2023-12-14': {selected: true, selectedColor: 'blue'},
              //   '2023-12-15': {selected: true,selectedColor: 'blue'},
              //   '2023-12-16': {selected: true,  selectedColor: 'blue'}
              // }}
              minDate={new Date()}
              current={new Date()}
              onDayPress={handleDayPress}
              markedDates={markedDates}
              horizontal={true}
              // Enable paging on horizontal, default = false
              pagingEnabled={true}
              disabledOpacity={0.6}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#9C9D9F',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#9C9D9F',
              }}
            />
          </View>

          <View
            style={{
              marginTop: 17,
              width: '90%',
              height: 55,
              marginHorizontal: 20,
              backgroundColor: '#FFFFFF',
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: '#E0E0E0',
              borderWidth: 1,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 1,
              shadowOpacity: 0.1,

              elevation: 3,
            }}>
            <View style={{}}>
              {Platform.OS == 'ios' ? (
                <DatePicker
                  customStyles={{
                    dateInput: {borderColor: 'transparent'},
                    dateText: {color: '#CECECE'},
                    dateIcon: styles.dateIcon,
                    dateplaceholder: {
                      alignContent: 'flex-start',
                    },
                    placeholderText: {
                      fontSize: 15,
                      color: '#CECECE',

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
                      color: '#CECECE',
                      left: Platform.OS == 'ios' ? 15 : 10,
                    },
                  ]}
                  date={orderTime}
                  mode="time"
                  placeholder={'Select Time*'}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={date => {
                    console.log('Time isss==>>', date);
                    setOrderTime(date);
                  }}
                />
              ) : showdatime ? (
                <View style={{width: '100%',
                height: 55,
                justifyContent: 'center',

                borderColor: 'transparent',
                zIndex: -999,
                borderRadius: 5,}}>
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    placeholder={'Select Time*'}
                    placeholderTextColor={COLORS.Primary_Grey}
                    //   display="default"
                    display="spinner"
                    onChange={(event, stime) => {
                      setshowdatime(false);
                      // console.log("SelectTime.....", stime.toDateString());
                      setOrderTime(
                        moment(event.nativeEvent.timestamp).format('HH:mm:ss'),
                      );
                      console.log(
                        'START TIME',
                        moment(event.nativeEvent.timestamp).format('HH:mm:ss'),
                      );
                    }}
                  />
                   <Text
                    style={{fontSize: 14, color: '#000', left: 15}}
                    >Select Time*
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 55,
                    justifyContent: 'center',

                    borderColor: 'transparent',
                    zIndex: -999,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{fontSize: 14, color: '#000', left: 15}}
                    onPress={() => {
                      setshowdatime(true);
                    }}>
                    {orderTime !=''  ? orderTime.slice(0, 5) : 'Select Time*'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {
              console.log("showdatime////////",orderTime)
            }
            <TouchableOpacity
              onPress={() => {
                setshowdatime(true);
              }}
              style={{
                justifyContent: 'center',
                marginRight: 9,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/Icons/clock_gray.png')}
                style={{width: 24, height: 24, alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 13}}>
            <CustomTextInput
              onChangeText={txt => {
                setFullName(txt);
              }}
              placeholder={'Full Name*'}
            />
          </View>
          {/* {console.log('MOBILENO>', mobile)} */}
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
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
                // marginTop: 4,
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
              // marginTop: 10,
            
              // justifyContent:'center',
              // width: '90%',
              // backgroundColor: 'white',
              height:55,

              borderLeftColor: '#EAEDF7',
              borderLeftWidth: 1,
              // height: 42,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15,
              // marginTop: 4,
            }}>
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
            {/* <PhoneInput
                // ref={phoneInput}
                keyboardType='phone-pad' 
                 
                 
                defaultValue={mobile}
                defaultCode="US"
                layout="first"
                onChangeText={text => {
                  formatPhoneNumber(text)
                  // setValue(text);
                  // setMobile(text);
                }}
                onChangeFormattedText={text => {
                  // setFormattedValue(text);
                  formatPhoneNumber(text)
                }}
                placeholder={'Phone Number'}
                textInputStyle={{
                  color: '#1F191C',
                  height: 50,
                  alignSelf: 'center',
                }}
                textInputProps={{
                  height: 50,
                  alignSelf: 'center',
                  marginTop: 4,
                  placeholderTextColor: '#CECECE',
                  maxLength:10
                }}
                textContainerStyle={{
                  backgroundColor: 'transparent',
                  height: 55,
                  marginTop: -4,
                }}
                containerStyle={{
                  width: '100%',
                  height: 50,
                  borderRadius: 7,
                  alignSelf: 'center',
                }}
                withDarkTheme
                withShadow
                // autoFocus
              /> */}
          </View>
          </View>
          <View style={{marginTop: 13}}>
            <CustomTextInput
              onChangeText={txt => {
                setHotelName(txt);
              }}
              placeholder={'Hotel Name*'}
            />
          </View>
          <View style={{marginTop: 13}}>
            <CustomTextInput
              onChangeText={txt => {
                setPickUpLoc(txt);
              }}
              placeholder={'Pickup Location*'}
            />
          </View>
          <View style={{marginTop: 13}}>
            <CustomTextInput
              onChangeText={txt => {
                setDropLoc(txt);
              }}
              placeholder={'Drop off Location*'}
            />
          </View>

          {/* <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.dropdownButton}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#4F5168'}}>
                UTC-05:00 Los Angeles
                
              </Text>
              <Image source={images.down} />
            </TouchableOpacity> */}

          <CustomButtonRound
            stle={{width: '90%'}}
            txtStyle={{color: '#fff', fontSize: 14, fontWeight: '400'}}
            backgroundColor={COLORS.Primary_Blue}
            title={'Next'}
            onPress={() => {
             PostBookingTaxi();
           
            }}
          />
          <View style={{height: 20}} />
        </ScrollView>
      </View>
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
                marginTop: 20,
                fontSize: 20,
                fontWeight: '600',
                textAlign: 'center',
              }}>
            Taxi Booking Request Sent Successfully
            </Text>
            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 13,
                fontWeight: '400',
              }}>
              We Will Get Back To You…
            </Text>

            <CustomButton
              title={'Close'}
              borderColor={'#83CDFD'}
              onPress={() => {
                props.navigation.goBack();
                setpopup(false);
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

export default BookTaxi;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
  },
  imageContainer: {
    height: (Dimensions.get('screen').width * 25) / 100,
    width: (Dimensions.get('screen').width * 70) / 100,
  },
  photoTxt: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.Primary_Blue,
  },
  iconTxtContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerSelectInput: {
    height: 45,
    width: '100%',
    fontSize: 15,
    borderColor: null,
    //  backgroundColor: '#fff',
    borderRadius: 10,
    color: '#CECECE',
  },
  dateIcon: {
    width: 22,
    height: 23,
    // marginRight:20
  },
  dropdownButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 7,
    width: '90%',
    marginHorizontal: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    height: heightScale(130),
    borderRadius: widthScale(5),
    borderWidth: 0.5,
    borderColor: COLORS.primary_white,
    width: '90%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textInput: {
    textAlign: 'left',
    fontSize: FONTS_SIZE.h5,
    fontFamily: FONTS.regular,
    marginLeft: 5,
    color: '#1F191C',
  },
  thirdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  titleTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    fontWeight: '700',
  },
  forAllTxt: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 20,
    color: '#1F191C',
  },
  uploadTxt: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: 'black',
    fontWeight: '500',
  },
  uploadTxtImgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  txtTotal: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  whiteCircle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F191C',
  },
});
