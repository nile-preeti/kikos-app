import {
  StyleSheet,
  Text,
  View,
  FlatList,
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
import {FONTS} from '../../global/Utils';
import COLORS from '../../global/Colors';
import AntDesign from 'react-native-vector-icons';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {ScrollView} from 'react-native-gesture-handler';
import {Calendar, LocaleConfig, CalendarUtils} from 'react-native-calendars';
import {ImageSlider, ImageCarousel} from 'react-native-image-slider-banner';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {requestPostApi, tour_details} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';
import {onLogoutUser} from '../../redux/actions/user_action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmedTourDetails = props => {
  const user = useSelector(state => state.user.user_details);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [popup, setpopup] = useState(false);
  const [tourdetails, setTourDetail] = useState('');
  const [allImg, setAllImg] = useState([{img: ''}]);
  const [markedDates, setMarkedDates] = useState({});
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
    console.log('TourID ......', props?.route?.params?.tourId);
    PostTourDetails(props?.route?.params?.tourId);
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
    console.log('the res=PostTourDetails=>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        setTourDetail(responseJson.data);
        var allimgs = [];

        for (let i = 1; i <= responseJson.data.images.length; i++) {
          allimgs.push({img: responseJson.data.images[i - 1]});
        }
        console.log('the allimgs==>>', allimgs);
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

  // const onViewableItemsChanged = useCallback(({viewableItems}) => {
  //   if (viewableItems.length > 0) {
  //     setCurrentIndex(viewableItems[0].index);
  //   }
  // }, []);

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
        ...markedDates,
        [day.dateString]: {
          selected: true,
          selectedColor: 'blue',
          marked: true,
          dotColor: 'blue',
        },
      });
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EAEDF7'}}>
       <View style={{flex: 1, backgroundColor: '#EAEDF7'}}>
        <ScrollView>
          <CustomHeader
            title={'North Shore'}
            onBackPress={() => {
              props.navigation.goBack();
            }}
            onNotificationPress={() => {
              props.navigation.navigate('Notification');
            }}
          />

          {/* <View style={{marginTop:15}}>
          <FlatList
            data={data}
            horizontal={true}
            pagingEnabled
            // onViewableItemsChanged={onViewableItemsChanged}
            showsHorizontalScrollIndicator={false}
            // viewabilityConfig={{
            //   itemVisiblePercentThreshold: 50,
            // }}
            renderItem={({item, index}) => {
              return (
                <View style={{width:dimensions.SCREEN_WIDTH*90/100,height:dimensions.SCREEN_HEIGHT*30/100,borderRadius:15}}>
                  <Image
                    style={{width:'100%',height:'100%',overflow:'hidden',borderRadius:15}}
                    resizeMode="stretch"
                    source={item.img}
                  />
                </View>
              );
            }}
          />
        </View> */}
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
                  //  localImg={true}
                  data={allImg}
                  // onClick={(item, index) => {alert('hello'+index)}}
                  // autoPlay={true}
                  // onItemChanged={(item) => console.log("item", item)}

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
                  showHeader
                  // preview={true}
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
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 15,
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
              padding: 7,
            }}>
            <View style={styles.bookingIdContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.bookingIdTxt}>Booking ID:</Text>
                <Text style={styles.bookingIdN}>8niudy834</Text>
                <Image
                  source={images.document}
                  style={{marginLeft: 7, marginTop: 3}}
                />
              </View>

              <View
                style={{
                  height: 26,
                  width: 96,
                  borderRadius: 50,
                  flexDirection: 'row',
                  borderColor: '#4CBA08',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#4CBA08',
                    borderRadius: 100,
                    height: 10,
                    width: 10,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 12,
                    color: '#4CBA08',
                  }}>
                  Accepted
                </Text>
              </View>
            </View>
            <View style={[styles.line, {marginTop: 18}]}></View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '97%',
              }}>
              <View
                style={{
                  backgroundColor: '#EAEDF7',
                  borderRadius: 35,
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                  height: 40,
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Text style={[styles.bookingIdTxt, {fontSize: 12}]}>
                  Amount Paid for tour{' '}
                  <Text
                    style={{color: '#3DA1E3', fontSize: 12, fontWeight: '400'}}>
                    $559.00
                  </Text>{' '}
                  via Paypal
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '97%',
                }}>
                <Text style={[styles.bookingIdTxt, {fontSize: 12}]}>
                  No of People:
                </Text>
                <Text style={[styles.bookingIdN, {fontSize: 10}]}>
                  {' '}
                  03 (02 People 11 & above 01, Children 10 & under)
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '97%',
                  marginLeft: 4,
                }}>
                <Text
                  style={[styles.bookingIdTxt, {fontSize: 12, lineHeight: 25}]}>
                  Selected Date:
                </Text>
                <Text style={[styles.bookingIdN, {fontSize: 10}]}>
                  {' '}
                  19 October, 2023 Saturday
                </Text>
              </View>
            </View>
          </View>

          <View style={{paddingHorizontal: 20, marginTop: 10}}>
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
            <Text style={styles.forAllTxt}>{tourdetails?.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            <Text style={[styles.uploadTxt, {fontWeight: '500'}]}>
              {tourdetails?.short_description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                style={{width: 18, height: 18, resizeMode: 'stretch'}}
                source={require('../../assets/images/Icons/huser.png')}
              />
              <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
                {' '}
                About me
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
                style={{width: 18, height: 18, resizeMode: 'stretch'}}
                source={require('../../assets/images/Icons/document-copy.png')}
              />
              <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
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
                style={{width: 18, height: 18, resizeMode: 'stretch'}}
                source={require('../../assets/images/Icons/noteremove.png')}
              />
              <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
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
          {/* <View style={styles.txtTotal}>
          <TouchableOpacity style={styles.whiteCircle}>
            <Image
              tintColor={'black'}
              style={{transform: [{rotate: '180deg'}]}}
              source={images.arrowsRight}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={styles.countTxt}>{`${currentIndex}/${data.length}`}</Text>
          </View>
          <TouchableOpacity style={styles.whiteCircle}>
            <Image tintColor={'black'} source={images.arrowsRight} />
          </TouchableOpacity>
        </View> */}
          <CustomButtonRound
            txtStyle={{color: '#000', fontSize: 14, fontWeight: '400'}}
            backgroundColor={'#FFF'}
            title={'Request A Free Callback'}
            onPress={() => {
              props.navigation.navigate('RequestAFreeCallback', {
                tourId: props?.route?.params?.tourId,
              });
            }}
          />
          <CustomButtonRound
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
                style={{
                  color: '#000',
                  alignSelf: 'center',
                  marginTop: 45,
                  fontSize: 20,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Your booking for "tourname"  is successfully submitted
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
                onPress={() => {
                  // props.navigation.goBack();
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
              height: (dimensions.SCREEN_HEIGHT * 70) / 100,
              width: dimensions.SCREEN_WIDTH,
              backgroundColor: '#FBFBFB',
              position: 'absolute',
              bottom: 0,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderTopColor: COLORS.Primary_Blue,
              borderTopWidth: 0,
            }}>
            <Text
              style={[
                styles.uploadTxt,
                {
                  fontWeight: '600',
                  fontSize: 16,
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              {' '}
              Book A Tour
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                  width: '47%',
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
                  width: '47%',
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
            </View>
            <View style={{width: '100%', marginTop: 10}}>
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
                onDayPress={handleDayPress}
                markedDates={markedDates}
                horizontal={true}
                // Enable paging on horizontal, default = false
                pagingEnabled={true}
              />
            </View>

            <CustomButton
              txtStyle={{color: '#fff', fontSize: 14, fontWeight: '400'}}
              backgroundColor={COLORS.Primary_Blue}
              title={'Next'}
              onPress={() => {
                props.navigation.navigate('BookAnTour', {dates: markedDates});
              }}
            />
            <CustomButton
              txtStyle={{
                color: '#000',
                fontSize: 14,
                fontWeight: '400',
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 2,
                elevation: 3,
              }}
              backgroundColor={'#fff'}
              title={'Close'}
              onPress={() => {
                setModalVisible(false);
              }}
            />
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

export default ConfirmedTourDetails;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
  },
  imageContainer: {
    height: (Dimensions.get('screen').width * 25) / 100,
    width: (Dimensions.get('screen').width * 70) / 100,
  },
  bookingIdContainer: {
    width: '95%',
    flexDirection: 'row',
    // marginLeft: 20,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#E7EAF1',
    marginTop: 10,
    width: '100%',
    // padding:20
  },
  bookingIdTxt: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.regular,
    color: '#505667',
  },
  bookingIdN: {
    color: '#CECECE',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.regular,
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
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 20,
    color: '#1F191C',
  },
  uploadTxt: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    color: 'black',
    fontWeight: '400',
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
