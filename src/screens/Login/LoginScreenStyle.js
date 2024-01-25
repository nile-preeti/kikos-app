import {StyleSheet} from 'react-native';
import COLORS from '../../global/Colors';
import {FONTS, FONTS_SIZE, checkPlatForm, heightScale, widthScale} from '../../global/Utils';

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#ffff',
    position: 'absolute',
    bottom: 0,
    height: checkPlatForm()=='android'?'49%':'53%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
  },
  mainView:{
    paddingBottom: "10%",
    // alignItems: "center",
  },
  maincontainer:{
    // width: '100%',
  //  height:"100%",
  //  position: 'absolute',
  // flex:1,
    // justifyContent: 'center',
    // alignSelf:'center'
  },
  logo: {
    height: heightScale(170),
    width: widthScale(236),
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
    marginBottom:10
  },
  forgotTxt: {
    fontSize: FONTS_SIZE.h4,
    fontWeight: '400',
    color: COLORS.Primary_Blue,
    fontFamily: FONTS.regular,
  },
  topImgContainer: {flex: 0.55, alignItems: 'center', justifyContent: 'center'},
  loginTxt: {
    // alignSelf: 'center',
    color: COLORS.Primary_Blue,
    marginTop: 20,
    fontSize: FONTS_SIZE.h1,
    fontWeight: '700',
    fontFamily: FONTS.bold,
  },
  SignupTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  txtStyle: {
    fontSize: FONTS_SIZE.h4,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    fontWeight: '600',
  },
  signup: {
    fontSize: FONTS_SIZE.h4,
    fontFamily: FONTS.regular,
    fontWeight: '600',
    color: COLORS.Primary_Green,
  },
});

export default styles;
