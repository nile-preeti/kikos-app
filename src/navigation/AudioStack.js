// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import Audio from '../screens/Audio/Audio'
import ConfirmedTourScreen from '../screens/Audio/ConfirmedTourScreen';
import AudioDetails from '../screens/Audio/AudioDetaiils';
import ProfileStack from './ProfileStack';
import {createStackNavigator} from '@react-navigation/stack';
import PaymentWebView from '../components/PaymentWebView';
import PurchaseReview from '../screens/Purchase/Purchase';
 
const Stack = createStackNavigator();
const config = {
  animation: 'bounce',
  config: {
    stiffness: 2000,
    damping: 500,
    mass: 10,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
    direction: 'vertical',
  },
};
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
function AudioStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,cardStyleInterpolator: forFade}}>
      <Stack.Screen name="Audio" component={Audio}  options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }
          }
        }}  />
      <Stack.Screen name="ConfirmedTourScreen" component={ConfirmedTourScreen}  options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }
          }
        }}  />
      <Stack.Screen name="AudioDetails" component={AudioDetails}  options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }
          }
        }}  />
      <Stack.Screen name="Profile" component={ProfileStack}   options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }
          }
        }} />
      <Stack.Screen name='PurchaseReview' component={PurchaseReview}  options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }
          }
        }}  />
     <Stack.Screen name='PaymentWebView' component={PaymentWebView}  options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: closeConfig
          },
          gestureEnabled: true,
          gestureDirection: 'vertical',
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }
          }
        }}  />
    </Stack.Navigator>
  );
}

export default AudioStack;
