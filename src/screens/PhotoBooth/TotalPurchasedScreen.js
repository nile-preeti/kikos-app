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
  import React, {useState,useEffect} from 'react';
  import CustomHeader from '../../components/CustomeHeader';
  import CustomheaderCard1 from '../../components/CustomheaderCard1';
  import images from '../../global/images';
  import {FONTS} from '../../global/Utils';
  import {dimensions} from '../../utility/Mycolors';
  import COLORS from '../../global/Colors';
  import CustomButton from '../../components/CustomButton/CustomButton';
  import {useSelector, useDispatch} from 'react-redux';
  import {onLogoutUser} from '../../redux/actions/user_action';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {Photo_BoothPurchase_Listing, home, photo_booth_listing, requestGetApi, requestPostApi} from '../../WebApi/Service';
  
  const TotalPurchasedScreen = props => {
    const user = useSelector(state => state.user.user_details);
    const dispatch = useDispatch();
    const [My_Alert, setMy_Alert] = useState(false);
    const [alert_sms, setalert_sms] = useState('');
    const [loading, setLoading] = useState(false);
    const [DATA2, setDATA] = useState([]);
    const[counts,SetCounts]=useState('');
    useEffect(() => {
      GetPhotoBooth();
    }, []);

    const GetPhotoBooth = async () => {
      setLoading(true);
      const {responseJson, err} = await requestGetApi(Photo_BoothPurchase_Listing, '', 'GET', user.token);
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
       <CustomHeader
            title={'Book A Tour'}
            onBackPress={() => {
              props.navigation.goBack();
            }}
          />
        <ScrollView>
        <View style={{justifyContent:'center',alignItems:'center', flex:1}}>
            <View style={{justifyContent:'center',alignItems:'center',marginTop: 78,}}>
              <CustomheaderCard1
                title={'Total purchased'}
                
                imageUrl={images.frame}
                middleView={
                  <View style={styles.hrcontainer}>
                    <Image style={{height: 15, width: 15, tintColor: '#CECECE'}} source={images.gallaryicon} />
                    <Text style={styles.titleTxt}>{counts?.total_purchase_image} Photos</Text>
                    <Image style={{height:15,width:15,marginLeft:5,tintColor: '#CECECE'}} source={images.gallaryvideoicon} />
                    <Text style={styles.titleTxt}>{counts?.total_purchase_video} Photos</Text>
                  </View>
                }
              />
            </View>
  
            <View style={styles.calCantainer}>
              <View style={styles.container}>
                <Text style={styles.dateText}>13 October 2023</Text>
                <Image style={styles.calendar} source={images.calendar} />
              </View>
               
            </View>
            <View style={{marginTop: 20, flex: 1,alignSelf:'center'}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={DATA2}
                renderItem={({item, index}) => {
                  return (
                    <>
                       <TouchableOpacity
                      style={styles.touchableOpacity}
                      onPress={() => {
                        
                      }}>
                      <ImageBackground
                        style={styles.imageBackground}
                        // source={{uri :"http://100.21.178.252/public/upload/photo-booth/IMG_20240118_073235_6515.jpg"}}
                        source={{uri: `${item?.image}`}}
                        >
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
                                  {item?.title}
                                </Text>
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: '#FFFFFF',
                                    fontWeight: '400',
                                    fontSize: 12,
                                    lineHeight: 20,
                                  }}> 09:10 am
                                  {/* {item?.title} */}
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
          </View>
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
  
  export default TotalPurchasedScreen;
  
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
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      width: '97%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      height: 50,
      width:'95%',
      marginHorizontal:10,
      backgroundColor: '#FFFFFF',
    //   flex: 1,
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
  