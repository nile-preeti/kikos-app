// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import DrawerNavigator from './src/navigation/Drawer/Drawer';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Splash from './src/screens/Splash/Splash';
// import AuthRoute from './src/navigation/AuthRoute';
// import {StatusBar} from 'react-native';

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <>
//       <StatusBar barStyle={'light-content'} backgroundColor={"#94a5b9"} />
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{headerShown: false}}>
//           <Stack.Screen name="Splash" component={Splash} />
//           <Stack.Screen name="AuthRoute" component={AuthRoute} />
//           <Stack.Screen name="Home" component={DrawerNavigator} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// }

// export default App;

import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { NotificationManagerAndroid } from './NotificationManagerAndroid';
import { NotificationManagerIOS } from './NotificationManagerIOS';
import store from './src/redux/store/store';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
 import React, { useEffect } from 'react';
 import {SafeAreaView,LogBox,StatusBar,Platform,useColorScheme,View, Linking,} from 'react-native';
 
//  import firebase from '@react-native-firebase/app';
//  import PushNotification from 'react-native-push-notification'
//  import PushNotificationIOS from '@react-native-community/push-notification-ios'
import MainNav from './src/navigation/MainNav'

const App = () => {
  LogBox.ignoreAllLogs()
  
   useEffect(() => {

          NotificationManagerAndroid.createChannel();
          NotificationManagerAndroid.configure();
      try {
        if(Platform.OS=='android'){
          requestUserPermission();
        }else{
          requestUserPermissionIos();
        }
        // PushNotificationIOS.getApplicationIconBadgeNumber(num => {
        //  console.log('the bedge number is===',num)
        // });
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          JSON.stringify(remoteMessage.data);
          const { messageId } = remoteMessage;
          const data = remoteMessage.notification
          if (Platform.OS === 'android') {
            //  PlayRing(false)
            NotificationManagerAndroid.showNotification(data.title, data.body, data.subText, messageId, data);
          } 
          else {
             NotificationManagerIOS.showNotification(2, data.title, data.body, data, {})
          }
        });
        return unsubscribe;
      } catch (error) {
        console.log(error.message);
      }
      
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        const { data, messageId } = remoteMessage;
        const { Title, notificationText, subText } = data;
         PlayRing(false)
        if (Platform.OS === 'android') {
        
          NotificationManagerAndroid.showNotification(Title, notificationText, subText, messageId);
        } 
        else {
          NotificationManagerIOS.showNotification(messageId, Title, notificationText, data, {})

          // PushNotification.getApplicationIconBadgeNumber(badgeNumber => {
          //   PushNotificationIOS.setApplicationIconBadgeNumber(badgeNumber + 1)
          // })
         
        }
      });
     
    }, []);


    async function requestUserPermission() {
      const authorizationStatus = await messaging().requestPermission({
        sound: false,
        announcement: true,
      });
    }
  
    async function requestUserPermissionIos() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
      }
    const gettoken = () => {
        messaging().getToken().then((token) => {
        
          console.log('Device token is:==>>',token)
       });
        };


  return (
    <Provider store={store}>
      <>
      <StatusBar barStyle={'light-content'} backgroundColor={"#94a5b9"} />
       
            <NavigationContainer>
            <MainNav/>
            </NavigationContainer>
    
   </>
  </Provider>
  );
};

export default App;







