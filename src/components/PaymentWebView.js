//import : react components
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
//import : custom components
import CustomHeader from '../components/CustomeHeader';
//third parties
import {WebView} from 'react-native-webview';
//global
import { requestGetApi } from '../WebApi/Service';
//redux
import {connect} from 'react-redux';
import {CartAction, CustomToastAction} from '../../redux/actions/actions';
 
import Loader from '../WebApi/Loader';
import MyAlert from '../components/MyAlert';


const PaymentWebView = (props) => {
    const [My_Alert, setMy_Alert] = useState(false);
    const [alert_sms, setalert_sms] = useState('');
      const [loading, setLoading] = useState(false);
  //variables : route variables
  const PaymentUrl = props.route.params.url;
  //function : navigation function
  const gotoDownloadInvoice = orderId =>
  props.navigation.replace(ScreensName.DOWNLOAD_INVOICE, {orderId: orderId});
  const gotoCart = () => props.navigation.replace('HomeStack');
  //function : imp function
  const onNavigationStateChange = webViewState => {
    const isSuccessful = webViewState?.url.includes('successful');
    const isCanceled = webViewState?.url.includes('cancel');
    if (isSuccessful) {
      const isFailed = webViewState?.url.includes('false');
      if (!isFailed) {
        if (props.route?.params?.type == 'photobooth') {
        //   dispatch(CartAction.addInToCart(0));
        }
        setalert_sms('Payment completed successfully');
        setMy_Alert(true);
        getOrderId(webViewState?.url);
      } else {
        setalert_sms('Something went wrong');
        setMy_Alert(true);
    }
    } else if (isCanceled) {
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
  const getOrderId = async (url) => {
    setLoading(true);
    const {responseJson, err} = await requestGetApi(url, '', 'GET', '');
    setLoading(false);
    // console.log('the getprofile==>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        // gotoDownloadInvoice(resp.data.order_number);
      } else {
        setalert_sms("error in getOrderId false status",responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms("error in getOrderId",err);
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
    <View style={{flex:1}}>
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
          return <Loader />;
        }}
      />
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