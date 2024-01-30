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
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Mycolors, dimensions} from '../../utility/Mycolors';
import HomeHeaderComponent from '../../components/HomeHeaderComponent';
import COLORS from '../../global/Colors';
import images from '../../global/images';
import {FONTS} from '../../global/Utils';
import {setLoading, saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import CustomheaderCard from '../../components/CustomheaderCard';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  get_virtual_tour,
  requestGetApi,
  requestPostApi,
  tour_details,
} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';

const Audio = props => {
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [virtualdata, setVirtualData] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [showda, setshowda] = useState(false);
  const DATA = [
    {
      image: '',
      title: 'Product 1',
      description: 'Description of Product 1.',
      price: 29.99,
      donation: 5.0,
    },
    {
      image: 'path/to/image2.jpg',
      title: 'Product 2',
      description: 'Description of Product 2.',
      price: 39.99,
      donation: 7.5,
    },
    {
      image: 'path/to/image3.jpg',
      title: 'Product 3',
      description: 'Description of Product 3.',
      price: 49.99,
      donation: 10.0,
    },
    // Add more objects as needed
  ];
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

  useEffect(() => {
    getVirtualTour();
  }, []);

  const getVirtualTour = async () => {
    setLoading(true);
    const {responseJson, err} = await requestGetApi(
      get_virtual_tour,
      '',
      'GET',
      '',
    );
    setLoading(false);
    console.log('the getVirtualTour==>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        setVirtualData(responseJson.data);
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
    <SafeAreaView style={{backgroundColor: COLORS.White, height: '100%'}}>
      <HomeHeaderComponent
        // stylecontainer={{height:110}}
        icon1={require('../../assets/images/Icons/firstline2.png')}
        press1={() => {
          props.navigation.openDrawer();
        }}
        press2={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <>
        {user.userid == undefined ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              top: -40,
            }}>
            <View style={[styles.calCantainer, {marginTop: 25,}]}>
          <View style={styles.container}>
            <Text style={styles.dateText}>{orderDate
                    ? moment(orderDate).format('LL')
                    : "13 October 2023"}</Text>
            <Image
              resizeMode="contain"
              style={styles.calendar}
              source={images.calendar}
            />
          </View>
          <TouchableOpacity onPress={()=>{setshowda(true);}} style={styles.scontainer}>
            <Image source={images.fillter} />
          </TouchableOpacity>
        </View>
         
        <View style={{}}>
            {Platform.OS == "ios" ? (
              <DatePicker
                customStyles={{
                  dateInput: { borderColor: "transparent" },
                  dateText: { color: Mycolors.GrayColor },
                  dateIcon: styles.dateIcon,
                  dateplaceholder: {
                    alignContent: "flex-start",
                  },
                  placeholderText: {
                    fontSize: 15,
                    color: Mycolors.GrayColor,

                    left: Platform.OS == "ios" ? -30 : 5,
                  },
                  zIndex: 99999,
                }}
                showIcon={false}
                androidMode={"spinner"}
                readOnly={true}
                style={[
                  styles.datePickerSelectInput,
                  {
                    fontSize: 11,
                    color: Mycolors.GrayColor,
                    left: Platform.OS == "ios" ? 15 : 10,
                  },
                ]}
                date={orderDate}
                mode="date"
                placeholder={"Pick a Date"}
                // minimumDate={orderendDate != "" ? new Date(moment(orderendDate).format("YYYY-MM-DD")) : new Date() }
                // maximumDate={new Date()}
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {
                  console.log("datae isss==>>", date);
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
                    console.log("SelectDate.start....", sTime.toDateString());
                    setOrderDate(sTime);
                    console.log(event);
                  }}
                />
              </View>
            ) : (
             null
            )}
          </View>
          
            <View style={{marginTop: 20, marginBottom: 20}}>
            <FlatList
               
               showsVerticalScrollIndicator={false}
                data={virtualdata}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => {
                          props.navigation.navigate('AudioDetails', {
                            virtualId: item?.id,
                          });
                        }}>
                        <ImageBackground
                          style={styles.imageBackground}
                          // resizeMode="stretch"
                          source={{uri: `${item?.thumbnail}`}}>
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
                              Purchase at ${item?.price}
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
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingTop:6,
                                paddingBottom:14,
                                paddingHorizontal: 23,
                                // backgroundColor: 'transparent',
                              }}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  // alignItems: 'flex-start',
                                  flexDirection: 'row',
                                }}>
                                <View style={{justifyContent: 'center',height:50,width:60,alignItems:'center',marginLeft:0}}>
                                  <Image
                                    style={{height: 37, width: 37,alignSelf:'center'}}
                                    source={require('../../assets/images/Icons/headphone_white.png')}
                                  />
                                </View>
                                <View style={{justifyContent: 'center',width:'90%',paddingRight:10}}>
                                  <Text numberOfLines={2}
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: '#FFFFFF',
                                      fontWeight: '700',
                                      fontSize: 15,
                                    }}>
                                    {item?.name}{item?.name}
                                  </Text>
                                </View>
                              </View>
                              <Text
                                numberOfLines={1}
                                style={{
                                  backgroundColor: 'transparent',
                                  color: '#FFFFFF',
                                  fontWeight: '400',
                                  fontSize: 13,
                                  lineHeight: 18,
                                }}>
                                {item?.description}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: 'rgba(255, 255, 255, 1)',
                                  paddingHorizontal: 10,
                                  paddingVertical: 5,
                                  borderRadius: 5,
                                  marginTop: 10,
                                }}>
                                <Text
                                  style={{
                                    color: '#3DA1E3',
                                    fontWeight: '400',
                                    fontSize: 12,
                                    lineHeight: 20,
                                  }}>
                                  TOTAL DURATION MORE THAN {item?.minute} HOURS
                                </Text>
                              </View>
                            </View>
                          </LinearGradient>
                        </ImageBackground>
                       
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            </View>
          </View>
        ) : (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <View style={{top: -120}}>
              <CustomheaderCard
                title={'Confirmed Tour'}
                number={'08'}
                imageUrl={images.groupImg}
                pressGo={() => {
                  props.navigation.navigate('ConfirmedTourScreen');
                }}
              />
            </View>

            <View style={[styles.calCantainer, {marginTop: 25,}]}>
          <View style={styles.container}>
            <Text style={styles.dateText}>{orderDate
                    ? moment(orderDate).format('LL')
                    : "13 October 2023"}</Text>
            <Image
              resizeMode="contain"
              style={styles.calendar}
              source={images.calendar}
            />
          </View>
          <TouchableOpacity onPress={()=>{setshowda(true);}} style={styles.scontainer}>
            <Image source={images.fillter} />
          </TouchableOpacity>
        </View>
         
        <View style={{}}>
            {Platform.OS == "ios" ? (
              <DatePicker
                customStyles={{
                  dateInput: { borderColor: "transparent" },
                  dateText: { color: Mycolors.GrayColor },
                  dateIcon: styles.dateIcon,
                  dateplaceholder: {
                    alignContent: "flex-start",
                  },
                  placeholderText: {
                    fontSize: 15,
                    color: Mycolors.GrayColor,

                    left: Platform.OS == "ios" ? -30 : 5,
                  },
                  zIndex: 99999,
                }}
                showIcon={false}
                androidMode={"spinner"}
                readOnly={true}
                style={[
                  styles.datePickerSelectInput,
                  {
                    fontSize: 11,
                    color: Mycolors.GrayColor,
                    left: Platform.OS == "ios" ? 15 : 10,
                  },
                ]}
                date={orderDate}
                mode="date"
                placeholder={"Pick a Date"}
                // minimumDate={orderendDate != "" ? new Date(moment(orderendDate).format("YYYY-MM-DD")) : new Date() }
                // maximumDate={new Date()}
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {
                  console.log("datae isss==>>", date);
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
                    console.log("SelectDate.start....", sTime.toDateString());
                    setOrderDate(sTime);
                    console.log(event);
                  }}
                />
              </View>
            ) : (
             null
            )}
          </View>
            <View style={{marginTop: 20, flex: 1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={virtualdata}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => {
                          props.navigation.navigate('AudioDetails', {
                            virtualId: item?.id,
                          });
                        }}>
                        <ImageBackground
                          style={styles.imageBackground}
                          // resizeMode="stretch"
                          source={{uri: `${item?.thumbnail}`}}>
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
                              Purchase at ${item?.price}
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
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingTop:6,
                                paddingBottom:14,
                                paddingHorizontal: 23,
                                // backgroundColor: 'transparent',
                              }}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  // alignItems: 'flex-start',
                                  flexDirection: 'row',
                                }}>
                                <View style={{justifyContent: 'center',height:50,width:60,alignItems:'center',marginLeft:0}}>
                                  <Image
                                    style={{height: 37, width: 37,alignSelf:'center'}}
                                    source={require('../../assets/images/Icons/headphone_white.png')}
                                  />
                                </View>
                                <View style={{justifyContent: 'center',width:'90%',paddingRight:10}}>
                                  <Text numberOfLines={2}
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: '#FFFFFF',
                                      fontWeight: '700',
                                      fontSize: 15,
                                    }}>
                                    {item?.name}{item?.name}
                                  </Text>
                                </View>
                              </View>
                              <Text
                                numberOfLines={1}
                                style={{
                                  backgroundColor: 'transparent',
                                  color: '#FFFFFF',
                                  fontWeight: '400',
                                  fontSize: 13,
                                  lineHeight: 18,
                                }}>
                                {item?.description}
                              </Text>
                              <View
                                style={{
                                  backgroundColor: 'rgba(255, 255, 255, 1)',
                                  paddingHorizontal: 10,
                                  paddingVertical: 5,
                                  borderRadius: 5,
                                  marginTop: 10,
                                }}>
                                <Text
                                  style={{
                                    color: '#3DA1E3',
                                    fontWeight: '400',
                                    fontSize: 12,
                                    lineHeight: 20,
                                  }}>
                                  TOTAL DURATION MORE THAN {item?.minute} HOURS
                                </Text>
                              </View>
                            </View>
                          </LinearGradient>
                        </ImageBackground>
                        {/* <View style={{padding: 15}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{width: '100%'}}>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '700',
                              fontSize: 15,
                              lineHeight: 20,
                            }}>
                           {item?.name}
                          </Text>
                          <Text numberOfLines={1}
                            style={{
                              color: '#8F93A0',
                              fontWeight: '500',
                              fontSize: 12,
                              lineHeight: 20,
                            }}>
                            {item?.description}
                          </Text>
                           
                          
                        </View>
                      </View>
                    </View> */}
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            </View>
          </View>
        )}
      </>
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

export default Audio;

const styles = StyleSheet.create({
  cardContainer: {
    height: 125,
    width: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'absolute',
    top: '12%',
    elevation: 7,
  },

  calCantainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 50,
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scontainer: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#3DA1E3',
    marginTop: 70,
    marginLeft: 10,

    alignItems: 'center',
    justifyContent: 'center',
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
  touchableOpacity: {
    width: (dimensions.SCREEN_WIDTH * 95) / 100,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 20,
  },
  imageBackground: {
    width: '100%',
    height: 290,
    // resizeMode: 'stretch',
    justifyContent: 'flex-end',
    borderRadius: 20,

    overflow: 'hidden',
  },
});
