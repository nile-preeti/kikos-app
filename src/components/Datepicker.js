import React, {useState} from 'react';
import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';

export default props => {
  const [date, setDate] = useState(new Date());

  let {open, onPressConfirm} = props;
  return (
    <DatePicker
      modal
      open={open}
      date={date}
      onConfirm={date => {
        // console.log('====================================');
        // console.log(date.toDateString());
        // console.log('====================================');
        onPressConfirm(date);
      }}
      onCancel={() => {
        onPressConfirm();
      }}
    />
  );
};
