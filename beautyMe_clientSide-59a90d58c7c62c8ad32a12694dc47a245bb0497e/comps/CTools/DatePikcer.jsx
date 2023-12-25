import React, {useState} from 'react';
import {View,StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePikcer(props){

const [date, setDate] = useState(new Date());
const {mode='datetime',display='default',max,min,color='black',text_Color='dark',flex,alignItems,justifyContent,width,height,setdate}=props


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setdate(currentDate);
  };


  return (
    <View style={styles.container(flex,alignItems,justifyContent)}>
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          maximumDate={max}      //send prop Like this -> {new Date(1920,1,1)}
          minimumDate={min}      // Same like max
          themeVariant={text_Color}
          textColor={color}   //Allows changing of the textColor of the date picker. Has effect only when display is "spinner"
          display={display}  //spiner ,calendar (only for date mode) ,clock (only for time mode)
          onChange={onChange}
          locale="il-IL"
          style={styles.DateTimePicker(width,height)}
        />
    </View>)
    }

    const styles = StyleSheet.create({
        container: (flex = 1,alignItems='center',justifyContent='center') => {
            return {
              flex: flex,
              justifyContent: justifyContent,
              alignItems: alignItems,
            }
          },
          DateTimePicker:(width=100,height=100)=>{
              return{
                width:width,
                height:height
              }
          }

    })