//import : react components
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Text,
} from 'react-native';
//import : custom components
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {MaterialIcons} from '../../global/MyIcons';
import CustomButton from '../../components/CustomButton/CustomButton';
import COLORS from '../../global/Colors';
//import : styles
import {styles} from './PurschaseStyle';
//import : redux
 
import {useSelector, useDispatch} from 'react-redux';
import CustomHeader from '../../components/CustomeHeader';
import {payment, requestPostApi} from '../../WebApi/Service';

const PurchaseReview = (props) => {
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const {shipping} = props.route?.params;
  const paymentMethods = [
    {
      id: 1,
      name: 'PayPal',
      image_url: require('../../assets/images/Icons/paypal.png'),
    },
   
  ];
  // console.log(user?.userid);
  // {
  //   id:2,
  //   name:'Venmo',
  //   image_url: require('../../assets/images/Icons/paypal.png'),
  // }
  //variables : redux variables
  const dispatch = useDispatch();
  //hook : states

  const [orderInfoData, setOrderInfoData] = useState({});
  const [showCouponLoader, setshowCouponLoader] = useState(false);
  const [selectedPaymentType, setselectedPaymentType] = useState('');
  const [couponCode, setcouponCode] = useState('');
  const [isWalletSelected, setIsWalletSelected] = useState(true);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [enoughAmountInWallet, setEnoughAmountInWallet] = useState(false);
  const [cartData, setCartData] = useState([]);
  //function : navigation function

  const gotoPaymentWebView = url => 
  props?.navigation.navigate('PaymentWebView', {
    url: url,
    type: props.route.params.type,
    bookingdata: props.route.params
  });
  // const gotoDownloadInvoice = orderId =>
  //   props?.navigation.replace(ScreensName.DOWNLOAD_INVOICE, {orderId: orderId});

  //function : imp function
  const clearState = () => {
    setcouponCode('');
  };
  const validation = () => {
    if (selectedPaymentType == '') {
      setalert_sms('Please select payment method!');
      setMy_Alert(true);
    } else return true;
  };
  //function : service function
  // const getOrderInfo = async () => {
  //   setLoading(true);
  // try {
  //   const paramsData = {
  //     type: props.route?.params?.type,
  //     session_id: sessionId,
  //     user_id: Object.keys(userInfo).length > 0 ? userInfo.id : '',
  //   };
  //   const {response, status} = await Server.getAPI(
  //     Server.GET_CHECKOUT_ADDRESS,
  //     userToken,
  //     paramsData,
  //   );
  //   if (status) {
  //     const formattedData = [];
  //     const cartData = response.local_cart_list;
  //     for (const vendorId in cartData) {
  //       const data = {
  //         vendor_id: vendorId,
  //         data: cartData[vendorId],
  //       };
  //       formattedData.push(data);
  //     }
  //     setCartData(formattedData);
  //     response?.cart_list?.map(item => {
  //       if (item.isCouponApplied) {
  //         setIsCouponApplied(true);
  //       }
  //     });
  //     setOrderInfoData(response);
  //     if (response.wallet >= response?.order_summary?.total) {
  //       setEnoughAmountInWallet(true);
  //     }
  //     if (response.wallet == 0) {
  //       setIsWalletSelected(false);
  //     }
  //   }
  // } catch (error) {
  //   console.error('error in getOrderInfo', error);
  // }
  //   setLoading(false);
  // };
  // const applyOfferCode = async () => {
  //   if (couponCode != '') {
  //     setshowCouponLoader(true);
  //     try {
  //       const data = {
  //         coupon: couponCode,
  //         type: props.route?.params?.type,
  //         session_id: sessionId,
  //         user_id: Object.keys(userInfo).length > 0 ? userInfo.id : '',
  //       };
  //       const {status, response} = await Server.postAPI(
  //         Server.APPLY_OFFER,
  //         data,
  //         userToken,
  //       );
  //       if (status) {
  //         setalert_sms('Coupon applied successfully');
  //         setMy_Alert(true);

  //         getOrderInfo();
  //         clearState();
  //       } else {
  //         setalert_sms(response?.msg);
  //         setMy_Alert(true);
  //       }
  //     } catch (error) {
  //       console.error('error in applyOfferCode', error);
  //     }
  //     setshowCouponLoader(false);
  //   } else {
  //     setalert_sms('Please enter coupon code');
  //     setMy_Alert(true);
  //   }
  // };
  // const placeOrder = async () => {
  //   if (validation()) {
  //     setLoading(true);
  //     try {
  //       const postData = {
  //         type: props.route?.params?.type,
  //         session_id: sessionId,
  //         user_id: Object.keys(userInfo).length > 0 ? userInfo.id : '',
  //       };
  //       var endPoint = `${Server.POST_PAYMENT_METHOD}`;
  //       if (isWalletSelected && selectedPaymentType != '') {
  //         endPoint += 'both';
  //       } else if (isWalletSelected) {
  //         endPoint += 'wallet';
  //       } else if (selectedPaymentType != '') {
  //         endPoint += 'paypal';
  //       }
  //       const {response, status} = await Server.postAPI(
  //         endPoint,
  //         postData,
  //         userToken,
  //       );
  //       if (response.status) {
  //         if (response?.url) {
  //           gotoPaymentWebView(response.url);
  //         } else {
  //           gotoDownloadInvoice(response.order_number);
  //         }
  //       } else {
  //         setalert_sms(response.msg);
  //         setMy_Alert(true);
  //       }
  //     } catch (error) {
  //       console.error('error in placeOrder', error);
  //     }
  //     setLoading(false);
  //   }
  // };
  const placeOrder = async () => {
    if (validation()) {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('user_id', user?.userid);
      formdata.append('amount', props?.route?.params?.amount);
      console.log("formdata in purchase",formdata);
      const {responseJson, err} = await requestPostApi(payment, formdata, 'POST', '');

      console.log('the res_payment=>>', responseJson);
      if (err == null) {
        if (responseJson.status == true) {
          gotoPaymentWebView(responseJson.data);
        } else {
          setalert_sms(responseJson.message);
          setMy_Alert(true);
        }
      } else {
        setalert_sms(err);
        setMy_Alert(true);
      }
      setLoading(false);
    }
  };
  // const removeCoupon = async item => {
  //   try {
  //     const data = {
  //       slug: props.route?.params?.type == 'buy_now' ? 0 : item.slug,
  //       type: props.route?.params?.type,
  //       session_id: sessionId,
  //       user_id: Object.keys(userInfo).length > 0 ? userInfo.id : '',
  //     };
  //     const {response, status} = await Server.postAPI(
  //       Server.DELETE_OFFER,
  //       data,
  //       userToken,
  //     );
  //     if (status) {
  //       setalert_sms('Coupon removed successfully');
  //       setMy_Alert(true);

  //       getOrderInfo();
  //     }
  //   } catch (error) {
  //     console.error('error in removeCoupon', error);
  //   }
  // };
  //hook : useEffect
  useEffect(() => {
    // getOrderInfo();
  }, []);
  //UI
  return (
    <View style={styles.container}>
      <CustomHeader
        title={'Payment'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <>
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            marginTop: 10,
          }}>
          {paymentMethods.length > 0
            ? paymentMethods.map((item, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    if (selectedPaymentType == '') {
                      setselectedPaymentType(item.id);
                    } else {
                      setselectedPaymentType('');
                    }
                  }}
                  style={styles.paymentMethodsView}>
                  <MaterialIcons
                    name={
                      selectedPaymentType == item.id
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={22}
                    color={'#000'}
                  />
                  <Image
                    resizeMode="contain"
                    source={item.image_url}
                    style={{height: '100%', width: '20%'}}
                  />
                  <Text style={{marginHorizontal: 5, color: 'black'}}>
                    {item.name}
                  </Text>
                  {selectedPaymentType == item.id ? (
                    <TouchableOpacity
                      style={{position: 'absolute', right: 10}}
                      onPress={() => setselectedPaymentType('')}>
                      <Text style={{color: 'red'}}>Reset</Text>
                    </TouchableOpacity>
                  ) : null}
                </TouchableOpacity>
              ))
            : null}
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <CustomButton
            title={'Pay'}
            borderColor={'#83CDFD'}
            onPress={() => {
              placeOrder();
            }}
            backgroundColor={COLORS.Primary_Blue}
          />
        </View>
        <View style={{height: 30}} />
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
    </View>
  );
};
export default PurchaseReview;
