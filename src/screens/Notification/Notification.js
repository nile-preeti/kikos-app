import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import React from 'react';
import MyHeader from '../../components/MyHeader';

import COLORS from '../../global/Colors';
import {FONTS, FONTS_SIZE, widthScale} from '../../global/Utils';
import images from '../../global/images';
const Notification = (props) => {
  return (
    <SafeAreaView>
      <MyHeader title={'Notification Center'} onPress={()=>{props.navigation.goBack()}}/>

      <View style={styles.container}>
        <Image source={images.notificationbell} />
        <View>
          <Text style={styles.text}>Youâ€™re Scheduled for 3 jobs today</Text>
          <Text style={styles.txt}>12:03pm</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Image source={images.notificationbell} />
        <View>
          <Text style={[styles.text, {width: '90%'}]}>
            Reach out to your Area Lead Here for Any assistance.
          </Text>
          <Text style={styles.txt}>12:03pm</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary_white,
    height: widthScale(80),
    width: widthScale(350),
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,

    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  text: {
    fontSize: FONTS_SIZE.body3,
    fontFamily: FONTS.regular,
    fontWeight: '400',
    color: COLORS.grey,
  },
  txt: {
    fontSize: FONTS_SIZE.body4,
    fontFamily: FONTS.regular,
    color: COLORS.secondary_grey,
    fontWeight: '400',
  },
});

export default Notification