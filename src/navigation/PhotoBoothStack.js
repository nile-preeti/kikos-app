// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {Easing} from 'react-native-reanimated';
import PhotoBothScreen from '../screens/PhotoBooth/PhotoBoothScreen'
import TotalPurchasedScreen from '../screens/PhotoBooth/TotalPurchasedScreen';
import PhotoBoothPurchased from '../screens/PhotoBooth/PhotoBoothPurchased';
import ProfileStack from './ProfileStack';
import {createStackNavigator} from '@react-navigation/stack';
 
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

function PhotoBoothStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyleInterpolator: forFade}}>        
      <Stack.Screen name="PhotoBothScreen" component={PhotoBothScreen}  options={{
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
      <Stack.Screen name='TotalPurchasedScreen' component={TotalPurchasedScreen}  options={{
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
      <Stack.Screen name='PhotoBoothPurchased' component={PhotoBoothPurchased}  options={{
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
      <Stack.Screen name="Profile" component={ProfileStack}  options={{
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

export default PhotoBoothStack;
