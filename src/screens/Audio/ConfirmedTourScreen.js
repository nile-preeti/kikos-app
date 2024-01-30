import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import {dimensions} from '../../utility/Mycolors';
import images from '../../global/images';
import {FONTS} from '../../global/Utils';
import COLORS from '../../global/Colors';
import AntDesign from 'react-native-vector-icons';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
const ConfirmedTourScreen = props => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
  ];
  const [DATA2, setDATA2] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);
  // const onViewableItemsChanged = useCallback(({viewableItems}) => {
  //   if (viewableItems.length > 0) {
  //     setCurrentIndex(viewableItems[0].index);
  //   }
  // }, []);
  return (
    <SafeAreaView style={{backgroundColor: COLORS.White, flex: 1}}>
      <CustomHeader
        title={'Virtual Tour Purchased'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
        onNotificationPress={() => {
          props.navigation.navigate('Notification');
        }}
      />

      <View style={{marginTop: 10, marginBottom: 80}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={DATA2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() => {
                    props.navigation.navigate('');
                  }}>
                  <View style={{padding: 15}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{width: '100%'}}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '700',
                            fontSize: 15,
                            lineHeight: 20,
                          }}>
                          Wildlife, Sea Cave & Reef Snorkel Captain Cook /
                          Kealakekua Bay!
                        </Text>

                        <Text
                          style={{
                            color: '#3DA1E3',
                            fontWeight: '700',
                            fontSize: 15,
                          }}>
                          Purchase at $23.00
                        </Text>
                      </View>
                    </View>
                  </View>
                  <ImageBackground
                    style={[styles.imageBackground,]}
                    resizeMode="stretch"
                    source={require('../../assets/images/largeimages/hbgimg.png')}
                  />
                  <View style={{height:40,width:"95%",justifyContent:'center',alignItems:'center',marginHorizontal:10,marginTop:10}}>
                  <Image source={require("../../assets/images/largeimages/Audio_Player_image.png")}
                  style={{height:40,width:"100%",alignSelf:'center'}}
                  />
                  </View>
                  
                  <CustomButtonRound
                  stle={{height: 42,
                    width: 160,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderRadius: 50,
                    marginTop: 15,
                    marginBottom:15
                }}
                    txtStyle={{color: '#fff', fontSize: 14, fontWeight: '400'}}
                    backgroundColor={COLORS.Primary_Blue}
                    title={'Resume Playing'}
                    onPress={() => {
                       
                    }}
                  />
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmedTourScreen;

const styles = StyleSheet.create({
  cardContainer: {
    height: 125,
    width: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'absolute',
    top: '12%',
    elevation: 7,
  },

  calCantainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 50,
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scontainer: {
    height: 50,
    width: 60,
    backgroundColor: '#3DA1E3',
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    padding: 10,
    color: '#8F93A0',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.regular,
  },
  calendar: {
    marginRight: 10,
    height: 30,
    width: 30,
    tintColor: '#CECECE',
  },
  touchableOpacity: {
    width: (dimensions.SCREEN_WIDTH * 95) / 100,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 20,
  },
  imageBackground: {
    width: '100%',
    height: 150,
    resizeMode: 'stretch',
    justifyContent: 'center',
    //   borderTopLeftRadius: 20,
    //   borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
