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
import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import AntDesign from 'react-native-vector-icons';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {ScrollView} from 'react-native-gesture-handler';
import {Calendar, LocaleConfig, CalendarUtils} from 'react-native-calendars';
import {
  booking_tour,
  callback_request,
  requestPostApi,
  tour_details,
} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import moment from 'moment';

const ReviewBooking = props => {
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setpopup] = useState(false);
  const [tourdetails, setTourDetail] = useState(props?.route?.params?.TourData);
  const [selectedDate, setSelectedDate] = useState('');
  const [totaladultamount, setTotaladultamount] = useState(
    props?.route?.params?.TourData?.age_11_price,
  );
  const [totalSeniorAmount, setTotalSeniorAmount] = useState(
    props?.route?.params?.TourData?.age_60_price,
  );
  const [totalKidsAmount, setTotalKidsAmount] = useState(
    props?.route?.params?.TourData?.under_10_age_price,
  );
  const [counter, setcounter] = useState(props?.route?.params?.counter);
  const [counter1, setcounter1] = useState(props?.route?.params?.counter1);
  const [counter2, setcounter2] = useState(props?.route?.params?.counter2);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const data = [
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
  ];

  useEffect(() => {
    console.log('selectREVIEW DATA ...22...',props?.route?.params?.selectedDate[0]);
    setSelectedDate(props?.route?.params?.selectedDate[0]);

    // setTotaladultamount(props?.route?.params?.TourData?.age_11_price)
    // PostRqstFreeCallback(props?.route?.params?.TourData?.id);
  }, []);
  const TotalBillAmount = () => {
    let a = totaladultamount;
    let aa = counter;
    let b = totalSeniorAmount;
    let bb = counter1;
    let c = totalKidsAmount;
    let cc = counter2;
    const amt = a * aa + b * bb + c * cc;
    // console.log('llllllll.....', amt);
    return amt;
  };

  const BookTourApi = async id => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('tour_id', id);
    formdata.append('tour_type', '1'); /*1-Normal Tour, 2:Virtual tour */
    formdata.append('booking_date', selectedDate);
    formdata.append('no_adults', counter);
    formdata.append('no_senior_citizen', counter1);
    formdata.append('no_childerns', counter2);
    formdata.append('adults_amount', totaladultamount);
    formdata.append('senior_amount', totalSeniorAmount);
    formdata.append('childrens_amount', totalKidsAmount);
    console.log('FORMADATA>>>>', formdata);
    const {responseJson, err} = await requestPostApi(
      booking_tour,
      formdata,
      'POST',
      user.token,
    );
    setLoading(false);
    console.log('the res=BookTourApi=>>', responseJson);
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
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.Primary_Blue}}>
      <View style={{backgroundColor: '#EAEDF7'}}>
        <ScrollView>
          <CustomHeader
            title={'Review Booking'}
            onBackPress={() => {
              props.navigation.goBack();
            }}
          />

          <Text
            style={[
              styles.uploadTxt,
              {fontWeight: '600', marginLeft: '5%', marginTop: 10},
            ]}>
            You’re Booking for!
          </Text>

          <View
            style={{
              flexDirection: 'row',

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
             <View>
              <Image
                style={{width: 80, height: 80, resizeMode: 'stretch',borderRadius:5}}
                source={{uri:`${tourdetails?.images[0]}`}}
                />
            </View>

            <View style={{marginLeft: 10}}>
            <View style={{width:'95%'}}>
              <Text numberOfLines={2} style={[styles.uploadTxt, {fontWeight: '700'}]}>
              {tourdetails?.title}
              </Text>
              </View>
              <View style={{width:'95%'}}>
              <Text numberOfLines={2} style={[styles.forAllTxt, {color: '#8F93A0'}]}>
              {tourdetails?.name}
              </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 12, height: 12, resizeMode: 'stretch'}}
                  source={require('../../assets/images/Icons/calendar.png')}></Image>
                <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                  {' '}
                  Duration {tourdetails?.duration} Hours
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 12, height: 12, resizeMode: 'stretch'}}
                  source={require('../../assets/images/Icons/clock.png')}></Image>
                <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                  {' '}
                  {moment(selectedDate).format('LL')}
                </Text>
              </View>
            </View>
            <View style={{position: 'absolute', right: 10}}>
              <Image
                style={{width: 25, height: 25, resizeMode: 'stretch'}}
                source={require('../../assets/images/Icons/green-tick-circle.png')}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
              }}>
              <View style={{}}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'stretch',
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                  source={require('../../assets/images/Icons/yng.png')}></Image>
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
                  Adults
                </Text>
                <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                  Ages 11+
                </Text>
              </View>
            </View>
            <View style={{width: '30%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 12, height: 12, resizeMode: 'stretch'}}
                  source={require('../../assets/images/Icons/green_3-people.png')}></Image>
                <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                  {' '}
                  {counter}
                </Text>
              </View>
            </View>

            <View style={{width: '30%'}}>
              <Text
                style={[
                  styles.forAllTxt,
                  {color: COLORS.Primary_Blue, fontWeight: '700', fontSize: 13},
                ]}>
                ${totaladultamount * counter}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
              }}>
              <View style={{}}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'stretch',
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                  source={require('../../assets/images/Icons/adlt.png')}></Image>
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
                  Senior
                </Text>
                <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                  Ages 60+
                </Text>
              </View>
            </View>
            <View style={{width: '30%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 12, height: 12, resizeMode: 'stretch'}}
                  source={require('../../assets/images/Icons/green_3-people.png')}></Image>
                <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                  {' '}
                  {counter1}
                </Text>
              </View>
            </View>
            <View style={{width: '30%'}}>
              <Text
                style={[
                  styles.forAllTxt,
                  {color: COLORS.Primary_Blue, fontWeight: '700', fontSize: 13},
                ]}>
                ${totalSeniorAmount * counter1}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
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
              marginBottom:5
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
              }}>
              <View style={{}}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'stretch',
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                  source={require('../../assets/images/Icons/chld.png')}></Image>
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
                  Kids
                </Text>
                <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                  Ages 10 & under
                </Text>
              </View>
            </View>
            <View style={{width: '30%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 12, height: 12, resizeMode: 'stretch'}}
                  source={require('../../assets/images/Icons/green_3-people.png')}></Image>
                <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                  {' '}
                  {counter2}
                </Text>
              </View>
            </View>
            <View style={{width: '30%'}}>
              <Text
                style={[
                  styles.forAllTxt,
                  {color: COLORS.Primary_Blue, fontWeight: '700', fontSize: 13},
                ]}>
                ${totalKidsAmount * counter2}
              </Text>
            </View>
          </View>

          <CustomButtonRound
          stle={{width:'90%'}}
            txtStyle={{color: '#fff', fontSize: 14, fontWeight: '400'}}
            backgroundColor={COLORS.Primary_Blue}
            title={'Pay $' + `${TotalBillAmount()}`}
            onPress={() => {
              // setpopup(true)
              BookTourApi(props?.route?.params?.TourData?.id);
            }}
          />
          <CustomButtonRound
           stle={{width:'90%'}}
            txtStyle={{color: '#000', fontSize: 14, fontWeight: '400'}}
            backgroundColor={'#FFF'}
            title={'Cancellation Policy'}
            onPress={() => {
              setModalVisible(true);
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
<View style={{width:'80%',justifyContent:'center',alignItems:'center',marginHorizontal:40}}>
<Text numberOfLines={3}
              style={{
                color: '#000',
                 
                marginTop: 20,
                fontSize: 20,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              Appointment For {tourdetails?.title} Is Booked 
            </Text>
</View>
           
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
            <Text
              style={{
                color: '#000',
                textAlign:'center',
                marginTop: 10,
                fontSize: 13,
                fontWeight: '400',
              }}>
             Allow me and my team, to take you on a private tour of your  life, while visiting beautiful O’ahu.
            </Text>

            <CustomButton
              title={'Close'}
              borderColor={'#83CDFD'}
              onPress={() => {
                props.navigation.navigate('BookDetails');
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
              height: (dimensions.SCREEN_HEIGHT * 42) / 100,
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
                  fontSize: 20,
                  textAlign: 'center',
                  marginTop: 24,
                },
              ]}>
              Cancellation Policy
            </Text>
            <View style={{marginHorizontal: 20}}>
              <Text
                style={[
                  styles.uploadTxt,
                  {
                    fontWeight: '400',
                    marginTop: 20,
                    color: '#1F191C',
                    fontSize: 13,
                    textAlign: 'center',
                  },
                ]}>
                Customers will receive a full refund or credit with 24 hours
                notice of cancellation. Customers will also receive a full
                refund or credit in case of operator cancellation due to weather
                or other unforeseen circumstances. Contact us by phone to cancel
                or inquire about a cancellation. No- shows will be charged the
                full price.
              </Text>
            </View>

            <CustomButton
            borderColor={'#83CDFD'}
              txtStyle={{color: '#fff', fontSize: 16, fontWeight: '400'}}
              backgroundColor={COLORS.Primary_Blue}
              title={'Close'}
              onPress={() => {
                setModalVisible(false);
              }}
            />
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

export default ReviewBooking;

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
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    color: '#1F191C',
  },
  uploadTxt: {
    fontSize: 16,
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
