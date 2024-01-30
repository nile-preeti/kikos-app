import {
  StyleSheet,
  Text,
  View,
  FlatList,
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
import {ScrollView} from 'react-native-gesture-handler';
import {Calendar, LocaleConfig, CalendarUtils} from 'react-native-calendars';
import CustomTextInput from '../../components/CustomTextinput/CustomTextInput';
import PhoneInput from 'react-native-phone-number-input';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  callback_request,
  requestGetApi,
  requestPostApi,
  timezone_list,
  tour_details,
} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';
import MaskInput from 'react-native-mask-input';

const RequestAFreeCallback = props => {
  const user = useSelector(state => state.user.user_details);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setpopup] = useState(false);
  // const [timezonevalue, setTimeZoneValue] = useState('UTC-05:00 Los Angeles');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [date, setDate] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [addNote, setAddNote] = useState('');
  const [timeListData, setTimeListData] = useState([]);
  const [openTimeZone, setopenTimeZone] = useState(false);

  const [valueTimeZone, setValueTimeZone] = useState('');

  const [showda, setshowda] = useState(false);
  const [showdatime, setshowdatime] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    getTimeZoneList();
    // console.log(
    //   'TourID ..from bookDetails screen....',
    //   props?.route?.params?.tourId,
    // );
  }, []);

  const PostRqstFreeCallback = async id => {
    if (fullName == '' || fullName.trim().length == 0) {
      setalert_sms('Please Enter Full Name');
      setMy_Alert(true);
    } else if (mobile == '' || mobile.trim().length == 0) {
      setalert_sms('Please Enter Phone Number');
      setMy_Alert(true);
    }else if (mobile.trim().length < 10) {
      setalert_sms('Please Enter Valid Phone Number');
      setMy_Alert(true);
    }
     else if (valueTimeZone == '' || valueTimeZone.trim().length == 0) {
      setalert_sms('Please Select Time Zone');
      setMy_Alert(true);
    } else if (date == '' || date.trim().length == 0) {
      setalert_sms('Please Select Date');
      setMy_Alert(true);
    } else if (orderTime == '' || orderTime.trim().length == 0) {
      setalert_sms('Please Select Time');
      setMy_Alert(true);
    } else if (addNote == '' || addNote.trim().length == 0) {
      setalert_sms('Please Add a Note');
      setMy_Alert(true);
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('tour_id', id);
      formdata.append('name', fullName);
      formdata.append('mobile', mobile);
      formdata.append('timezone', valueTimeZone);
      formdata.append(
        'preferred_time',
        moment(date).format('YYYY-MM-DD') + ' ' + orderTime,
      );
      formdata.append('note', addNote);
      const {responseJson, err} = await requestPostApi(
        callback_request,
        formdata,
        'POST',
        '',
      );
      setLoading(false);
      console.log('the res=PostTourDetails=>>', responseJson);
      if (err == null) {
        if (responseJson.status == true) {
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
  const getTimeZoneList = async () => {
    setLoading(true);
    const {responseJson, err} = await requestGetApi(
      timezone_list,
      '',
      'GET',
      '',
    );
    setLoading(false);
    // console.log('the getTimeZoneList==>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        // setTimeListData(responseJson.data);
        var Arr = [];

        for (let i = 1; i <= responseJson.data.length; i++) {
          Arr.push({label: responseJson.data[i - 1].name,value: responseJson.data[i - 1].name});
        }
        console.log('the time values==>>', Arr);
        setTimeListData(Arr);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else if (err == null) {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  const formatPhoneNumber = input => {
    // Remove all non-numeric characters
    const cleanedInput = input.replace(/\D/g, '');
    // Format the number in (XXX) XXX-XXXX
    const formattedNumber = cleanedInput.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3',
    );
    // console.log("formattedNumber",formattedNumber);
    setMobile(formattedNumber);
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.Primary_Blue, flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#EAEDF7'}}>
        <ScrollView>
          <CustomHeader
            title={'Request A Free Callback'}
            onBackPress={() => {
              props.navigation.goBack();
            }}
            onNotificationPress={() => {
              props.navigation.navigate('Notification');
            }}
          />

          <View style={{marginTop: 20}}>
            <CustomTextInput
              onChangeText={txt => {
                setFullName(txt);
              }}
              placeholder={'Full Name'}
            />
          </View>
          {/* {console.log('MOBILENO>', mobile)} */}
          <View
            style={{
              marginTop: 10,
              alignSelf: 'center',
              width: '90%',
              backgroundColor: 'white',
            }}>
            <MaskInput
              value={mobile}
              keyboardType="phone-pad"
              placeholder="Phone Number"
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

          {/* <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.dropdownButton}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#4F5168'}}>
               Select Time Zone
            </Text>
            <Image source={images.down} />
          </TouchableOpacity> */}
          {/* {
            console.log("timeListData",valueTimeZone)
          } */}
          <View
            style={{
              // width: '48%',
              
              zIndex: 999,
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // paddingHorizontal: 10,
              height: 50,
              borderRadius: 7,
              width: '90%',
              marginHorizontal: 20,
              backgroundColor: '#fff',
            }}>
            <DropDownPicker
            
            items={timeListData}
              // items={[
              //   {label: 'Most Popular', value: 'Most Popular'},
              //   {label: 'New!', value: 'new'},
              //   {label: "Circle island o'ahu", value: "Circle island o'ahu"},
              // ]}
              listParentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                // paddingLeft: 12,
              }}
              listParentLabelStyle={{
                fontWeight: '400',
                fontSize: 14,
              }}
              theme="LIGHT"
              // backgroundColor="white"
              placeholder="Select Time Zone"
              placeholderTextColor={'#B2B7B9'}
              containerStyle={{height: 50, paddingLeft: 2}}
              dropDownDirection="BOTTOM"
              listMode="MODAL"
              modalAnimationType="fade"
              bottomOffset={100}
              itemStyle={{justifyContent: 'flex-start'}}
              textStyle={{
                fontSize: 14,
              }}
              open={openTimeZone}
              setOpen={setopenTimeZone}
              value={valueTimeZone}
              setValue={setValueTimeZone}
              scrollViewProps={{
                decelerationRate: 'medium',
                ScrollView: '#ffcc00',
              }}
              onChangeValue={values => {
                // console.log("DropDownPicker",values);
                setValueTimeZone(values);
              }}
              onChangeText={item => setValueTimeZone(item)}
              defaultValue={null}
              searchable={true}
              searchTextInputProps={{
                maxLength: 25
              }}
              searchPlaceholder="Search..."
              // searchWithRegionalAccents={true}
              dropDownContainerStyle={{
                width:'100%',
                justifyContent:'center',
                // backgroundColor: 'white',
                borderColor: 'transparent',
                // borderBottomLeftRadius:15,
                // borderWidth: 0.1,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 5,
                shadowOpacity: 1.0,
                elevation: 5,
                zIndex: 999,
                // borderBottomColor:'#000000',
                // borderBottomWidth:0.5,
                // borderColor: "#8F93A0",
                borderRadius: 15,
                marginTop: 6,
              }}
              style={{
                borderColor: 'white',
                backgroundColor: 'white',
                borderRadius: 5,

                zIndex: 1,
                paddingLeft: 15,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                marginTop: 17,
                width: '44%',
                height: 50,
                marginLeft: 0,
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
                    date={date}
                    mode="date"
                    placeholder={'Select Date'}
                    minimumDate={new Date()}
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={date => {
                      // console.log('datae isss==>>', date);
                      setDate(date);
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
                      minimumDate={new Date()}
                      onChange={(event, sTime) => {
                        setshowda(false);
                        console.log(
                          'SelectDate.....',
                          moment(sTime).format('YYYY-MM-DD'),
                        );
                        setDate(moment(sTime).format('YYYY-MM-DD'));
                        console.log(event);
                      }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 50,
                      justifyContent: 'center',
                      //   backgroundColor: "#1F191C",
                      borderColor: 'transparent',
                      zIndex: -999,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{fontSize: 15, color: '#000', left: 15}}
                      onPress={() => {
                        setshowda(true);
                      }}>
                      {date ? moment(date).format('YYYY-MM-DD') : 'Select Date'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  setshowda(true);
                }}
                style={{
                  justifyContent: 'center',
                  marginRight: 9,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/images/Icons/calendar_gray.png')}
                  style={{width: 24, height: 24, alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: 17,
                width: '44%',
                height: 50,
                marginLeft: 10,
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
                    placeholder={'Select Time'}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={date => {
                      // console.log('Time isss==>>', date);
                      setOrderTime(date);
                    }}
                  />
                ) : showdatime ? (
                  <View>
                    <DateTimePicker
                      value={new Date()}
                      mode="time"
                      is24Hour={true}
                      //   display="default"
                      display="spinner"
                      onChange={(event, stime) => {
                        setshowdatime(false);
                        // console.log("SelectTime.....", stime.toDateString());
                        setOrderTime(
                          moment(event.nativeEvent.timestamp).format('HH:mm'),
                        );
                        console.log(
                          'START TIME',
                          moment(event.nativeEvent.timestamp).format('HH:mm'),
                        );
                      }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 50,
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
                      {orderTime ? orderTime.slice(0, 5) : 'Select Time'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
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
          </View>
          <Text
            style={[
              styles.uploadTxt,
              {fontWeight: '600', marginLeft: '5%', marginTop: 10},
            ]}>
            What tour are you interested in ? Do you have a special request?
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              textAlignVertical="top"
              onChangeText={txt => setAddNote(txt)}
              placeholderTextColor="gray"
              placeholder="Add Note"
              style={styles.textInput}
            />
          </View>

          <CustomButton
            txtStyle={{color: '#fff', fontSize: 16, fontWeight: '400'}}
            backgroundColor={COLORS.Primary_Blue}
            borderColor={'#83CDFD'}
            title={'Send'}
            onPress={() => {
              PostRqstFreeCallback(props?.route?.params?.tourId);
            }}
          />
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
              Request For Free Callback Is Sent Successfully
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
              borderColor={'#83CDFD'}
              title={'Close'}
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

export default RequestAFreeCallback;

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
    width: '100%',
    // backgroundColor:'red'
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
