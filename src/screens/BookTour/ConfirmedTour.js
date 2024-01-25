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
import React, {useState, Fragment, useCallback, useMemo, useRef} from 'react';
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

const ConfirmedTour = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectButton, setSelectButton] = useState('showall');
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
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

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
    <SafeAreaView style={{backgroundColor: COLORS.Primary_Blue}}>
      <View style={{backgroundColor: '#EAEDF7'}}>
        <CustomHeader
          title={'Confirmed Tour'}
          onBackPress={() => {
            props.navigation.goBack();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            marginHorizontal: 20,
            marginTop: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              setSelectButton('showall');
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: 120,
              borderRadius: 10,
              backgroundColor:
                selectButton == 'showall' ? '#3DA1E3' : '#ffffff',
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
                fontSize: 14,
                color: selectButton == 'showall' ? '#fff' : '#000',
              }}>
              Show All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectButton('accepted');
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: 120,
              borderRadius: 10,
              backgroundColor:
                selectButton == 'accepted' ? '#3DA1E3' : '#ffffff',
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
                fontSize: 14,
                color: selectButton == 'accepted' ? '#fff' : '#000',
              }}>
              Accepted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectButton('rejected');
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: 120,
              borderRadius: 10,
              backgroundColor:
                selectButton == 'rejected' ? '#3DA1E3' : '#ffffff',
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
                fontSize: 14,
                color: selectButton == 'rejected' ? '#fff' : '#000',
              }}>
              Rejected
            </Text>
          </TouchableOpacity>
        </View>
<View style={{marginBottom:100,}}>


        <FlatList
          data={DASHDATA}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={(item, index) => {
            return (
              <TouchableOpacity
              onPress={() => {props.navigation.navigate('ConfirmedTourDetails',{tourId:1})}}
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
                      }}
                      source={require('../../assets/images/largeimages/Rectangle9.png')}
                    />
                  </View>

                  <View style={{marginLeft: 10}}>
                    <Text style={[styles.uploadTxt, {fontWeight: '600'}]}>
                      North Shore
                    </Text>
                    <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                      For All Ages! Great For Families!
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        style={{width: 12, height: 12, resizeMode: 'stretch'}}
                        source={require('../../assets/images/Icons/calendar.png')}></Image>
                      <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                        {' '}
                        Duration 8 Hours
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        style={{width: 12, height: 12, resizeMode: 'stretch'}}
                        source={require('../../assets/images/Icons/clock.png')}></Image>
                      <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                        {' '}
                        19 October, 2023 Saturday
                      </Text>
                    </View>
                  </View>
                  <View style={{width: '30%'}}></View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 15,
                    width: '95%',
                  }}>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={[
                        styles.uploadTxt,
                        {fontWeight: '400', fontSize: 14},
                      ]}>
                      No of People
                    </Text>
                    <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                      04
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={[
                        styles.uploadTxt,
                        {fontWeight: '400', fontSize: 14},
                      ]}>
                      Selected Date:
                    </Text>
                    <Text style={[styles.forAllTxt, {color: '#8F93A0'}]}>
                      19 October, 2023 Saturday
                    </Text>
                  </View>
                </View>
                <View style={[styles.line, {marginTop: 18,}]}></View>
                
                <View style={[styles.bookingIdContainer]}>
                    
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
                      $559.00
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {}}
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
              height: (dimensions.SCREEN_HEIGHT * 35) / 100,
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
    </SafeAreaView>
  );
};

export default ConfirmedTour;

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
    color: '#CECECE',
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
