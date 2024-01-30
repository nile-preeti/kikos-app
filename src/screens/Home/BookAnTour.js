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
import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import AntDesign from 'react-native-vector-icons';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {ScrollView} from 'react-native-gesture-handler';
import {Calendar, LocaleConfig, CalendarUtils} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import {requestPostApi, tour_details} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import moment from 'moment';

const BookAnTour = (props) => {
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);

  const [openAdults, setopenAdults] = useState(false);
  const [valueAdults, setValueAdults] = useState('');
  const [openSenior, setopenSenior] = useState(false);
  const [valueSenior, setValueSenior] = useState('');
  const [openKids, setopenKids] = useState(false);
  const [valueKids, setValueKids] = useState('');
  const [ticketcount, setTicketCount] = useState(1);
  const [counter, setcounter] = useState(1);
  const [counter1, setcounter1] = useState(1);
  const [counter2, setcounter2] = useState(1);
const[selectedDate,setSelectedDate]=useState("");
const [tourdetails, setTourDetail] = useState(props?.route?.params?.TourData);



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
// console.log("selectDAte",selectedDate);
  useEffect(() => {
    console.log('selectDAtes ......',props?.route?.params.dates);
    setSelectedDate(props?.route?.params?.dates)
    // PostTourDetails(props?.route?.params?.tourId);
  }, []);

  // const PostRqstFreeCallback = async id => {
  //   if (counter > 0 ) {
  //     setalert_sms('Please add no. of adults');
  //     setMy_Alert(true);
  //   } 
  //   // else if (counter == 0 ) {
  //   //   setalert_sms('Please add no. of Senior');
  //   //   setMy_Alert(true);
  //   // } else if (counter > 0 ) {
  //   //   setalert_sms('Please add no. of adults');
  //   //   setMy_Alert(true);
  //   // } 
  //   else {
  //     setLoading(true);
  //     let formdata = new FormData();
  //     formdata.append('tour_id', id);
  //     formdata.append('tour_type', "1"); /*1-Normal Tour, 2:Virtual tour */
  //     formdata.append('booking_date', selectedDate);
  //     formdata.append('no_adults', timezonevalue);
  //     formdata.append('no_senior_citizen', timezonevalue);
  //     formdata.append('no_childerns', timezonevalue);
  //     formdata.append('adults_amount', timezonevalue);
  //     formdata.append('senior_amount', timezonevalue);
  //     formdata.append('childrens_amount', addNote);
  //     const {responseJson, err} = await requestPostApi(
  //       callback_request,
  //       formdata,
  //       'POST',
  //       "",
  //     );
  //     setLoading(false);
  //     console.log('the res=PostTourDetails=>>', responseJson);
  //     if (err == null) {
  //       if (responseJson.status == true) {
  //         setpopup(true);
  //       } else {
  //         setalert_sms(responseJson.message);
  //         setMy_Alert(true);
  //       }
  //     } else {
  //       setalert_sms(err);
  //       setMy_Alert(true);
  //     }
  //   }
  // };

 

  
  const putadult = async (add) => {
    if (add == "+") {
      if( counter < 6){
      setcounter(counter + 1);
      //   console.log("Increase", ticketcount);
      }
    } else {
      if (counter > 0) {
        setcounter(counter - 1);
        // console.log("decrease", ticketcount);
      } else {
        console.log("NOT IN Negative");
      }
    }
  };
  const Totalamountadultfun = (item) => {
    if (item != null && item > 0) {
      return item * counter;
    } 
  };

  const putsenior = async (add) => {
    if (add == "+") {
      if( counter1 < 6){
        setcounter1(counter1 + 1);
        //   console.log("Increase", ticketcount);
      }
      
    } else {
      if (counter1 > 0) {
        setcounter1(counter1 - 1);
        // console.log("decrease", ticketcount);
      } else {
        console.log("NOT IN Negative");
      }
    }
  };
  const Totalamountseniorfun = (item) => {
    if (item != null && item > 0) {
      return item * counter1;
    } 
  };

  const putkids = async (add) => {
    if (add == "+") {
      if( counter2 < 6){
      setcounter2(counter2 + 1);
      //   console.log("Increase", ticketcount);
      }
    } else {
      if (counter2 > 0) {
        setcounter2(counter2 - 1);
        // console.log("decrease", ticketcount);
      } else {
        console.log("NOT IN Negative");
      }
    }
  };
  const Totalamountkidsfun = (item) => {
    if (item != null && item > 0) {
     return item * counter2;
    }  
  };
  return (
    <SafeAreaView style={{backgroundColor: '#EAEDF7', flex: 1, height: '100%'}}>
      <CustomHeader
        title={'Book A Tour'}
        onBackPress={() => {
          props.navigation.goBack()
        //   props.navigation.navigate('HomeStack', {
        //     screen: 'BookDetails',
        //     params: {},
        // });
        }}
      />
      <ScrollView>
        <>
          <Text
            style={[
              styles.uploadTxt,
              {fontWeight: '600', marginLeft: '5%', marginTop: 10},
            ]}>
            You’re Booking Tour for!
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
            <View style={{width:'90%'}}>
              <Text numberOfLines={2} style={[styles.uploadTxt, {fontWeight: '700'}]}>
              {tourdetails?.title}
              </Text>
              </View>
              <View style={{width:'90%'}}>
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
              zIndex: 3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
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
            <View style={{width: '20%'}}>
              <Text
                style={[
                  styles.forAllTxt,
                  {color: COLORS.Primary_Blue, fontWeight: '700', fontSize: 13},
                ]}>
                ${Totalamountadultfun(tourdetails?.same_for_all != "" ? tourdetails?.same_for_all: tourdetails?.age_11_price)}
              </Text>
            </View>

            <View
              style={{
                width: '30%',
                height: 50,
                // zIndex: -999,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    putadult("-");
                    // counter <= 0 ? setcounter(1) : putadult("-");;
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/images/Icons/Minus_icon.png')}
                  />
                </TouchableOpacity>
                <View style={{  width: 15,
                    height: 30,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    // backgroundColor:'red'
                    }}>
                  <Text
                    style={{color: '#000', fontWeight: '500', fontSize: 12,textAlign:'center'}}>
                    {counter}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    putadult("+");
                    // setcounter(counter + 1);
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/images/Icons/Plus_icon.png')}
                  />
                </TouchableOpacity>
              </View>
               
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
              zIndex: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
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
            <View style={{width: '20%'}}>
              <Text
                style={[
                  styles.forAllTxt,
                  {color: COLORS.Primary_Blue, fontWeight: '700', fontSize: 13},
                ]}>
                ${Totalamountseniorfun(tourdetails?.same_for_all != "" ? tourdetails?.same_for_all:tourdetails?.age_60_price)}
              </Text>
            </View>
            <View
              style={{
                width: '30%',
                height: 50,
                // zIndex: -999,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                     putsenior('-');
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/images/Icons/Minus_icon.png')}
                  />
                </TouchableOpacity>
                <View style={{  width: 15,
                    height: 30,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    // backgroundColor:'red'
                    }}>
                  <Text
                    style={{color: '#000', fontWeight: '500', fontSize: 12,textAlign:'center'}}>
                    {counter1}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    putsenior('+');
                    // setcounter1(counter1 + 1);
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/images/Icons/Plus_icon.png')}
                  />
                </TouchableOpacity>
              </View>
              
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
              zIndex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
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
            <View style={{width: '20%'}}>
              <Text
                style={[
                  styles.forAllTxt,
                  {color: COLORS.Primary_Blue, fontWeight: '700', fontSize: 13},
                ]}>
                ${Totalamountkidsfun(tourdetails?.same_for_all != "" ? tourdetails?.same_for_all:tourdetails?.under_10_age_price)}
              </Text>
            </View>
            <View
              style={{
                width: '30%',
                height: 50,
                // zIndex: -999,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    putkids('-');
                    // counter2 <= 0 ? setcounter2(1) : setcounter2(counter2 - 1);
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/images/Icons/Minus_icon.png')}
                  />
                </TouchableOpacity>
                <View style={{  width: 15,
                    height: 30,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    // backgroundColor:'red'
                    }}>
                  <Text
                    style={{color: '#000', fontWeight: '500', fontSize: 12,textAlign:'center'}}>
                    {counter2}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    putkids('+');
                    // setcounter2(counter2 + 1);
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/images/Icons/Plus_icon.png')}
                  />
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
          <View style={{height: 5}} />
           
          <CustomButtonRound
          stle={{width:'90%'}}
            //  borderColor={'#83CDFD'}
            txtStyle={{color: '#fff', fontSize: 16, fontWeight: '400'}}
            backgroundColor={COLORS.Primary_Blue}
            title={'Confirm Booking'}
            onPress={() => {
              if(counter > "0" || counter1 > "0" || counter2 > "0"){
                props.navigation.navigate('ReviewBooking',{TourData:props?.route?.params?.TourData,selectedDate:selectedDate,  counter:counter,counter1:counter1,counter2:counter2});
              }else{
                setalert_sms("Please select minimum 1 person for booking tour");
                setMy_Alert(true);
              }
              
            }}
          />
           
          <CustomButtonRound
           stle={{width:'90%'}}
            // borderColor={'#F4F4F4'}
            txtStyle={{color: '#000', fontSize: 16, fontWeight: '400'}}
            backgroundColor={'#FFF'}
            title={'Cancel'}
            onPress={() => { props.navigation.goBack()}}
          />
          
          <View style={{height: 80}} />
        </>
      </ScrollView>
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

export default BookAnTour;

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
    fontSize: 15,
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
