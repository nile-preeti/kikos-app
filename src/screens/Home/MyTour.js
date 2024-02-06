import React, {useState, useEffect} from 'react';
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
import CustomHeader from '../../components/CustomeHeader';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import COLORS from '../../global/Colors';
import {FONTS} from '../../global/Utils';
import AntDesign from 'react-native-vector-icons';
import CustomButton from '../../components/CustomButton/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import {Calendar, LocaleConfig, CalendarUtils} from 'react-native-calendars';
import {DASHDATA} from '../../redux/types';
import {confirmed_tour, requestGetApi, requestPostApi} from '../../WebApi/Service';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {useSelector, useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

const MyTour = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectButton, setSelectButton] = useState('showall');
  const [modalVisible, setModalVisible] = useState(false);
  const [cancellationtext, setCancellationtext] = useState('');

  const [Data, setDATA] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
   
   
  useEffect(() => {
    getConfirmedTour();
  }, []);

  const getConfirmedTour = async () => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('status', '');
    const {responseJson, err} = await requestPostApi(
      confirmed_tour,
      formdata,
      'POST',
      user.token,
    );
    setLoading(false);
    console.log('the getConfirmedTour==>>', responseJson.data);
    if (err == null) {
      if (responseJson.status == true) {
        setDATA(responseJson.data);
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
    <SafeAreaView style={{backgroundColor: '#EAEDF7', flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#EAEDF7'}}>
        <CustomHeader
          title={'My Tours Booking'}
          // backarrow={true}
          onBackPress={() => {
            // CommonActions.reset({
            //   index: 1,
            //   routes: [{name: props.navigation.goBack()}],
            // });
            // props.navigation.goBack();
          }}
        />

        <View style={{justifyContent: 'center', marginTop: 15, flex: 1}}>
          <FlatList
            Vertical={true}
            data={Data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
            return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    props.navigation.navigate('ConfirmedTourDetails', {
                      tourId: item?.id,
                    });
                  }}
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    // marginTop: 15,
                    marginBottom: 25,
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
                      <Text style={styles.bookingIdN}>
                        {item?.boooking_id != null
                          ? item?.boooking_id
                          : 'not found'}
                      </Text>
                      {/* <Image
                        source={images.document}
                        style={{marginLeft: 7, marginTop: 3}}
                      /> */}
                    </View>

                    <View
                      style={{
                        height: 26,
                        width: 96,
                        borderRadius: 50,
                        flexDirection: 'row',
                        borderColor:
                          item?.status_id == '1'
                            ? '#4CBA08'
                            : item?.status_id == '2'
                            ? '#FF0000'
                            : '#9C9D9F',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            item?.status_id == '1'
                              ? '#4CBA08'
                              : item?.status_id == '2'
                              ? '#FF0000'
                              : '#9C9D9F',
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
                          color:
                            item?.status_id == '1'
                              ? '#4CBA08'
                              : item?.status_id == '2'
                              ? '#FF0000'
                              : '#9C9D9F',
                        }}>
                        {item?.status}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.line, {marginTop: 18}]}></View>
                  <View
                    style={{
                      flexDirection: 'row',

                      alignSelf: 'center',
                      alignItems: 'center',
                      marginTop: 15,
                      width: '95%',
                      //   backgroundColor: '#fff',
                      //   borderRadius: 10,
                      //   shadowColor: '#000',
                      //   shadowOffset: {width: 1, height: 1},
                      //   shadowOpacity: 0.4,
                      //   shadowRadius: 2,
                      //   elevation: 3,
                      //   padding: 7,
                    }}>
                    <View>
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: 'stretch',
                          borderRadius: 10,
                          // backgroundColor:'gray'
                        }}
                        // source={require('../../assets/images/largeimages/Rectangle9.png')}
                        source={
                          item?.images != ''
                            ? {uri: `${item?.images}`}
                            : require('../../assets/images/largeimages/Rectangle9.png')
                        }
                      />
                    </View>

                    <View style={{width: '80%', marginLeft: 10}}>
                      <View style={{width: '90%'}}>
                        <Text
                          numberOfLines={1}
                          style={[styles.uploadTxt, {fontWeight: '600'}]}>
                          {item?.tour_image}
                          {item?.tour_title}
                        </Text>
                      </View>

                      <View style={{width: '100%'}}>
                        <Text
                          numberOfLines={2}
                          style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                          {item?.description}
                        </Text>
                      </View>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          style={{width: 12, height: 12, resizeMode: 'stretch'}}
                          source={require('../../assets/images/Icons/calendar.png')}></Image>
                        <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                          {' '}
                          Duration {item?.duration} Hours
                        </Text>
                      </View>
                      {/* <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          style={{width: 12, height: 12, resizeMode: 'stretch'}}
                          source={require('../../assets/images/Icons/clock.png')}></Image>
                        <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                          {' '}
                          {item?.created_date}
                        </Text>
                      </View> */}
                    </View>
                    {/* <View style={{width: '30%'}}></View> */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 15,
                      width: '95%',
                      // height:50,
                      // flex:1
                    }}>
                    <View style={{marginLeft: 10, width: '40%', flex: 0.7}}>
                      <Text
                        style={[
                          styles.uploadTxt,
                          {fontWeight: '400', fontSize: 14},
                        ]}>
                        No of People
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          style={{width: 12, height: 12, resizeMode: 'stretch'}}
                          source={require('../../assets/images/Icons/green_3-people.png')}></Image>
                        <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                          {' '}
                          {item?.no_of_person}
                        </Text>
                      </View>
                    </View>
                    <View style={{marginLeft: 10, flex: 0.8}}>
                      <Text
                        style={[
                          styles.uploadTxt,
                          {fontWeight: '400', fontSize: 14},
                        ]}>
                        Selected Date:
                      </Text>
                      <View style={{width: '100%'}}>
                        <Text
                          numberOfLines={2}
                          style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                          {item?.selectd_date != null
                            ? item?.selectd_date
                            : '--'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.line, {marginTop: 18}]}></View>

                  <View style={[styles.bookingIdContainer]}>
                    <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.bookingIdTxt}>Amount Paid:</Text>
                      <Text
                        style={[
                          styles.bookingIdN,
                          {color: '#3DA1E3', fontWeight: '700', fontSize: 18},
                        ]}>
                        {' '}
                        ${item?.total_amount}
                      </Text>
                    </View>
                    {
                      item?.status_id != null ?
                      <Text style={[styles.forAllTxt, {color: item?.status_id == '1'
                      ? '#4CBA08'
                      : item?.status_id == '2'
                      ? '#FF0000'
                      : '#9C9D9F'}]}>
                      {' '}
                      {item?.status}
                    </Text>
                    :
                    null
                    }
                    </View>
                  
                    <TouchableOpacity
                      onPress={() => {
                        setCancellationtext(item?.cancellation_policy);
                        setModalVisible(true);
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 35,
                        width: 142,
                        borderRadius: 50,
                        backgroundColor: '#3DA1E3',
                        shadowColor: '#000',
                        shadowOffset: {width: 1, height: 1},
                        shadowOpacity: 0.4,
                        shadowRadius: 2,
                        elevation: 3,
                        padding: 7,
                      }}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 12,
                          color: '#fff',
                        }}>
                        Cancellation Policy
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{height: 10}} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
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
              height: 'auto',
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
                {cancellationtext}
              </Text>
            </View>

            <CustomButton
              borderColor={'#83CDFD'}
              txtStyle={{color: '#fff', fontSize: 16, fontWeight: '400'}}
              backgroundColor={COLORS.Primary_Blue}
              title={'Close'}
              onPress={() => {
                setModalVisible(false);
                setCancellationtext('');
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

export default MyTour;

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
  line: {
    height: 1,
    backgroundColor: '#E7EAF1',
    marginTop: 10,
    width: '100%',
    // padding:20
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
    fontWeight: '700',
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
