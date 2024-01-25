import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home/HomeScreen';
import Profile from '../../screens/Profile/Profile';
import {Easing} from 'react-native-reanimated';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HomeStack from '../HomeStack';
import BookTourStack from '../BookTourStack';
import PhotoBoothStack from '../PhotoBoothStack';
import BookTaxiStack from '../BookTaxiStack';
import AudioStack from '../AudioStack';
import COLORS from '../../global/Colors';
function BottomTabs({
  state,
  descriptors,
  navigation,
}: {
  state: any,
  descriptors: any,
  navigation: any,
}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map(
        (route: {key: string | number, name: any}, index: any) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.reset({
                index: 0,
                routes: [{name: route.name}],
              });
              //navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabButtonContainer,
                isFocused ? styles.tabActive : null,
              ]}>
              {label === 'HomeStack' ? (
                <View
                  style={
                    isFocused
                      ? {
                          width: 60,
                          height: 60,
                          backgroundColor: 'transparent',
                          padding: 10,
                          justifyContent: 'center',
                          borderRadius: 7,
                        }
                      : {}
                  }>
                  <Image
                    style={[styles.tabIcon]}
                    resizeMode="stretch"
                    tintColor={isFocused ? COLORS.Primary_Blue : '#000'}
                    source={require('../../assets/images/Icons/home.png')}
                  />
                  <Text
                    style={
                      isFocused ? styles.iconText : styles.iconTextDisable
                    }>
                    Home
                  </Text>
                </View>
              ) : label === 'BookTourStack' ? (
                <View
                  style={
                    isFocused
                      ? {
                          width: 70,
                          height: 70,
                          backgroundColor: 'transparent',
                          padding: 1,
                          justifyContent: 'center',
                          borderRadius: 7,
                        }
                      : {}
                  }>
                  <Image
                    style={styles.tabIcon}
                    tintColor={isFocused ? COLORS.Primary_Blue : '#000'}
                    resizeMode="stretch"
                    source={require('../../assets/images/Icons/calendarb.png')}
                  />
                  <Text
                    style={
                      isFocused ? styles.iconText : styles.iconTextDisable
                    }>
                    Book Tour
                  </Text>
                </View>
              ) : label === 'AudioStack' ? (
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    borderRadius: 30,
                    top: -25,
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    resizeMode="stretch"
                    // tintColor={COLORS.Primary_Blue}
                    source={require('../../assets/images/Icons/Container.png')}
                  />
                  {/* <Text
                    style={
                    isFocused ? styles.iconText : styles.iconTextDisable
                    }>
                    Audio
                  </Text> */}
                </View>
              ) : label === 'PhotoBoothStack' ? (
                <View
                  style={
                    isFocused
                      ? {
                          width: 100,
                          height: 60,
                          backgroundColor: 'transparent',
                          padding: 10,
                          justifyContent: 'center',
                          borderRadius: 7,
                        }
                      : {}
                  }>
                  <Image
                    style={styles.tabIcon}
                    resizeMode="stretch"
                    tintColor={isFocused ? COLORS.Primary_Blue : '#000'}
                    source={require('../../assets/images/Icons/gallery_tick.png')}
                  />
                  <Text numberOfLines={1}
                    style={
                      isFocused ? styles.iconText : styles.iconTextDisable
                    }>
                    Photo Booth
                  </Text>
                </View>
              ) : (
                <View
                  style={
                    isFocused
                      ? {
                        width: 100,
                          height: 60,
                          backgroundColor: 'transparent',
                          padding: 10,
                          justifyContent: 'center',
                          borderRadius: 7,
                        }
                      : {}
                  }>
                  <Image
                    style={styles.tabIcon}
                    resizeMode="stretch"
                    tintColor={isFocused ? COLORS.Primary_Blue : '#000'}
                    source={require('../../assets/images/Icons/car.png')}
                  />
                  <Text
                    style={
                      isFocused ? styles.iconText : styles.iconTextDisable
                    }>
                    Book Taxi
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
}
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName={'HomeStack'}
    tabBar={(
      props: JSX.IntrinsicAttributes & {
        state: any,
        descriptors: any,
        navigation: any,
      },
    ) => <BottomTabs {...props} />}>
    <Tab.Screen
      name="HomeStack"
      options={{headerShown: false}}
      component={HomeStack}
    />
    <Tab.Screen
      name="BookTourStack"
      options={{headerShown: false}}
      component={BookTourStack}
    />
    <Tab.Screen
      name="AudioStack"
      options={{headerShown: false}}
      component={AudioStack}
    />
    <Tab.Screen
      name="PhotoBoothStack"
      options={{headerShown: false}}
      component={PhotoBoothStack}
    />
    <Tab.Screen
      name="BookTaxiStack"
      options={{headerShown: false}}
      component={BookTaxiStack}
    />
  </Tab.Navigator>
);

export default TabNavigator;
const styles = StyleSheet.create({
  tabButtonContainer: {
    flex: 1,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    height: 22,
    width: 22,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 24,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 90,
  },
  tabActive: {
    // borderBottomWidth: 3,
    borderRadius: 10,
    // borderBottomColor: 'transparent',
    // backgroundColor:'green',
    // height:70,top:10
  },
  image: {height: '100%', width: '100%'},
  iconText: {
    
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.Primary_Blue,
    textAlign: 'center',
    top: 3,
  },
  iconTextDisable: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    top: 3,
  },
});
