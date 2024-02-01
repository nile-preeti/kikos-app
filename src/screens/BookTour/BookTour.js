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
import LinearGradient from 'react-native-linear-gradient';
import CustomCard from '../../components/CustomCard';
import CustomDropdown from '../../components/CustomDropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {
  get_book_tour,
  requestGetApi,
  requestPostApi,
  tour_details,
} from '../../WebApi/Service';
import {useSelector, useDispatch} from 'react-redux';
import {FONTS} from '../../global/Utils';

const BookTour = props => {
  const user = useSelector(state => state.user.user_details);
  const ProfileDetail = useSelector(state => state.user.ProfileDetails);
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [horizontalData, setHorizontalData] = useState([]);
  const[popularData,setPopularData]=useState([]);
  const [tourCountValue, setTourCountValue] = useState('');

  const [openState, setopenState] = useState(false);

  const [valueState, setValueState] = useState('');

  const [opencity, setOpencity] = useState(false);

  const [valuecity, setValuecity] = useState();
  const [DATA, setDATA] = useState([
    {
      id: 1,
      title: 'Confirmed Tour',
      count: '05',
    },
    {
      id: 2,
      title: 'Free Call Back Requests',
      count: '08',
    },
  ]);
  const [DATA1, setDATA1] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);
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

  // const onpressConfirmedtour = id => {

  //   if (id == 1) {
  //     props.navigation.navigate('ConfirmedTour');
  //   } else {
  //     props.navigation.navigate('FreeCallBackRqst');
  //   }
  // };
  useEffect(() => {
    GetBookTourApi();
  }, []);
  // console.log("ProfileDetail",ProfileDetail?.userid);
  const GetBookTourApi = async () => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('user_id', ProfileDetail?.userid);
    const {responseJson, err} = await requestPostApi(
      get_book_tour,
      user.userid != undefined ? formdata : '',
      'POST',
      '',
    );
    setLoading(false);
    console.log('the res=PostTourDetails=>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        setHorizontalData(responseJson.data);
        setTourCountValue(responseJson);
        setPopularData(responseJson.popular_tour)
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else if(err == null) {
      setalert_sms(err);
      setMy_Alert(true);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.White, height: '100%'}}>
      <HomeHeaderComponent
        icon1={require('../../assets/images/Icons/firstline2.png')}
        press1={() => {
          props.navigation.openDrawer();
        }}
        press2={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <View style={{top: -60, backgroundColor: 'transparent', height: '100%'}}>
        <ScrollView
          nestedScrollEnabled={true}
          style={{showsverticalscrollindicator: false}}>
          <View style={{flex: 1, height: '100%'}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={horizontalData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <>
                    <TouchableOpacity
                      key={index}
                      style={{
                        width: (dimensions.SCREEN_WIDTH * 90) / 100,
                        borderRadius: 20,
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowRadius: 2,
                        shadowOpacity: 0.2,
                        height: 300,
                        elevation: 3,
                        // marginTop: 20,
                        marginHorizontal: 10,
                      }}
                      onPress={() => {
                        props.navigation.navigate('BookDetails', {
                          tourId: item?.id,
                        });
                      }}>
                      <ImageBackground
                        style={{
                          width: '100%',
                          height: 300,
                          resizeMode: 'stretch',
                          justifyContent: 'flex-end',
                          borderRadius: 20,
                          overflow: 'hidden',
                        }}
                        // resizeMode="stretch"
                        source={{uri: `${item?.images}`}}>
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
                            }}>{
                              item?.same_for_all != "" ?  "US$"+item?.same_for_all : "US$"+item?.under_10_age_price +" – /US$"+item?.age_11_price
                            }
                            </Text>
                        </LinearGradient>
                        <LinearGradient
                          style={{
                            width: '100%',

                            // height: 46,
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
                              padding: 12,
                              paddingHorizontal: 20,
                              backgroundColor: 'transparent',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <View style={{width: '70%'}}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    fontWeight: '700',
                                    fontSize: 16,
                                  }}>
                                  {item?.title}
                                </Text>
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    fontWeight: '400',
                                    fontSize: 13,
                                    lineHeight: 18,
                                  }}>
                                  {item?.name} • {item?.duration} Hours
                                </Text>
                              </View>

                              <TouchableOpacity
                                style={{
                                  width: 55,
                                  height: 55,
                                  borderRadius: 55 / 2,
                                  backgroundColor: COLORS.Primary_Blue,
                                  justifyContent: 'center',
                                  borderWidth: 6,
                                  borderColor: 'rgba(131, 205, 253, 1)',
                                }}
                                onPress={() => {
                                  props.navigation.navigate('BookDetails', {
                                    tourId: item.id,
                                  });
                                }}>
                                <View
                                  style={{
                                    width: 45,
                                    alignSelf: 'center',
                                    height: 45,
                                    borderRadius: 45 / 2,
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: 'rgba(228, 228, 228, 1)',
                                  }}>
                                  <Text
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: '#fff',
                                      fontWeight: '600',
                                      fontSize: 13,
                                      alignSelf: 'center',
                                    }}>
                                    View
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </LinearGradient>
                      </ImageBackground>
                      {/* <View style={{padding: 15, flex: 1}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{width: '70%', }}>
                            <Text numberOfLines={1}
                              style={{
                                color: '#000',
                                fontWeight: '700',
                                fontSize: 16,
                              }}>
                              {item?.title}
                            </Text>
                            <Text
                            numberOfLines={1}
                              style={{
                                color: '#8F93A0',
                                fontWeight: '400',
                                fontSize: 12,
                                lineHeight: 18,
                              }}>
                              {item?.name} • {item?.duration} Hours
                            </Text>
                            
                          </View>

                          
                          <TouchableOpacity
                            style={{
                              width: 55,
                              height: 55,
                              borderRadius: 55/2,
                              backgroundColor: COLORS.Primary_Blue,
                              justifyContent: 'center',
                              borderWidth:6,
                              borderColor:'#83CDFD'
                            }}
                            onPress={() => {
                              props.navigation.navigate('BookDetails', {
                                tourId: item.id,
                              });
                              
                            }}
                             
                          >
                             <View style={{ width: 45, 
                                   alignSelf:'center',
                                    height: 45,
                                    borderRadius: 45 / 2, justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: 'rgba(228, 228, 228, 1)',}}>
                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: 13,
                                alignSelf: 'center',
                              }}>
                              View
                            </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View> */}
                    </TouchableOpacity>
                  </>
                );
              }}
            />
          </View>
          {/* <View style={styles.cardContainer}>
            <CustomCard 
            title={"Confirmed Tour"}
            />
            <CustomCard />
          </View> */}
          {user.userid != undefined ? (
            <View style={{marginTop: 10}}>
              <ScrollView horizontal={true}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ConfirmedTour');
                    }}
                    style={styles.bannercardContainer}>
                    <ImageBackground
                      resizeMode="stretch"
                      source={require('../../assets/images/largeimages/banner1.png')}
                      style={styles.backgroundImage}
                      // blurRadius={10} // Adjust blur intensity as needed
                    >
                      <LinearGradient
                        // style={{flex: 1}}
                        colors={['#23356F61', '#23356F61', '#23356F61']}
                        start={{x: 1, y: 1}}
                        end={{x: 0.5, y: 0.5}}
                        style={styles.cardContent}>
                        <Text style={styles.title}>Booking Tour</Text>
                        <Text style={styles.description}>
                          {tourCountValue?.confirmed_tour}
                        </Text>
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('FreeCallBackRqst');
                    }}
                    style={styles.bannercardContainer}>
                    <ImageBackground
                      resizeMode="stretch"
                      source={require('../../assets/images/largeimages/banner1.png')}
                      style={styles.backgroundImage}
                      // blurRadius={10} // Adjust blur intensity as needed
                    >
                      <LinearGradient
                        // style={{flex: 1}}
                        colors={['#23356F61', '#23356F61', '#23356F61']}
                        start={{x: 1, y: 1}}
                        end={{x: 0.5, y: 0.5}}
                        style={styles.cardContent}>
                        <Text style={styles.title}>
                          Free Call Back Requests
                        </Text>
                        <Text style={styles.description}>
                          {tourCountValue?.free_callback_request}
                        </Text>
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </ScrollView>
              {/* <FlatList
             horizontal
             showsHorizontalScrollIndicator={false}
             data={DATA}
             keyExtractor={(item, index) => index.toString()}
             // style={{marginRight:10}}
             renderItem={({item, index}) => {
               return (
                 <>
                   <TouchableOpacity
                     onPress={() => {
                       onpressConfirmedtour(item?.id);
                     }}
                     style={styles.bannercardContainer}>
                     <ImageBackground
                       resizeMode="stretch"
                       source={require('../../assets/images/largeimages/banner1.png')}
                       style={styles.backgroundImage}
                       // blurRadius={10} // Adjust blur intensity as needed
                     >
                       <LinearGradient
                         // style={{flex: 1}}
                         colors={['#23356F61', '#23356F61', '#23356F61']}
                         start={{x: 1, y: 1}}
                         end={{x: 0.5, y: 0.5}}
                         style={styles.cardContent}>
                         <Text style={styles.title}>{item.title}</Text>
                         <Text style={styles.description}>{tourCountValue?.confirmed_tour}</Text>
                       </LinearGradient>
                     </ImageBackground>
                   </TouchableOpacity>
                 </>
               );
             }}
           /> */}
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
              flex: 1,
            }}>
            <Text style={styles.price}>Must try</Text>
            {/* <CustomDropdown /> */}
            <View style={{width: '48%', height: 50, zIndex: 999}}>
              <DropDownPicker
                items={[
                  {label: 'Most Popular', value: 'Most Popular'},
                  {label: 'New!', value: 'new'},
                  {label: "Circle island o'ahu", value: "Circle island o'ahu"},
                ]}
                listParentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 22,
                }}
                listParentLabelStyle={{
                  fontWeight: '400',
                  fontSize: 15,
                }}
                // backgroundColor="white"
                placeholder="Most Popular"
                placeholderTextColor={'#B2B7B9'}
                containerStyle={{height: 50, paddingLeft: 4}}
                dropDownDirection="BOTTOM"
                bottomOffset={100}
                itemStyle={{justifyContent: 'flex-start'}}
                textStyle={{
                  fontSize: 14,
                }}
                open={openState}
                setOpen={setopenState}
                value={valueState}
                setValue={setValueState}
                scrollViewProps={{
                  decelerationRate: 'medium',
                  ScrollView: '#ffcc00',
                }}
                onChangeValue={values => {
                  setValueState(values);
                }}
                onChangeText={item => setValueState(item)}
                defaultValue={null}
                dropDownContainerStyle={{
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
                  // borderColor: "#8F93A0",
                  borderRadius: 15,
                  marginTop: 6,
                }}
                style={{
                  borderColor: 'white',
                  backgroundColor: 'white',
                  borderRadius: 5,

                  zIndex: 1,
                  paddingLeft: 20,
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 20, flex: 1, paddingBottom: 70}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={popularData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <>
                    <View
                      style={{
                        width: (dimensions.SCREEN_WIDTH * 95) / 100,
                        borderRadius: 20,
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowRadius: 10,
                        // shadowOffset: {height: 0, width: 3},
                        shadowOpacity: 1,
                        elevation: 3,
                        marginBottom: 20,
                        // flex: 1,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('BookDetails', {
                            tourId: item.id,
                            // CalendarList:calendatData
                          });
                          // styles = {flex: 1};
                        }}>
                        <ImageBackground
                          style={{
                            width: '100%',
                            height: 300,
                            resizeMode: 'stretch',
                            justifyContent: 'flex-end',
                            borderRadius: 20,

                            overflow: 'hidden',
                          }}
                          // resizeMode="cover"
                          source={{uri: `${item?.images}`}}>
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
                             {
                              item?.same_for_all != "" ?  "US$"+item?.same_for_all : "US$"+item?.under_10_age_price +" – /US$"+item?.age_11_price
                            }
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
                                padding: 12,
                                paddingHorizontal: 20,
                                backgroundColor: 'transparent',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '100%',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <View style={{width: '100%'}}>
                                  <Text numberOfLines={3}
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: '#FFFFFF',
                                      fontWeight: '700',
                                      fontSize: 16,
                                    }}>
                                    {item?.title}
                                  </Text>
                                  <Text
                                    numberOfLines={2}
                                    style={{
                                      backgroundColor: 'transparent',
                                      color: '#FFFFFF',
                                      fontWeight: '400',
                                      fontSize: 13,
                                      lineHeight: 18,
                                    }}>
                                   {item?.name}
                                  </Text>
                                </View>

                                {/* <TouchableOpacity
                                  style={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: 55 / 2,
                                    backgroundColor: COLORS.Primary_Blue,
                                    justifyContent: 'center',
                                    borderWidth: 6,
                                    borderColor: 'rgba(131, 205, 253, 1)',
                                  }}
                                  onPress={() => {
                                    props.navigation.navigate('BookDetails', {
                                      tourId: item.id,
                                    });
                                  }}>
                                  <View
                                    style={{
                                      width: 45,
                                      alignSelf: 'center',
                                      height: 45,
                                      borderRadius: 45 / 2,
                                      justifyContent: 'center',
                                      borderWidth: 1,
                                      borderColor: 'rgba(228, 228, 228, 1)',
                                    }}>
                                    <Text
                                      style={{
                                        backgroundColor: 'transparent',
                                        color: '#fff',
                                        fontWeight: '600',
                                        fontSize: 13,
                                        alignSelf: 'center',
                                      }}>
                                      View
                                    </Text>
                                  </View>
                                </TouchableOpacity> */}
                              </View>
                            </View>
                          </LinearGradient>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  </>
                );
              }}
            />
          </View>
        </ScrollView>
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

export default BookTour;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#E8ECF2',
    backgroundColor: '#EAEDF7',
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  bannercardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 257,
    height:90,
    marginHorizontal: 10,
    // aspectRatio: 13 / 7, // You can adjust the aspect ratio based on your design
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    // alignItems:'center',
    // backgroundColor:'transparent',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the background color and opacity
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    color: 'white',
    fontWeight: '400',
  },
  description: {
    fontSize: 16,
    color: '#3DA1E3',
    fontWeight: '700',
    // color: 'white',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'regular',
    color: '#000',
  },
});
