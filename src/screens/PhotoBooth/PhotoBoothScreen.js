import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HomeHeaderComponent from '../../components/HomeHeaderComponent';
import CustomheaderCard from '../../components/CustomheaderCard';
import images from '../../global/images';
import {FONTS} from '../../global/Utils';
import {dimensions} from '../../utility/Mycolors';
import COLORS from '../../global/Colors';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {onLogoutUser} from '../../redux/actions/user_action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {home, photo_booth_listing, requestGetApi, requestPostApi} from '../../WebApi/Service';

const PhotoBoothScreen = props => {
  const user = useSelector(state => state.user.user_details);
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderDate, setOrderDate] = useState('');
  const [showda, setshowda] = useState(false);
  const [DATA, setDATA] = useState([]);
const[counts,SetCounts]=useState('');

  useEffect(() => {
    GetPhotoBooth();
  }, []);

  const GetPhotoBooth = async () => {
    setLoading(true);
    const {responseJson, err} = await requestGetApi(photo_booth_listing, '', 'GET', user.token);
    setLoading(false);
    console.log('the GetPhotoBooth==>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        setDATA(responseJson.data);
        SetCounts(responseJson);
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
    <SafeAreaView style={{backgroundColor: COLORS.White, flex: 1}}>
      <HomeHeaderComponent
        icon1={require('../../assets/images/Icons/firstline2.png')}
        press1={() => {
          props.navigation.openDrawer();
        }}
        press2={() => {
          props.navigation.navigate('Notification');
        }}
      />
      {user.userid != undefined ? (
        <>
          <View style={{top: -120}}>
            <CustomheaderCard
              title={'Total purchased'}
              imageUrl={images.frame}
              pressGo={() => {
                props.navigation.navigate('TotalPurchasedScreen');
              }}
              middleView={
                <View style={styles.hrcontainer}>
                  <Image
                    style={{height: 15, width: 15, tintColor: '#CECECE'}}
                    source={images.gallaryicon}
                  />
                  <Text style={styles.titleTxt}>{counts?.total_purchase_image} Photos</Text>
                  <Image
                    style={{
                      height: 15,
                      width: 15,
                      marginLeft: 5,
                      tintColor: '#CECECE',
                    }}
                    source={images.gallaryvideoicon}
                  />
                  <Text style={styles.titleTxt}>{counts?.total_purchase_video} Videos</Text>
                </View>
              }
            />
          </View>

          <View style={[styles.calCantainer, {marginTop: 22}]}>
            <View style={styles.container}>
              <Text style={styles.dateText}>
                {orderDate ? moment(orderDate).format('LL') : '13 October 2023'}
              </Text>
              <Image
                resizeMode="contain"
                style={styles.calendar}
                source={images.calendar}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setshowda(true);
              }}
              style={styles.scontainer}>
              <Image source={images.fillter} />
            </TouchableOpacity>
          </View>

          <View style={{}}>
            {Platform.OS == 'ios' ? (
              <DatePicker
                customStyles={{
                  dateInput: {borderColor: 'transparent'},
                  dateText: {color: Mycolors.GrayColor},
                  dateIcon: styles.dateIcon,
                  dateplaceholder: {
                    alignContent: 'flex-start',
                  },
                  placeholderText: {
                    fontSize: 15,
                    color: Mycolors.GrayColor,

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
                    color: Mycolors.GrayColor,
                    left: Platform.OS == 'ios' ? 15 : 10,
                  },
                ]}
                date={orderDate}
                mode="date"
                placeholder={'Pick a Date'}
                // minimumDate={orderendDate != "" ? new Date(moment(orderendDate).format("YYYY-MM-DD")) : new Date() }
                // maximumDate={new Date()}
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={date => {
                  console.log('datae isss==>>', date);
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
                    console.log('SelectDate.start....', sTime.toDateString());
                    setOrderDate(sTime);
                    console.log(event);
                  }}
                />
              </View>
            ) : null}
          </View>
          <View style={{marginTop: 20, flex: 2}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={DATA}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <>
                    <TouchableOpacity
                      style={styles.touchableOpacity}
                      onPress={() => {
                        props.navigation.navigate('PhotoBoothPurchased',{PhotoId:item?.id});
                      }}>
                      <ImageBackground
                        style={styles.imageBackground}
                        source={{uri: `${item?.image}`}}>
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
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              style={{marginLeft: 10, height: 15, width: 15}}
                              source={images.gallaryicon}
                            />
                            <Text
                              style={[
                                styles.titleTxt,
                                {marginLeft: 10, color: '#fff'},
                              ]}>
                              {item?.image_count} Photos
                            </Text>
                            <Image
                              style={{marginLeft: 10, height: 15, width: 15}}
                              source={images.gallaryvideoicon}
                            />
                            <Text
                              style={[
                                styles.titleTxt,
                                {marginLeft: 10, color: '#fff'},
                              ]}>
                              {item?.video_count} Videos
                            </Text>
                          </View>
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
                              <View style={{width: '53%',justifyContent:'center'}}>
                                <Text numberOfLines={2}
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    fontWeight: '700',
                                    fontSize: 16,
                                    lineHeight:20
                                  }}>
                                  {item?.tour_name}
                                </Text>
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    fontWeight: '400',
                                    fontSize: 12,
                                    lineHeight: 20,
                                  }}>
                                  {item?.title}
                                </Text>
                              </View>

                              <LinearGradient
                                style={{
                                  width:160,
                                  height:30,
                                  borderRadius: 5,
                                  paddingHorizontal: 10,
                                  paddingVertical: 5,
                                  position: 'absolute',
                                  right: 0,
                                  top: 0,
                                  // flex: 1,
                                }}
                                colors={[
                                  'rgba(76, 186, 8, 0.66)',
                                  'rgba(76, 186, 8, 0.66)',
                                ]}>
                                <Text
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: '#fff',
                                    fontWeight: '700',
                                    fontSize: 14,
                                    alignSelf: 'center',
                                  }}>
                                  Purchase at ${item?.price}
                                </Text>
                              </LinearGradient>
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
        </>
      ) : (
        <View style={{marginTop: 40}}>
          <View style={{height: 350, width: 350, alignSelf: 'center'}}>
            <Image
              resizeMode="stretch"
              source={require('../../assets/images/largeimages/photoboothwithloginicon.png')}
              style={{height: '100%', width: '100%', alignSelf: 'center'}}
            />
          </View>
          <Text
            style={{
              color: '#000',
              alignSelf: 'center',
              marginTop: 45,
              fontSize: 20,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            To access photo booth you need a account.
          </Text>
          <CustomButton
            borderColor={'#83CDFD'}
            title={'Login / Signup'}
            onPress={() => {
              AsyncStorage.clear();
              dispatch(onLogoutUser());
            }}
            backgroundColor={COLORS.Primary_Blue}
          />
        </View>
      )}
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

export default PhotoBoothScreen;

const styles = StyleSheet.create({
  hrcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 2,
  },
  titleTxt: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FONTS.regular,
    marginLeft: 2,
    color: '#8F93A0',
  },
  calCantainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
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
    height: 300,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 20,
    overflow:'hidden'
  },
  imageBackground: {
    width: '100%',
    height: 300,
    resizeMode: 'stretch',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    borderRadius: 20,
  },
});
