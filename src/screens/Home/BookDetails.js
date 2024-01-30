import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Modal,
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
import {FONTS, FONTS_SIZE} from '../../global/Utils';
import Feather from 'react-native-vector-icons';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {ScrollView} from 'react-native-gesture-handler';
import {Calendar, LocaleConfig, CalendarUtils} from 'react-native-calendars';
import {ImageSlider, ImageCarousel} from 'react-native-image-slider-banner';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {
  calendarEvents,
  requestGetApi,
  requestPostApi,
  tour_details,
} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';
import {onLogoutUser} from '../../redux/actions/user_action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const BookDetails = props => {
  const user = useSelector(state => state.user.user_details);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [popup, setpopup] = useState(false);
  const [tourdetails, setTourDetail] = useState('');
  const [allImg, setAllImg] = useState([{img: ''}]);
  const [selectedDate, setSelectedDate] = useState('');
  const [unavailableDays, setUnavailableDays] = useState({});
  const [availableDays, setavailableDays] = useState({});
  
  const [markedDates, setMarkedDates] = useState({
    ...unavailableDays,
    ...availableDays,
  });

  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const data = [
    {
      id: 1,
      img: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 2,
      img: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 3,
      img: require('../../assets/images/largeimages/dummydetail.png'),
    },
  ];

  useEffect(() => {
    // console.log('TourID ......', props?.route?.params?.tourId);
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetCalenderEvents();
      PostTourDetails(props?.route?.params?.tourId);
      setMarkedDates({});
      setSelectedDate('');
    });
    return unsubscribe;
  }, []);

  const PostTourDetails = async id => {
    // if (props?.route?.params?.tourId == undefined || id == "") {
    //   setalert_sms('Please go back and try again later !');
    //   setMy_Alert(true);
    // }
    //  else {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('tour_id', id);
    const {responseJson, err} = await requestPostApi(
      tour_details,
      formdata,
      'POST',
      '',
    );
    setLoading(false);
    // console.log('the res=PostTourDetails=>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        setTourDetail(responseJson.data);
        var allimgs = [];

        for (let i = 1; i <= responseJson.data.images.length; i++) {
          allimgs.push({img: responseJson.data.images[i - 1]});
        }
        // console.log('the allimgs==>>', allimgs);
        setAllImg(allimgs);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
    // }
  };

  const GetCalenderEvents = async () => {
    setLoading(true);

    const {responseJson, err} = await requestGetApi(
      calendarEvents,
      '',
      'GET',
      '',
    );
    setLoading(false);
    console.log('the res=PostTourDetails=>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        // setEventsDateNotAvailable(responseJson.booked_events);
        // var BookDateArr = [];

        //   for (let i = 1; i <= responseJson.booked_events.length; i++) {
        //     BookDateArr.push({date:responseJson.booked_events[i - 1].date});
        //   }
        const notAvailableDatesObj = {};
        responseJson.booked_events.forEach((date) => {
          notAvailableDatesObj[date.date] = { disabled: true, disableTouchEvent: true, selectedColor: '#4CBA08',dotColor: '#4CBA08',marked: false,selected: true, };
        });
          // console.log('the notAvailableDatesObj==>>', notAvailableDatesObj);
          setUnavailableDays(notAvailableDatesObj);

          const bookedDatesObj = {};
          responseJson.not_available.forEach((date) => {
            // console.log('the date==>>', date.date);
          bookedDatesObj[date.date] = {disabled: true, disableTouchEvent: true, selectedColor: '#9C9D9F',dotColor: '#9C9D9F',marked: false,selected: true,  };
        });
        // console.log('the bookedDatesObj==>>', bookedDatesObj);
        setavailableDays(bookedDatesObj);
          
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  
  // const handleDayPress = day => {
  //   console.log("Calender Select date:::",day);
  //   // Check if the date is already marked
  //   if (markedDates[day.dateString]) {
  //     // Date is already marked, unmark it
  //     const updatedMarkedDates = {...markedDates};
  //     delete updatedMarkedDates[day.dateString];
  //    setMarkedDates(updatedMarkedDates);

  //          console.log("day.dateString.day////////",updatedMarkedDates);
  //   } else {
  //     console.log("day.dateString.day.dateString",day.dateString);
  //     setSelectedDate(day.dateString);
  //     // Date is not marked, mark it
  //     setMarkedDates({
  //       // ...markedDates,
  //       [day.dateString]: {
  //         selected: true,
  //         selectedColor: '#3DA1E3',
  //         marked: true,
  //         dotColor: '#3DA1E3',
  //       },
  //       // [eventsDateNotAvailable]: {selected: true, disableTouchEvent: true,
  //       //   selectedColor: '#9C9D9F',
  //       //   marked: false,
  //       //   dotColor: '#9C9D9F', },
  //       //   [eventsBookDate]: {selected: true, disableTouchEvent: true,
  //       //     selectedColor: '#4CBA08',
  //       //     marked: false,
  //       //     dotColor: '#4CBA08', },
  //     });
  //     // setMarkedDates({
  //     //   ...markedDates,
  //     //   [day.dateString]: {
  //     //     selected: true,
  //     //     selectedColor: '#3DA1E3',
  //     //     marked: true,
  //     //     dotColor: '#3DA1E3',
  //     //   },
  //     // });
  //   }
  // };
  const handleDayPress = day => {
    // Check if the selected date is booked
    if (!availableDays[day.dateString]) {
      setSelectedDate(day.dateString);
      } else {
       const updatedMarkedDates = {...markedDates};
           delete updatedMarkedDates[day.dateString];
          setMarkedDates(updatedMarkedDates);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.Primary_Blue, flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <ScrollView>
          <CustomHeader
            title={tourdetails?.title}
            onBackPress={() => {
              props.navigation.goBack();
            }}
            onNotificationPress={() => {
              props.navigation.navigate('Notification');
            }}
          />
          <View
            style={{
              height: (dimensions.SCREEN_HEIGHT * 35) / 100,
              width: '100%',
              marginTop: 15,
            }}>
            <View
              style={{
                overflow: 'hidden',
                width: '95%',
                alignSelf: 'center',
                zIndex: -999,
                borderRadius: 20,
              }}>
              {allImg?.length > 0 ? (
                <ImageSlider
                  data={allImg}
                  activeIndicatorStyle={{backgroundColor: '#3DA1E3'}}
                  indicatorContainerStyle={{top: -5}}
                  caroselImageStyle={{
                    resizeMode: 'stretch',
                    height: 400,
                    borderRadius: 20,
                  }}
                  closeIconColor="#fff"
                  headerStyle={{
                    padding: 0,
                    backgroundColor: 'rgba(0,0,0, 0.6)',
                  }}
                  autoPlay={true}
                  // showHeader
                  preview={true}
                />
              ) : (
                <>
                  <Image
                    style={{height: 400, width: '100%'}}
                    source={{
                      uri: `${'https://kinengo-dev.s3.us-west-1.amazonaws.com/images/camera-icon.jpg'}`,
                    }}
                  />
                </>
              )}
            </View>
          </View>
          <View
            style={{paddingHorizontal: 20, marginTop: 10, marginBottom: 15}}>
            <Text style={styles.titleTxt}>{tourdetails?.title}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 12, height: 12, resizeMode: 'stretch'}}
                source={require('../../assets/images/Icons/clock.png')}
              />
              <Text style={styles.forAllTxt}> Duration:</Text>
              <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                {' '}
                {tourdetails?.duration} Hours
              </Text>
            </View>
            <Text style={[styles.forAllTxt, {marginTop: 2}]}>
              {tourdetails?.name}
            </Text>
            {
              tourdetails?.same_for_all != "" ?
              <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={[styles.forAllTxt, {color: COLORS.Primary_Blue}]}>
                ${tourdetails?.same_for_all}
              </Text>
              <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                {' '}
                Same for all
              </Text>
            </View>
            :
(
  <>
  <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={[styles.forAllTxt, {color: COLORS.Primary_Blue}]}>
                ${tourdetails?.age_11_price}
              </Text>
              <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                {' '}
                People Ages 11+
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.forAllTxt, {color: COLORS.Primary_Blue}]}>
                ${tourdetails?.age_60_price}
              </Text>
              <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                {' '}
                Senior Ages 60+
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.forAllTxt, {color: COLORS.Primary_Blue}]}>
                ${tourdetails?.under_10_age_price}
              </Text>
              <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                {' '}
                Children Ages 10 & Under
              </Text>
            </View>
  </>
)
            }
            
            <Text
              style={[
                styles.uploadTxt,
                {fontWeight: '500', marginTop: 10, fontSize: 14},
              ]}>
              {tourdetails?.short_description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{width: 25, height: 25, resizeMode: 'stretch'}}
                source={require('../../assets/images/Icons/profile-circle-blue.png')}
              />
              <Text style={[styles.uploadTxt, {fontWeight: '700'}]}>
                {' '}
                Full description
              </Text>
            </View>
            <View
              style={{width: '100%', height: 0.5, backgroundColor: '#CECECE'}}
            />
            <View style={{width: '100%', marginTop: 5}}>
              <Text style={[styles.uploadTxt, {fontWeight: '300'}]}>
                {tourdetails?.description}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{width: 25, height: 25, resizeMode: 'stretch'}}
                source={require('../../assets/images/Icons/task-square-blue.png')}
              />
              <Text style={[styles.uploadTxt, {fontWeight: '700'}]}>
                {' '}
                What to bring
              </Text>
            </View>
            <View
              style={{width: '100%', height: 0.5, backgroundColor: '#CECECE'}}
            />
            <View style={{width: '100%', marginTop: 5}}>
              <Text style={[styles.uploadTxt, {fontWeight: '300'}]}>
                {tourdetails?.what_to_bring}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{width: 25, height: 25, resizeMode: 'stretch'}}
                source={require('../../assets/images/Icons/noteremove.png')}
              />
              <Text style={[styles.uploadTxt, {fontWeight: '700'}]}>
                {' '}
                Cancellation Policy
              </Text>
            </View>
            <View
              style={{width: '100%', height: 0.5, backgroundColor: '#CECECE'}}
            />
            <View style={{width: '100%', marginTop: 5}}>
              <Text style={[styles.uploadTxt, {fontWeight: '300'}]}>
                {tourdetails?.cancellation_policy}
              </Text>
            </View>
          </View>
         
          <TouchableOpacity
            style={{
              height: 60,
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 50,
              backgroundColor: '#FFF',
              borderColor: '#CECECE',
              borderWidth: 0.6,
              // marginTop: 15,
              flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: {width: 3, height: 0},
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 3,
              // margin:2
            }}
            onPress={() => {
              props.navigation.navigate('RequestAFreeCallback', {
                tourId: props?.route?.params?.tourId,
              });
            }}>
            <Text
              style={[
                styles.title,
                {color: '#000', fontSize: 14, fontWeight: '400'},
              ]}>
              Request A Free Callback
            </Text>
          </TouchableOpacity>
          <CustomButtonRound
            stle={{width: '90%'}}
            txtStyle={{color: '#fff', fontSize: 14, fontWeight: '400'}}
            backgroundColor={COLORS.Primary_Blue}
            title={'Book Tour'}
            onPress={() => {
              if (user.userid == undefined) {
                setpopup(true);
              } else {
                setModalVisible(true);
              }
            }}
          />
          <View style={{height: 20}} />
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
              <TouchableOpacity>
                <Image
                  source={images.loginneddimg}
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
                numberOfLines={2}
                style={{
                  color: '#000',
                  alignSelf: 'center',
                  marginTop: 20,
                  fontSize: 20,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                To book a tour for {tourdetails?.title}.
              </Text>
              <Text
                style={{
                  color: '#000',
                  alignSelf: 'center',
                  marginTop: 10,
                  fontSize: 13,
                  fontWeight: '400',
                }}>
                You Need An Account
              </Text>

              <CustomButton
                title={'Login / Signup'}
                borderColor={'#83CDFD'}
                onPress={() => {
                  AsyncStorage.clear();
                  dispatch(onLogoutUser());
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
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              margin: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                height: (dimensions.SCREEN_HEIGHT * 62) / 100,
                width: dimensions.SCREEN_WIDTH,
                backgroundColor: '#FBFBFB',
                position: 'absolute',
                bottom: 0,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                borderTopColor: COLORS.Primary_Blue,
                borderTopWidth: 2,
              }}>
              <Text
                style={[
                  styles.uploadTxt,
                  {
                    fontWeight: '600',
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 20,
                  },
                ]}>
                Book A Tour
              </Text>

              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '94%',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                    width: '49%',
                    backgroundColor: '#fff',
                    borderRadius: 30,
                    shadowColor: '#000',
                    shadowOffset: {width: 1, height: 1},
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    elevation: 3,
                    padding: 7,
                  }}>
                  <Image
                    style={{width: 18, height: 18, resizeMode: 'stretch'}}
                    source={require('../../assets/images/Icons/flash.png')}
                  />
                  <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
                    {' '}
                    Real-Time Availability
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                    width: '49%',
                    backgroundColor: '#fff',
                    borderRadius: 30,
                    shadowColor: '#000',
                    shadowOffset: {width: 1, height: 1},
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    elevation: 3,
                    padding: 7,
                  }}>
                  <Image
                    style={{width: 18, height: 18, resizeMode: 'stretch'}}
                    source={require('../../assets/images/Icons/clockg.png')}
                  />
                  <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
                    {' '}
                    Instant Confirmation
                  </Text>
                </TouchableOpacity>
              </View> */}
              {console.log(
              
                ';;;;;eventsBookDate.....',
                selectedDate
              )}
              <View style={{width: '100%', marginTop: 10}}>
                <Calendar
                  minDate={moment().format('YYYY-MM-DD')}
                  // current={new Date()}
                  markedDates={{
                    ...availableDays,
                    ...unavailableDays,
                    [selectedDate]: {
                      selected: true,
                      selectedColor: '#3DA1E3',
                      marked: true,
                      dotColor: '#3DA1E3',
                    },
                  }}
                  onDayPress={handleDayPress}
                  horizontal={true}
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
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <CustomButton
                  txtStyle={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '400',
                    shadowColor: '#000',
                    shadowOffset: {width: 1, height: 1},
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                    elevation: 3,
                  }}
                  borderColor={'#F4F4F4'}
                  backgroundColor={'#fff'}
                  title={'Close'}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
                <View style={{width: 10}}></View>

                <CustomButton
                  txtStyle={{color: '#fff', fontSize: 16, fontWeight: '400'}}
                  borderColor={'#83CDFD'}
                  backgroundColor={COLORS.Primary_Blue}
                  title={'Next'}
                  onPress={() => {
                    console.log(
                      'typ edDates',
                      selectedDate,
                    );
                    if (selectedDate != '') {
                       props.navigation.navigate('BookAnTour', {
                          dates: selectedDate,
                          TourData: tourdetails,
                        });
                        setModalVisible(false);
                      
                    } else {
                      setModalVisible(false);
                      setalert_sms('Please select booking date');
                      setMy_Alert(true);
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
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

export default BookDetails;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: FONTS_SIZE.h4,
    fontFamily: FONTS.regular,
    color: COLORS.light_white,
    fontWeight: '700',
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
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    color: '#1F191C',
  },
  uploadTxt: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#1F191C',
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
