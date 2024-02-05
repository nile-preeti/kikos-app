//import : react components
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
//import : custom components
import CustomHeader from '../components/CustomeHeader';
//third parties
import {WebView} from 'react-native-webview';
//global
import {booking_tour, requestGetApi, requestPostApi} from '../WebApi/Service';
//redux
import CustomButton from '../components/CustomButton/CustomButton';
// import CustomButtonRound from '../components/CustomButton/CustomButtonRound';
import {dimensions} from '../utility/Mycolors';
import {connect} from 'react-redux';
import {CartAction, CustomToastAction} from '../../redux/actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../WebApi/Loader';
import MyAlert from '../components/MyAlert';
import images from '../global/images';
import COLORS from '../global/Colors';


const PaymentWebView = props => {
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [tourdetails, setTourDetail] = useState(
    props?.route?.params?.bookingdata?.TourData,
  );
  const [popup, setpopup] = useState(false);
  const [popupsuccess, setpopupsuccess] = useState(false);
  const[orderID,setOrderID]=useState('123321');
  //variables : route variables
  const PaymentUrl = props.route.params.url;
  //function : navigation function
  // const gotoDownloadInvoice = orderId =>
  // props.navigation.replace(ScreensName.DOWNLOAD_INVOICE, {orderId: orderId});
  const gotoCart = () => props.navigation.replace('HomeStack');
  //function : imp function
  const onNavigationStateChange = webViewState => {
    const isSuccessful = webViewState?.url.includes('success');
    const isCanceled = webViewState?.url.includes('cancel');
    console.log(
      props.route?.params?.type,
      'webViewState...',
      webViewState ,
    );
    if (isSuccessful) {
      const isFailed = webViewState?.url.includes('false');
      if (!isFailed) {
        if (props.route?.params?.type == 'photobooth') {
          setpopupsuccess(true);
          // getOrderId(webViewState?.url)
          
          // setalert_sms('Payment completed successfully photo booth');
          // setMy_Alert(true);
        } else if (props.route?.params?.type == 'reviewbooking') {
          // console.log("BookTourApi.........",props?.route?.params?.bookingdata);
          BookTourApi(props?.route?.params?.bookingdata?.bookid);
        } else if (props.route?.params?.type == 'Audiopurchase') {
          setpopupsuccess(true);
          // getOrderId(webViewState?.url)
          // setalert_sms('Payment completed successfully from virtual tour');
          // setMy_Alert(true);
        }
        console.log('Payment completed successfully');
        // setalert_sms('Payment completed successfully');
        // setMy_Alert(true);
        // getOrderId(webViewState?.url);
      } else {
        console.log('Something went wrong');
        setalert_sms('Something went wrong');
        setMy_Alert(true);
      }
    } else if (isCanceled) {
      console.log('You have cancelled your payment process');
      setalert_sms('You have cancelled your payment process');
      setMy_Alert(true);
      gotoCart();
    }
  };
  //   const getOrderId = async url => {
  //     try {
  //       const resp = await axios.get(url);
  //       dispatch(CartAction.setToCart([]));
  //       gotoDownloadInvoice(resp.data.order_number);
  //     } catch (error) {
  //       console.error('error in getOrderId', error);
  //     }
  //   };
  // const getOrderId = async (url) => {
  //   setLoading(true);
  //   const {responseJson, err} = await requestGetApi(url, '', 'GET', '');
   
  //   console.log('the getOrderId==>>', responseJson);
  //   if (err == null) {
  //     if (responseJson.status == true) {
  //       setOrderID(responseJson?.PayerID)
  //       // gotoDownloadInvoice(resp.data.order_number);
  //     } else {
  //       setalert_sms("error in getOrderId false status",responseJson.message);
  //       setMy_Alert(true);
  //     }
  //   } else {
  //     setalert_sms("error in getOrderId",err);
  //     setMy_Alert(true);
  //   }
  //   setLoading(false);
  // };
  const BookTourApi = async id => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('tour_id', id);
    formdata.append('tour_type', '1'); /*1-Normal Tour, 2:Virtual tour */
    formdata.append(
      'booking_date',
      props?.route?.params?.bookingdata?.selectdate,
    );
    formdata.append('no_adults', props?.route?.params?.bookingdata?.no_adult);
    formdata.append(
      'no_senior_citizen',
      props?.route?.params?.bookingdata?.no_senior_citizen,
    );
    formdata.append(
      'no_childerns',
      props?.route?.params?.bookingdata?.no_childerns,
    );
    formdata.append(
      'adults_amount',
      props?.route?.params?.bookingdata?.adults_amount,
    );
    formdata.append(
      'senior_amount',
      props?.route?.params?.bookingdata?.senior_amount,
    );
    formdata.append(
      'childrens_amount',
      props?.route?.params?.bookingdata?.childrens_amount,
    );
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

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
`;
  const onMessage = async payload => {
    console.log('onMessage', payload);
    let dataPayload;
    try {
      dataPayload = JSON.parse(payload.nativeEvent.data);
    } catch (e) {}

    if (dataPayload) {
      if (dataPayload.type === 'Console') {
        console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
      } else {
      }
    }
  };
  //UI
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={'Payment'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <WebView
        startInLoadingState={true}
        source={{uri: PaymentUrl}}
        javaScriptEnabled={true}
        onNavigationStateChange={onNavigationStateChange}
        injectedJavaScript={debugging}
        onMessage={onMessage}
        renderLoading={() => {
          return loading ? <Loader /> : null;
        }}
      />
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
            <View
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 40,
              }}>
              <Text
                numberOfLines={3}
                style={{
                  color: '#000',

                  marginTop: 20,
                  fontSize: 20,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Your booking for {tourdetails?.title} is successfully submitted
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
                textAlign: 'center',
                marginTop: 10,
                fontSize: 13,
                fontWeight: '400',
              }}>
              Allow me and my team, to take you on a private tour of your life,
              while visiting beautiful O’ahu.
            </Text>

            <CustomButton
              title={'Close'}
              borderColor={'#83CDFD'}
              onPress={() => {
                props.navigation.navigate('HomeStack', {
                  screen: 'MyTour',
                  params: {},
                });
              
                setpopup(false);
              }}
              backgroundColor={COLORS.Primary_Blue}
            />
          </View>
        </View>
      ) : null}
      {popupsuccess ? (
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
            <View
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 40,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#000',

                  marginTop: 20,
                  fontSize: 20,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Purchased Successful
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
              Order Id : {orderID}
            </Text>

            <CustomButton
              title={'Close'}
              borderColor={'#83CDFD'}
              onPress={() => {
                props.navigation.navigate('HomeStack', {
                  screen: 'MyTour',
                  params: {},
                });
                setpopupsuccess(false);
              }}
              backgroundColor={COLORS.Primary_Blue}
            />
          </View>
        </View>
      ) : null}
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {/* {loading ? <Loader /> : null} */}
    </View>
  );
};

export default PaymentWebView;
