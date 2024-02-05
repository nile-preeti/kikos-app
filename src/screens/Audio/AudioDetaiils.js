import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useState, useEffect, useRef} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import {FONTS} from '../../global/Utils';
import COLORS from '../../global/Colors';
import AntDesign from 'react-native-vector-icons';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {ScrollView} from 'react-native-gesture-handler';
import {
  requestPostApi,
  tour_details,
  virtual_tour_detail,
} from '../../WebApi/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {
  setLoading,
  onLogoutUser,
  saveUserResult,
} from '../../redux/actions/user_action';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {AudioPlayer} from 'react-native-simple-audio-player';

const AudioDetails = props => {
  const user = useSelector(state => state.user.user_details);
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [tourDetail, setTourDetail] = useState('');
  const [audio, setAudio] = useState('');
  const songSlider = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [DATA2, setDATA2] = useState(['Mon']);

  useEffect(() => {
    console.log('IDS..123...', props?.route?.params?.virtualId);
    PostVirtualTourDetails(props?.route?.params?.virtualId);

    // const unsubscribe = props.navigation.addListener('focus', () => {
    //   PostTourDetails(props?.route?.params?.tourId);

    // });
    // return unsubscribe;
  }, []);
  const PostVirtualTourDetails = async id => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('id', id);
    const {responseJson, err} = await requestPostApi(
      virtual_tour_detail,
      formdata,
      'POST',
      '',
    );
    setLoading(false);
    console.log('the res=PostVirtualTourDetails=>>', responseJson.data);
    if (err == null) {
      if (responseJson.status == true) {
        setTourDetail(responseJson?.data);
        console.log('the Audio=>>', responseJson.data?.audio);
        setAudio(responseJson?.data?.audio);
        // var allimgs = [];

        // for (let i = 1; i <= responseJson.data.images.length; i++) {
        //   allimgs.push({img: responseJson.data.images[i - 1]});
        // }
        // console.log('the allimgs==>>', allimgs);
        // setAllImg(allimgs);
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
    <SafeAreaView style={{backgroundColor: COLORS.White, flex: 1}}>
      <CustomHeader
        title={'Virtual Tour Purchased'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onNotificationPress={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <ScrollView>
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 280,
              width: (dimensions.SCREEN_WIDTH * 95) / 100,
              borderRadius: 20,
              alignSelf: 'center',
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowRadius: 2,
              shadowOpacity: 0.2,
              marginTop: 15,
              elevation: 3,
              // flex: 1,
            }}>
            {/* <Image
              style={{height: 300, width: '100%'}}
              resizeMode="stretch"
              source={require('../../assets/images/largeimages/TrackDemo.png')}
            /> */}
            {audio != '' ? (
              <View
                style={{
                  // backgroundColor:'red',
                  marginTop: 20,
                  width: (dimensions.SCREEN_WIDTH * 85) / 100,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#1F191C',
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  {tourDetail?.name}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    color: '#CECECE',
                    fontWeight: '400',
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  Take You On A Virtual Tour Of Your Life, While Visiting
                  Beautiful O’ahu.
                </Text>
              </View>
            ) : null}
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <View
                style={{
                  top: 2,
                  width: dimensions.SCREEN_WIDTH * 0.95,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: 'rgba(61, 161, 227, 0.9)',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  shadowColor: '#000',
                  // shadowOffset: {width: 0, height: 3},
                  shadowRadius: 1,
                  shadowOpacity: 0.03,
                  // elevation: 3,
                }}>
                <AudioPlayer url={audio} />
              </View>
              {/* <FlatList
                horizontal={true}
                ref={songSlider}
                data={audio}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  // console.log("audioFlatlist", item);
                  return (
                    <>
                      <View
                        style={{
                          // flex: 1,
                          width: dimensions.SCREEN_WIDTH * 0.95,
                          // marginVertical: 10,
                          paddingVertical: 10,
                          // marginHorizontal: 10,
                          borderRadius: 20,
                          backgroundColor: '#1F191C',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 3},
                          shadowRadius: 1,
                          shadowOpacity: 0.03,
                          elevation: 3,
                        }}>
                        <AudioPlayer url={item} />
                      </View>
                    </>
                  );
                }}
              /> */}
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  props.navigation.navigate('');
                }}>
                <ImageBackground
                  style={styles.imageBackground}
                  resizeMode="stretch"
                  source={{uri: `${tourDetail?.thumbnail}`}}
                />

                <View style={{padding: 15}}>
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
                        {tourDetail?.description}
                      </Text>

                      <Text
                        style={{
                          color: '#3DA1E3',
                          fontWeight: '700',
                          fontSize: 13,
                        }}>
                        Purchased at ${tourDetail?.price} - On{' '}
                        {tourDetail?.purchase_date}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginTop: 6,
                        }}>
                        <View
                          style={{
                            justifyContent: 'centr',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{height: 20, width: 20}}
                            resizeMode="contain"
                            source={require('../../assets/images/Icons/greenplayicon.png')}
                          />
                        </View>
                        <Text
                          style={{
                            color: '#8F93A0',
                            fontWeight: '400',
                            fontSize: 12,
                            lineHeight: 20,
                            marginLeft: 6,
                          }}>
                          TOTAL DURATION MORE THAN {tourDetail?.duration} HOURS
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginTop: 6,
                        }}>
                        <View
                          style={{
                            justifyContent: 'centr',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{height: 20, width: 20}}
                            resizeMode="contain"
                            source={require('../../assets/images/Icons/greenUploadicon.png')}
                          />
                        </View>
                        <Text
                          style={{
                            color: '#8F93A0',
                            fontWeight: '400',
                            fontSize: 12,
                            lineHeight: 20,
                            marginLeft: 6,
                          }}>
                          Uploaded date: {tourDetail?.uploaded_date}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginTop: 6,
                        }}>
                        <View
                          style={{
                            justifyContent: 'centr',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{height: 20, width: 20}}
                            resizeMode="contain"
                            source={require('../../assets/images/Icons/greendollar-circle.png')}
                          />
                        </View>
                        <Text
                          style={{
                            color: '#8F93A0',
                            fontWeight: '400',
                            fontSize: 12,
                            lineHeight: 20,
                            marginLeft: 6,
                          }}>
                          Purchased Audio By {tourDetail?.purchase_user_count}{' '}
                          Users
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </>
            {/* <FlatList
              showsHorizontalScrollIndicator={false}
              data={tourDetail}
              renderItem={({item, index}) => {
                return (
                  
                );
              }}
            /> */}
          </View>
          {user.userid == undefined ? (
            <CustomButtonRound
              txtStyle={{color: '#fff', fontSize: 14, fontWeight: '400'}}
              backgroundColor={COLORS.Primary_Blue}
              title={'Login / Signup'}
              onPress={() => {
                AsyncStorage.clear();
                dispatch(onLogoutUser());
              }}
            />
          ) : (
            <CustomButtonRound
              txtStyle={{color: '#fff', fontSize: 14, fontWeight: '400'}}
              backgroundColor={COLORS.Primary_Blue}
              title={'Purchase Audio'}
              onPress={() => {props.navigation.navigate('PurchaseReview',{type:'Audiopurchase',amount:tourDetail?.price})}}
            />
          )}

          <View style={{height: 20}} />
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

export default AudioDetails;

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
    height: 50,
    width: 60,
    backgroundColor: '#3DA1E3',
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
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
    height: 191,
    resizeMode: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
