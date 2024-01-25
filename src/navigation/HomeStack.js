// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {Easing} from 'react-native-reanimated';
import HomeScreen from '../screens/Home/HomeScreen';
import BookDetails from '../screens/Home/BookDetails';
import BookDetailScreen from '../screens/Home/BookDetailScreen'
import BookAnTour from '../screens/Home/BookAnTour';
import ReviewBooking from '../screens/Home/ReviewBooking';
import RequestAFreeCallback from '../screens/Home/RequestAFreeCallback';
 
import ProfileStack from './ProfileStack';
import ContactUs from '../screens/ContactUs/ContactUs';
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

const HomeStack=()=> {
  return (
    <Stack.Navigator screenOptions={{headerShown: false , cardStyleInterpolator: forFade,}} >
       <Stack.Screen name="HomeScreen" component={HomeScreen}  
       options={{
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
      <Stack.Screen name="BookDetails" component={BookDetails}  options={{
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
      <Stack.Screen name="RequestAFreeCallback" component={RequestAFreeCallback}  options={{
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
     <Stack.Screen name="BookDetailScreen" component={BookDetailScreen}  options={{
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
     <Stack.Screen name="BookAnTour" component={BookAnTour}  options={{
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
     <Stack.Screen name="ReviewBooking" component={ReviewBooking}  options={{
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
        }} />
     <Stack.Screen name="ContactUs" component={ContactUs}  options={{
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

    </Stack.Navigator>
  );
};

export default HomeStack;
