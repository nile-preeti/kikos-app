import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Mycolors, dimensions} from '../utility/Mycolors';
import COLORS from '../global/Colors';
import DrawerPic from '../navigation/Drawer/DrawerPic';
import {FONTS, FONTS_SIZE, widthScale} from '../global/Utils';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import GetLocation from 'react-native-get-location';

const HomeHeaderComponent = (props) => {
  const dispatch = useDispatch();
  const [lat, setlat] = useState('28.6176')
  const [lan, setlan] = useState('77.422')
  const user = useSelector(state => state.user.user_details);
  useEffect(() => {
    // console.log('============USER status check========================');
    // console.log(user);
    // console.log('====================================');
    // GetLocation.getCurrentPosition({
    //   enableHighAccuracy: true,
    //   timeout: 15000,
    // }) 
    //   .then(location => {
    //     console.log('locations latitude longitude', location);
    //     setlat(location.latitude)
    //     setlan(location.longitude) 
    //     // let My_cord = { latitude: '28.5355', longitude: '77.3910' }
    //    // let My_cord = { latitude: location.latitude, longitude: location.longitude }
    //     // dispatch(setRestorentLocation(My_cord))
    //     //  homePage(location.latitude,location.longitude) 
    //     // homePage('28.5355','77.3910') 
        
    //   })  
    //   .catch(error => {
    //     const { code, message } = error;
    //     console.warn("Location CATCH",code, message);
    //   })
   
    
  }, [])

   
  const Languagefun = () => {
  const now = new Date();
  const hour = now.getHours();
  console.log('lang CHECK', hour);
  if (hour >= 6 && hour < 10) {
    return "ALOHA KAKAHIAKA";
  } else if (hour >= 10 && hour < 14) {
    return "ALOHA AWAKEA";
  } 
  else if (hour >= 14 && hour < 18) {
    return "ALOHA `AHIAHI";
  }
  else if (hour >= 18 && hour < 22) {
    return "ALOHA AHIAHI";
  }
  else {
    return "ALOHA AHIAHI";
  }
};

  return (
    <View style={[styles.container,{...props.stylecontainer}]}>
      <View
        style={[
          styles.subContainer,
          {justifyContent: 'space-evenly', alignSelf: 'center', width: '97%'},
        ]}>
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={props.press1 ? props.press1 : () => {}}>
            <Image
              source={
                props.icon1
                  ? props.icon1
                  : require('../assets/images/Icons/hback.png')
              }
              style={{
                height: 30,
                width: 30,
                resizeMode: 'stretch',
                tintColor: 'white',
              }}/>
          </TouchableOpacity>
         
          <DrawerPic />
          <View style={{marginLeft: 8,width:'72%'}}>
            
            <View style={{flexDirection:'row',width:'100%'}}>
               
            <Text numberOfLines={1}
              style={[
                styles.headerText,
                {fontSize: 17, fontWeight: '400', marginTop: 0},
              ]}> 
              {/* 300 C,  */}
              {Languagefun()}
            </Text>
            </View>
            <Text style={styles.headerText}>
               {moment().format('hh:mm a')}, {moment().format('dddd')}, {moment().format('ll')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.Btn}
          onPress={props.press2 ? props.press2 : () => {}}>
          <Image
            source={require('../assets/images/Icons/notification_white.png')}
            style={{height: 30, width: 30, resizeMode: 'stretch'}}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Primary_Blue,
    height: widthScale(120),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    padding: widthScale(15),
  },
  subContainer: {
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    // gap: widthScale(15),
  },
  headerText: {
    fontSize: 12,
    fontWeight:'400',
    lineHeight:20,
    color: COLORS.light_white,
    fontFamily: FONTS.alloyInk,
  },
  Btn: {
    // backgroundColor: COLORS.Primary_Green,
    width: widthScale(40),
    height: widthScale(25),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',

    // marginRight: 10,
  },
  BtnTxt: {
    color: COLORS.light_white,
    fontSize: FONTS_SIZE.h3,
    fontWeight: '600',
    fontFamily: FONTS.regular,
  },
});

export default HomeHeaderComponent;
