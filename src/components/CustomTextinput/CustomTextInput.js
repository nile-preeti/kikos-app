import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {FONTS, FONTS_SIZE, heightScale, widthScale} from '../../global/Utils';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import COLORS from '../../global/Colors';

const CustomTextInput = React.memo(props => {
  let {
    placeholder,
    onChangeText,
    leftView,
    rightView,
    placeholderTextColor = COLORS.Primary_Grey,
    editable = true,
    secureTextEntry=false,
    onPress ,
    value
  } = props;
  return (
    <View style={{overflow: 'hidden', paddingBottom: 5}}>
      <TouchableOpacity onPress={() => {onPress? onPress() : null}} style={styles.inputContainer}>
        {leftView}
        <TextInput
        value={value}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          style={styles.textInput}
          editable={editable}
          secureTextEntry={secureTextEntry}
        />
        {rightView}
      </TouchableOpacity>
    </View>
  );
});

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: heightScale(55),
    borderRadius: widthScale(5),
    borderWidth: 0.5,
    borderColor: COLORS.primary_white,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: FONTS_SIZE.h5,
    fontFamily: FONTS.regular,
    marginLeft: 5,
    color:'#1F191C'
  },
});
