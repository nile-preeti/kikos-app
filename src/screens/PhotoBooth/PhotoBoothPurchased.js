import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState, useCallback,useEffect} from 'react';
import CustomHeader from '../../components/CustomeHeader';
import CustomheaderCard1 from '../../components/CustomheaderCard1';
import images from '../../global/images';
import {FONTS, heightScale} from '../../global/Utils';
import {dimensions} from '../../utility/Mycolors';
import COLORS from '../../global/Colors';
import {photo_booth_details, requestPostApi, tour_details} from '../../WebApi/Service';
import CustomButtonRound from '../../components/CustomButton/CustomButtonRound';
import {useSelector, useDispatch} from 'react-redux';
import {onLogoutUser} from '../../redux/actions/user_action';
import AppIntroSlider from "react-native-app-intro-slider";
import {ImageSlider, ImageCarousel} from 'react-native-image-slider-banner';
import { createThumbnail } from "react-native-create-thumbnail";
import { VideoModel } from "../../components/VideoModel";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../WebApi/Loader';
import MyAlert from '../../components/MyAlert';
import {ScrollView} from 'react-native-gesture-handler';
import PaymentWebView from '../../components/PaymentWebView';

const PhotoBoothPurchased = props => {
  const user = useSelector(state => state.user.user_details);
  const dispatch = useDispatch();
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [photoBoothDetail,setPhotoBoothDetail]=useState('');
  const [imagess, setImages] = useState("");
  const [allImg, setAllImg] = useState([{img: ''}]);
  const [showModal, setShowModal] = useState({ isVisible: false, data: null });

  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);
  const data = [
    {
      id: 1,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 2,
      image: require('../../assets/images/largeimages/dummydetail.png'),
    },
    {
      id: 3,
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

  useEffect(() => {
    console.log('PhotoId ......', props?.route?.params?.PhotoId);
  const unsubscribe = props.navigation.addListener('focus', () => {
    PostphotobothDetails(props?.route?.params?.PhotoId);
    });
    return unsubscribe;
  }, []);

  const PostphotobothDetails = async id => {
     
    setLoading(true);
    let formdata = new FormData();
    formdata.append('id', id);
    const {responseJson, err} = await requestPostApi(
      photo_booth_details,
      formdata,
      'POST',
      user.token,
    );
    setLoading(false);
    // console.log('the res=PostTourDetails=>>', responseJson);
    if (err == null) {
      if (responseJson.status == true) {
        setPhotoBoothDetail(responseJson.data);
        // console.log('the res=PostTourDetails=>>', responseJson?.data.all_image_video);
        generateThumb(responseJson?.data.all_image_video);
        // var allimgs = [];

        // for (let i = 1; i <= responseJson.data.all_image_video.length; i++) {
        //   allimgs.push({img: responseJson.data.all_image_video[i - 1]});
        // }
        // // console.log('the allimgs==>>', allimgs);
        // setAllImg(allimgs);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
   
  };
  const generateThumb = async (images) => {
    setLoading2(true);
    console.log(images, 'el.images hhhhhh hhhhhhh');

    const filteredData = images.filter((el) => el.all_image_video == null);
    const allData1 = await Promise.all(
      filteredData.map(async (imgData, index) => {
        // console.log('imgData-event', imgData);
       if (imgData.object_type === "Image") {
          // console.log('Reached Image');
          return { ...imgData, type: "image", id: index };
        } 
        else if (imgData.object_type === "video") {
          // console.log("Reached Video, creating thumbnail", imgData);
          const thumb = await createThumbnail({
            url: imgData.media,
            timeStamp: 10000, // Specify the time position for the thumbnail (in milliseconds)
          });
          console.log("Reached Video, creating thumbnail",);
          return {
            ...imgData,
            thumb,
            type: "video",
            id: index,
          };
          
        }
        
        // return null; // Return null for unsupported object_type or invalid data
      })
    );

    console.log('......my specific thumbs for event!!!!!',allData1);
     
    setImages(allData1);
    const onlyimages = allData1.filter((el) => el.type === "image");
    console.log("my updated image fun", onlyimages);
    var allimgs = [];
    for (let i = 1; i <= onlyimages?.length; i++) {
      allimgs.push({ img: onlyimages[i - 1]?.media });
    }
    setAllImg(allimgs);
    setLoading2(false);
  };

  const _renderItem = ({ item }) => {
    console.log("item of renderItem", item?.type);
//     if(item.type == undefined){
//       <View style={{backgroundColor:'red'}}>
//         <Text style={{fontSize:20,color:'black'}}>
// Check testing !!!
//         </Text>
//       </View>
//     }
    if (item.type === "image") {
      return (
        <ImageSlider
          data={allImg}
          autoPlay={true}
          closeIconColor="#fff"
          onItemChanged={handleItemChanged}
          activeIndicatorStyle={{ backgroundColor: "transparent" }}
          inActiveIndicatorStyle={{ top: -5 }}
          caroselImageStyle={{
           
            resizeMode: 'stretch',
            height: (dimensions.SCREEN_HEIGHT * 45) / 100,
            borderRadius: 20,
          }}
          headerStyle={{
            padding: 0,
            backgroundColor: 'rgba(0,0,0, 0.6)',
          }}
          // showHeader
          preview={false}
        />
      );
    }
    if (item.type === "video") {
      return (
        <>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 227,
              borderRadius: 10,
              alignSelf: "center",
              resizeMode: "cover",
            }}
            onPress={() => {
              setShowModal({
                isVisible: true,
                data: item,
              });
            }}
          >
            <ImageBackground
              source={{ uri: item?.thumb?.path }}
              style={{
                width: "100%",
                height: (dimensions.SCREEN_HEIGHT * 45) / 100,
                alignSelf: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
              resizeMode="cover"
            >
              <Image
                source={require("../../assets/images/Icons/play-circle1.png")}
                style={{ width: "20%", height: "20%", alignSelf: "center" }}
                resizeMode="contain"
              />
            </ImageBackground>
          </TouchableOpacity>
        </>
      );
    }
     
  };
  const toggleModal = (state) => {
    // console.log('state', state);
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };
  const handleItemChanged = (item) => {
    console.log("item12121", item);
    // Update the currentIndex when the item changes
    setCurrentIndex(item);
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.White, flex: 1}}>
      <CustomHeader
       backarrow={true}
        title={photoBoothDetail?.tour_name}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1,backgroundColor:'#EAEDF7'}}>
          <View style={{marginTop: 10, flex: 1, alignSelf: 'center'}}>
            <View style={{padding: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '100%'}}>
                  <Text numberOfLines={2}
                    style={{
                      color: '#000',
                      fontWeight: '700',
                      fontSize: 16,
                      lineHeight: 20,
                    }}>
                    {photoBoothDetail?.tour_name}
                  </Text>
                  <Text numberOfLines={1}
                    style={{
                      color: '#1F191C',
                      fontWeight: '500',
                      fontSize: 12,
                      lineHeight: 20,
                    }}>
                    {photoBoothDetail?.title}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={images.gallaryicon}
                      style={{tintColor: '#3DA1E3', height: 15,
                      width: 15,}}
                    />
                    <Text style={[styles.titleTxt, {marginLeft: 10}]}>
                    {photoBoothDetail?.image_count} Photos
                    </Text>
                    <Image
                      style={{
                        marginLeft: 10,
                        height: 15,
                        width: 15,
                        tintColor: '#3DA1E3',
                      }}
                      source={images.gallaryvideoicon}
                    />
                    <Text style={[styles.titleTxt, {marginLeft: 10}]}>
                    {photoBoothDetail?.video_count} Videos
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <Image
                      source={images.calandertickblack}
                      style={{height: 15, width: 15}}
                    />
                    <Text
                      style={{
                        color: '#1F191C',
                        fontWeight: '400',
                        fontSize: 12,
                        lineHeight: 20,
                        marginLeft: 10,
                      }}>
                      Uploaded On {photoBoothDetail?.uploaded_date}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            
           
              <View
                style={{
                  height: (dimensions.SCREEN_HEIGHT * 45) / 100,
                  overflow: "hidden",
                  marginHorizontal: 10,
                  borderRadius: 15,
                   
                }}
              > 
                {Array.isArray(imagess) && imagess.length > 0 ? (
                  <AppIntroSlider
                    data={imagess}
                    renderItem={_renderItem}
                    // renderPagination={() => null}
                    renderDoneButton={() => <View />}
                    renderNextButton={() => <View />}
                    activeDotStyle={{
                      backgroundColor: "#3DA1E3",
                      height: 4,
                      width: 18,
                      borderRadius: 0,
                      top: 20,
                    }}
                    dotStyle={{
                      backgroundColor: "#fff",
                      height: 4,
                      width: 18,
                      borderRadius: 0,
                      top: 20,
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : null}
              </View>
           
            {/* <View
            style={{
              height: (dimensions.SCREEN_HEIGHT * 45) / 100,
              width: '100%',
              marginTop: 15,
            }}>
            <View
              style={{
                overflow: 'hidden',
                width: '90%',
                alignSelf: 'center',
                zIndex: -999,
                borderRadius: 20,
              }}>
              {allImg?.length > 0 ? (
                <ImageSlider
                  data={allImg}
                  activeIndicatorStyle={{backgroundColor: '#3DA1E3'}}
                  indicatorContainerStyle={{top: -5}}
                  caroselImageStyle={{
                    resizeMode: 'stretch',
                    height: 400,
                    borderRadius: 20,
                  }}
                  closeIconColor="#fff"
                  headerStyle={{
                    padding: 0,
                    backgroundColor: 'rgba(0,0,0, 0.6)',
                  }}
                  autoPlay={true}
                  // showHeader
                  preview={false}
                />
              ) : (
                <>
                  <Image
                    style={{height: 400, width: '100%'}}
                    source={{
                      uri: `${'https://kinengo-dev.s3.us-west-1.amazonaws.com/images/camera-icon.jpg'}`,
                    }}
                  />
                </>
              )}
            </View>
          </View> */}
              {/* <FlatList
                data={data}
                horizontal={true}
                pagingEnabled
                // onViewableItemsChanged={onViewableItemsChanged}
                showsHorizontalScrollIndicator={false}
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 50,
                }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.cardContainer}>
                      <Image
                        style={styles.imageContainer}
                        resizeMode="contain"
                        source={item.image}
                      />
                    </View>
                  );
                }}
              /> */}
            
            {/* <View style={styles.txtTotal}>
              <TouchableOpacity style={styles.whiteCircle}>
                <Image
                  tintColor={'black'}
                  style={{transform: [{rotate: '180deg'}]}}
                  source={images.arrowsRight}
                />
              </TouchableOpacity>
              <View>
                <Text
                  style={
                    styles.countTxt
                  }>{`${currentIndex}/${data.length}`}</Text>
              </View>
              <TouchableOpacity style={styles.whiteCircle}>
                <Image tintColor={'black'} source={images.arrowsRight} />
              </TouchableOpacity>
            </View> */}
           
            <View style={{ justifyContent:'center',alignItems:'center',marginBottom:30,marginTop:30}}>
            <CustomButtonRound
            stle={{width:'90%'}}
              txtStyle={{color: '#CECECE', fontSize: 14, fontWeight: '400'}}
              backgroundColor={'#FFFFFF'}
              title={'Purchase At $' +`${photoBoothDetail?.price}`}
              onPress={()=>{  
              props.navigation.navigate('PurchaseReview',{type:'photobooth',amount:photoBoothDetail?.price,tour_id:photoBoothDetail?.id})
              // <PaymentWebView dispatch={type='photobooth'}/>
            }}
            />
            <CustomButtonRound
            stle={{width:'90%'}}
            imagestyle={{height:26,width:26,alignSelf:'center'}}
            iconimg={require('../../assets/images/Icons/download_white.png')}
              txtStyle={{color: '#FFFFFF', fontSize: 14, fontWeight: '400'}}
              backgroundColor={'#3DA1E3'}
              title={'Download With Watermark'}
            />
       
            </View>
            
          </View>
        </View>
      </ScrollView>
      {showModal.isVisible ? (
        <VideoModel
          isVisible={showModal.isVisible}
          toggleModal={toggleModal}
          videoDetail={{ ...showModal?.data, url: showModal?.data?.media }}
          {...props}
        />
      ) : null}
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {loading || loading2 ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default PhotoBoothPurchased;

const styles = StyleSheet.create({
  hrcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 2,
  },
  titleTxt: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FONTS.regular,
    marginLeft: 2,
    color: '#3DA1E3',
  },
  calCantainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 50,
    width: '95%',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    //   flex: 1,
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
    marginHorizontal: 10,
    width: (dimensions.SCREEN_WIDTH * 92) / 100,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  txtTotal: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop:10
  },
  whiteCircle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F191C',
  },
  cardContainer: {
    marginTop: 20,
    width:'100%'
  },
  imageContainer: {
    height: Dimensions.get('screen').width * 0.95,
    width: Dimensions.get('screen').width * 1,
  },
  photoTxt: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.Primary_Blue,
  },
});
